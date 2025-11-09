from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.criterion import criterion as crud_criterion
from app.schemas.criterion import Criterion, CriterionCreate, CriterionUpdate

router = APIRouter()

@router.get("/", response_model=list[Criterion])
async def read_criteria(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve criteria.
    """
    criteria = await crud_criterion.get_criteria(db, skip=skip, limit=limit)
    return criteria

@router.post("/", response_model=Criterion)
async def create_criterion(
    *,
    db: AsyncSession = Depends(get_db),
    criterion_in: CriterionCreate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can create criteria
) -> Any:
    """
    Create new criterion.
    """
    criterion = await crud_criterion.create_criterion(db, criterion_in)
    return criterion

@router.put("/{criterion_id}", response_model=Criterion)
async def update_criterion(
    *,
    db: AsyncSession = Depends(get_db),
    criterion_id: int,
    criterion_in: CriterionUpdate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can update criteria
) -> Any:
    """
    Update a criterion.
    """
    criterion = await crud_criterion.get_criterion(db, criterion_id=criterion_id)
    if not criterion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Criterion not found",
        )
    criterion = await crud_criterion.update_criterion(db, criterion_id=criterion_id, criterion_in=criterion_in)
    return criterion

@router.delete("/{criterion_id}", response_model=Criterion)
async def delete_criterion(
    *,
    db: AsyncSession = Depends(get_db),
    criterion_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can delete criteria
) -> Any:
    """
    Delete a criterion.
    """
    criterion = await crud_criterion.get_criterion(db, criterion_id=criterion_id)
    if not criterion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Criterion not found",
        )
    criterion = await crud_criterion.delete_criterion(db, criterion_id=criterion_id)
    return criterion