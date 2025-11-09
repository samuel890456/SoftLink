from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.project import project as crud_project
from app.schemas.project import Project, ProjectCreate, ProjectUpdate

router = APIRouter()

@router.get("/", response_model=list[Project])
async def read_projects(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve projects.
    """
    projects = await crud_project.get_projects(db, skip=skip, limit=limit)
    return projects

@router.post("/", response_model=Project)
async def create_project(
    *,
    db: AsyncSession = Depends(get_db),
    project_in: ProjectCreate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can create projects
) -> Any:
    """
    Create new project.
    """
    project = await crud_project.create_project(db, project_in)
    return project

@router.put("/{project_id}", response_model=Project)
async def update_project(
    *,
    db: AsyncSession = Depends(get_db),
    project_id: int,
    project_in: ProjectUpdate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can update projects
) -> Any:
    """
    Update a project.
    """
    project = await crud_project.get_project(db, project_id=project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    project = await crud_project.update_project(db, project_id=project_id, project_in=project_in)
    return project

@router.delete("/{project_id}", response_model=Project)
async def delete_project(
    *,
    db: AsyncSession = Depends(get_db),
    project_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can delete projects
) -> Any:
    """
    Delete a project.
    """
    project = await crud_project.get_project(db, project_id=project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    project = await crud_project.delete_project(db, project_id=project_id)
    return project