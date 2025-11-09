from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.initiative import iniciative as crud_initiative
from app.schemas.initiative import Initiative, InitiativeCreate, InitiativeUpdate

router = APIRouter()

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

@router.post("/", response_model=Initiative)
async def create_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    initiative_in: InitiativeCreate,
    current_user: Any = Depends(get_current_active_user), # Any active user can create an initiative
) -> Any:
    """
    Create new initiative.
    """
    # Ensure the initiative is linked to the current user
    initiative_in.id_usuario = current_user.id_usuario
    initiative = await crud_initiative.create_initiative(db, initiative_in)
    return initiative

@router.put("/{initiative_id}", response_model=Initiative)
async def update_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    initiative_id: int,
    initiative_in: InitiativeUpdate,
    current_user: Any = Depends(get_current_active_user), # Only creator or coordinator can update
) -> Any:
    """
    Update an initiative.
    """
    initiative = await crud_initiative.get_initiative(db, initiative_id=initiative_id)
    if not initiative:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Initiative not found",
        )
    
    # Check if current user is the creator or a coordinator
    if initiative.id_usuario != current_user.id_usuario and current_user.id_rol != 1: # Assuming 1 is coordinator role
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this initiative",
        )
    
    initiative = await crud_initiative.update_initiative(db, initiative_id=initiative_id, initiative_in=initiative_in)
    return initiative

@router.delete("/{initiative_id}", response_model=Initiative)
async def delete_initiative(
    *,
    db: AsyncSession = Depends(get_db),
    initiative_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can delete initiatives
) -> Any:
    """
    Delete an initiative.
    """
    initiative = await crud_initiative.get_initiative(db, initiative_id=initiative_id)
    if not initiative:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Initiative not found",
        )
    initiative = await crud_initiative.delete_initiative(db, initiative_id=initiative_id)
    return initiative