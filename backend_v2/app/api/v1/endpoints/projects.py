from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.api.deps import get_db, get_current_user
from app.models.project import Project
from app.models.project_student import ProjectStudent
from app.models.initiative import Initiative
from app.schemas.project import Project as ProjectSchema
from app.models.user import User

router = APIRouter()

@router.get("/public", response_model=List[ProjectSchema])
async def read_public_projects(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve all projects for public view.
    """
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.iniciativa))
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

@router.get("/", response_model=List[ProjectSchema])
async def read_projects(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve all projects. Only for Coordinators.
    """
    if current_user.id_rol != 1:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.iniciativa))
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

@router.get("/me", response_model=List[ProjectSchema])
async def read_my_projects(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve projects related to current user.
    - Student: Projects they are assigned to.
    - Company: Projects from their initiatives.
    - Coordinator: All projects they coordinate (or all if superuser).
    """
    if current_user.id_rol == 2: # Student
        # Join with ProjectStudent
        result = await db.execute(
            select(Project)
            .join(ProjectStudent)
            .options(selectinload(Project.iniciativa))
            .filter(ProjectStudent.id_estudiante == current_user.id_usuario)
        )
        return result.scalars().all()
    
    elif current_user.id_rol == 3: # Company
        # Join with Initiative
        result = await db.execute(
            select(Project)
            .join(Initiative)
            .options(selectinload(Project.iniciativa))
            .filter(Initiative.id_usuario == current_user.id_usuario)
        )
        return result.scalars().all()
        
    elif current_user.id_rol == 1: # Coordinator
        # Return all for now, or filter by id_coordinador if we assign specific coordinators
        result = await db.execute(
            select(Project)
            .options(selectinload(Project.iniciativa))
        )
        return result.scalars().all()
    
    return []

@router.get("/{id}", response_model=ProjectSchema)
async def read_project(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
):
    """
    Get project by ID. Public access.
    """
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.iniciativa))
        .filter(Project.id_proyecto == id)
    )
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    return project

from app.crud import crud_milestone
from app.schemas.milestone import Milestone, MilestoneCreate

@router.get("/{id}/milestones", response_model=List[Milestone])
async def read_project_milestones(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    current_user: User = Depends(get_current_user)
):
    """
    Get milestones for a project.
    """
    milestones = await crud_milestone.get_by_project(db, project_id=id)
    return milestones

@router.post("/{id}/milestones", response_model=Milestone)
async def create_project_milestone(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    milestone_in: MilestoneCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Create a milestone for a project. Only Coordinator.
    """
    if current_user.id_rol != 1:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Ensure project exists
    project = await db.get(Project, id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    # Force project_id from URL
    milestone_in.id_proyecto = id
    
    milestone = await crud_milestone.create(db, obj_in=milestone_in)
    return milestone

from app.crud import crud_delivery
from app.schemas.delivery import Delivery, DeliveryCreate

@router.post("/{id}/milestones/{milestone_id}/deliveries", response_model=Delivery)
async def create_milestone_delivery(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    milestone_id: int,
    delivery_in: DeliveryCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Submit a delivery for a milestone. Only Students.
    """
    if current_user.id_rol != 2:
        raise HTTPException(status_code=403, detail="Only students can submit deliveries")
    
    # TODO: Verify student belongs to project
    
    # Force milestone_id
    delivery_in.id_hito = milestone_id
    
    delivery = await crud_delivery.create(db, obj_in=delivery_in, student_id=current_user.id_usuario)
    
    # Update milestone status to 'completado' (or 'entregado' if we had that status)
    # For now, let's keep it simple. Maybe Coordinator manually marks it as completed after review.
    
    return delivery

@router.get("/{id}/milestones/{milestone_id}/deliveries", response_model=List[Delivery])
async def read_milestone_deliveries(
    *,
    db: AsyncSession = Depends(get_db),
    id: int,
    milestone_id: int,
    current_user: User = Depends(get_current_user)
):
    """
    Get deliveries for a milestone.
    """
    deliveries = await crud_delivery.get_by_milestone(db, milestone_id=milestone_id)
    return deliveries
