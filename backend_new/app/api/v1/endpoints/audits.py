from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_coordinator # Only coordinators can view/manage audit logs
from app.crud.audit import audit as crud_audit
from app.schemas.audit import Audit, AuditCreate, AuditUpdate

router = APIRouter()

@router.get("/", response_model=list[Audit])
async def read_audit_logs(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can view audit logs
) -> Any:
    """
    Retrieve audit logs.
    """
    audit_logs = await crud_audit.get_audit_logs(db, skip=skip, limit=limit)
    return audit_logs

@router.post("/", response_model=Audit)
async def create_audit_log(
    *,
    db: AsyncSession = Depends(get_db),
    audit_log_in: AuditCreate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can create audit logs (or system)
) -> Any:
    """
    Create new audit log.
    """
    # Ensure the audit log is linked to the current user if not specified
    if not audit_log_in.id_usuario:
        audit_log_in.id_usuario = current_user.id_usuario
    
    audit_log = await crud_audit.create_audit_log(db, audit_log_in)
    return audit_log

@router.delete("/{log_id}", response_model=Audit)
async def delete_audit_log(
    *,
    db: AsyncSession = Depends(get_db),
    log_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can delete audit logs
) -> Any:
    """
    Delete an audit log.
    """
    audit_log = await crud_audit.get_audit_log(db, log_id=log_id)
    if not audit_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Audit log not found",
        )
    audit_log = await crud_audit.delete_audit_log(db, log_id=log_id)
    return audit_log