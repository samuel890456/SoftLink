from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.milestone import milestone as crud_milestone
from app.schemas.milestone import Milestone, MilestoneCreate, MilestoneUpdate

router = APIRouter()

@router.get("/project/{project_id}", response_model=list[Milestone])
async def read_milestones_by_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve milestones for a specific project.
    """
    milestones = await crud_milestone.get_milestones_by_project(db, project_id=project_id, skip=skip, limit=limit)
    return milestones

@router.post("/", response_model=Milestone)
async def create_milestone(
    *,
    db: AsyncSession = Depends(get_db),
    milestone_in: MilestoneCreate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can create milestones
) -> Any:
    """
    Create new milestone.
    """
    milestone = await crud_milestone.create_milestone(db, milestone_in)
    return milestone

@router.put("/{milestone_id}", response_model=Milestone)
async def update_milestone(
    *,
    db: AsyncSession = Depends(get_db),
    milestone_id: int,
    milestone_in: MilestoneUpdate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can update milestones
) -> Any:
    """
    Update a milestone.
    """
    milestone = await crud_milestone.get_milestone(db, milestone_id=milestone_id)
    if not milestone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Milestone not found",
        )
    milestone = await crud_milestone.update_milestone(db, milestone_id=milestone_id, milestone_in=milestone_in)
    return milestone

@router.delete("/{milestone_id}", response_model=Milestone)
async def delete_milestone(
    *,
    db: AsyncSession = Depends(get_db),
    milestone_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can delete milestones
) -> Any:
    """
    Delete a milestone.
    """
    milestone = await crud_milestone.get_milestone(db, milestone_id=milestone_id)
    if not milestone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Milestone not found",
        )
    milestone = await crud_milestone.delete_milestone(db, milestone_id=milestone_id)
    return milestone