import os
import uuid
from typing import Any, List # Importar List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form # Modificado
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.initiative import iniciative as crud_initiative
from app.crud.documento_iniciativa import documento_iniciativa as crud_documento_iniciativa # Nuevo
from app.schemas.initiative import Initiative, InitiativeCreate, InitiativeUpdate
from app.schemas.documento_iniciativa import DocumentoIniciativaCreate # Nuevo

router = APIRouter()

# Directorio donde se guardarán los archivos
UPLOAD_DIR = "static/uploads" # Debe coincidir con el app.mount en main.py

@router.get("/", response_model=list[Initiative])
async def read_initiatives(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve initiatives.
    """
    initiatives = await crud_initiative.get_initiatives(db, skip=skip, limit=limit)
    return initiatives

@router.get("/{initiative_id}", response_model=Initiative)
async def read_initiative_by_id(
    *,
    db: AsyncSession = Depends(get_db),
    initiative_id: int,
) -> Any:
    """
    Get initiative by ID.
    """
    initiative = await crud_initiative.get_initiative(db, initiative_id=initiative_id)
    if not initiative:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Initiative not found",
        )
    return initiative

@router.post("/", response_model=Initiative)
async def create_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    nombre: str = Form(...),
    descripcion: str = Form(...),
    categoria: str = Form(...),
    impacto: str = Form(...),
    documents: List[UploadFile] | None = File(None), # Nuevo campo para documentos
    current_user: Any = Depends(get_current_active_user), # Any active user can create an initiative
) -> Any:
    """
    Create new initiative with optional document upload.
    """
    try:
        initiative_in_db = InitiativeCreate(
            nombre=nombre,
            descripcion=descripcion,
            categoria=categoria,
            impacto=impacto,
            id_usuario=current_user.id_usuario
        )
        
        initiative = await crud_initiative.create_initiative(db, initiative_in_db)

        if documents:
            os.makedirs(UPLOAD_DIR, exist_ok=True) # Asegurarse de que el directorio exista
            for doc_file in documents:
                if doc_file.filename:
                    file_extension = os.path.splitext(doc_file.filename)[1]
                    unique_filename = f"{uuid.uuid4()}{file_extension}"
                    file_path = os.path.join(UPLOAD_DIR, unique_filename)

                    with open(file_path, "wb") as buffer:
                        buffer.write(await doc_file.read())
                    
                    doc_url = f"/static/uploads/{unique_filename}"
                    
                    documento_in = DocumentoIniciativaCreate(
                        id_iniciativa=initiative.id_iniciativa,
                        nombre_archivo=doc_file.filename,
                        ruta_archivo=doc_url,
                        tipo=doc_file.content_type # O un tipo más específico si se requiere
                    )
                    await crud_documento_iniciativa.create_documento(db, documento_in)
        
        return initiative
    except Exception as e:
        print(f"Error during initiative creation: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear la iniciativa: {e}"
        )