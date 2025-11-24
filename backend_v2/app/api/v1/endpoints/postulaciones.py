from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_user
from app.crud import crud_postulacion, crud_initiative
from app.schemas.postulacion import Postulacion, PostulacionCreate, PostulacionUpdate
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=Postulacion)
async def create_postulacion(
    *,
    db: AsyncSession = Depends(get_db),
    postulacion_in: PostulacionCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create new postulation. Only students.
    """
    if current_user.id_rol != 2: # Student
        raise HTTPException(status_code=400, detail="Only students can postulate")
    
    # Check if initiative exists
    initiative = await crud_initiative.get(db, id=postulacion_in.id_iniciativa)
    if not initiative:
        raise HTTPException(status_code=404, detail="Initiative not found")
    
    # Check if already postulated (logic could be in CRUD but fine here for now)
    existing = await crud_postulacion.get_by_student(db, student_id=current_user.id_usuario)
    for p in existing:
        if p.id_iniciativa == postulacion_in.id_iniciativa:
            raise HTTPException(status_code=400, detail="Already postulated to this initiative")

    postulacion = await crud_postulacion.create(db=db, obj_in=postulacion_in, student_id=current_user.id_usuario)
    return postulacion

@router.get("/me", response_model=List[Postulacion])
async def read_my_postulaciones(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get current user postulations.
    """
    postulaciones = await crud_postulacion.get_by_student(db, student_id=current_user.id_usuario)
    return postulaciones

@router.get("/pending", response_model=List[Postulacion])
async def read_pending_postulaciones(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all pending postulations. Only Coordinator.
    """
    if current_user.id_rol != 1:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    postulaciones = await crud_postulacion.get_pending(db)
    return postulaciones

from datetime import date
from app.crud import crud_postulacion, crud_initiative, crud_project
from app.schemas.project import ProjectCreate

@router.put("/{id}", response_model=Postulacion)
async def update_postulacion(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    postulacion_in: PostulacionUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Update postulation status. Only Coordinator.
    If status is 'aceptada', creates a Project and assigns the student.
    """
    if current_user.id_rol != 1:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    postulacion = await crud_postulacion.get(db, id=id)
    if not postulacion:
        raise HTTPException(status_code=404, detail="Postulation not found")
    
    # Update Postulation
    postulacion = await crud_postulacion.update(db=db, db_obj=postulacion, obj_in=postulacion_in)
    
    # If accepted, create Project and assign Student
    if postulacion_in.estado == "aceptada":
        # Check if project already exists for this initiative
        existing_project = await crud_project.get_by_initiative(db, initiative_id=postulacion.id_iniciativa)
        
        if not existing_project:
            # Fetch initiative data
            initiative = await crud_initiative.get(db, id=postulacion.id_iniciativa)
            
            # Create Project
            project_in = ProjectCreate(
                id_iniciativa=initiative.id_iniciativa,
                titulo=initiative.nombre,
                descripcion=initiative.descripcion,
                fecha_inicio=date.today(),
                id_coordinador=current_user.id_usuario
            )
            existing_project = await crud_project.create(db, obj_in=project_in)
            
            # Update Initiative status to 'en_progreso' (optional but good practice)
            # await crud_initiative.update(db, db_obj=initiative, obj_in=InitiativeUpdate(estado="en_progreso"))

        # Assign Student to Project
        await crud_project.add_student(db, project_id=existing_project.id_proyecto, student_id=postulacion.id_estudiante)

    return postulacion
