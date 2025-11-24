from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.post("/", response_model=schemas.Postulacion)
def create_postulacion(
    *,
    db: Session = Depends(deps.get_db),
    postulacion_in: schemas.PostulacionCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new postulacion.
    """
    if current_user.id_rol != 2: # 2 is Estudiante
        raise HTTPException(status_code=403, detail="Only students can apply to initiatives")
    
    # Check if already applied
    existing = db.query(models.Postulacion).filter(
        models.Postulacion.id_iniciativa == postulacion_in.id_iniciativa,
        models.Postulacion.id_estudiante == current_user.id_usuario
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You have already applied to this initiative")

    postulacion = crud.postulacion.create_with_student(
        db=db, obj_in=postulacion_in, id_estudiante=current_user.id_usuario
    )
    return postulacion

@router.get("/", response_model=List[schemas.Postulacion])
def read_postulaciones(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve postulaciones.
    """
    if current_user.id_rol == 1: # Coordinador
        postulaciones = crud.postulacion.get_multi(db, skip=skip, limit=limit)
    elif current_user.id_rol == 2: # Estudiante
        postulaciones = crud.postulacion.get_by_student(db, id_estudiante=current_user.id_usuario, skip=skip, limit=limit)
    else:
        # Empresa or others might see postulaciones to their initiatives? For now restrict or empty
        postulaciones = []
        
    return postulaciones

@router.put("/{id}", response_model=schemas.Postulacion)
def update_postulacion(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    postulacion_in: schemas.PostulacionUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a postulacion (Accept/Reject).
    """
    postulacion = crud.postulacion.get(db=db, id=id)
    if not postulacion:
        raise HTTPException(status_code=404, detail="Postulacion not found")
    
    if current_user.id_rol != 1: # Only Coordinador can update status
         raise HTTPException(status_code=403, detail="Not enough permissions")

    postulacion = crud.postulacion.update(db=db, db_obj=postulacion, obj_in=postulacion_in)
    return postulacion
