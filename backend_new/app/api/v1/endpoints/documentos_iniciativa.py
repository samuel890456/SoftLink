from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.documento_iniciativa import documento_iniciativa as crud_documento_iniciativa
from app.schemas.documento_iniciativa import DocumentoIniciativa, DocumentoIniciativaCreate, DocumentoIniciativaUpdate

router = APIRouter()

@router.get("/initiative/{initiative_id}", response_model=list[DocumentoIniciativa])
async def read_documentos_by_initiative(
    initiative_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve documents for a specific initiative.
    """
    documentos = await crud_documento_iniciativa.get_documentos_by_initiative(db, initiative_id=initiative_id, skip=skip, limit=limit)
    return documentos

@router.post("/", response_model=DocumentoIniciativa)
async def create_documento_iniciativa(
    *,
    db: AsyncSession = Depends(get_db),
    documento_in: DocumentoIniciativaCreate,
    current_user: Any = Depends(get_current_active_user), # Any active user can upload documents for their initiatives
) -> Any:
    """
    Create new initiative document.
    """
    # TODO: Add logic to verify if current_user is allowed to add document to this initiative
    documento = await crud_documento_iniciativa.create_documento(db, documento_in)
    return documento

@router.put("/{doc_id}", response_model=DocumentoIniciativa)
async def update_documento_iniciativa(
    *,
    db: AsyncSession = Depends(get_db),
    doc_id: int,
    documento_in: DocumentoIniciativaUpdate,
    current_user: Any = Depends(get_current_active_user), # Only creator or coordinator can update
) -> Any:
    """
    Update an initiative document.
    """
    documento = await crud_documento_iniciativa.get_documento(db, doc_id=doc_id)
    if not documento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    # TODO: Add logic to verify if current_user is allowed to update this document
    documento = await crud_documento_iniciativa.update_documento(db, doc_id=doc_id, documento_in=documento_in)
    return documento

@router.delete("/{doc_id}", response_model=DocumentoIniciativa)
async def delete_documento_iniciativa(
    *,
    db: AsyncSession = Depends(get_db),
    doc_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can delete documents
) -> Any:
    """
    Delete an initiative document.
    """
    documento = await crud_documento_iniciativa.get_documento(db, doc_id=doc_id)
    if not documento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    documento = await crud_documento_iniciativa.delete_documento(db, doc_id=doc_id)
    return documento