from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.project_student import project_student as crud_project_student
from app.schemas.project_student import ProjectStudent, ProjectStudentCreate, ProjectStudentUpdate

router = APIRouter()

@router.get("/project/{project_id}", response_model=list[ProjectStudent])
async def get_students_for_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve students assigned to a specific project.
    """
    students = await crud_project_student.get_students_for_project(db, project_id=project_id, skip=skip, limit=limit)
    return students

@router.get("/student/{student_id}", response_model=list[ProjectStudent])
async def get_projects_for_student(
    student_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve projects assigned to a specific student.
    """
    # TODO: Add permission check: student can only see their own projects, coordinator can see all
    projects = await crud_project_student.get_projects_for_student(db, student_id=student_id, skip=skip, limit=limit)
    return projects

@router.post("/", response_model=ProjectStudent)
async def create_project_student(
    *,
    db: AsyncSession = Depends(get_db),
    project_student_in: ProjectStudentCreate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can assign students to projects
) -> Any:
    """
    Assign a student to a project.
    """
    existing_assignment = await crud_project_student.get_project_student(db, project_student_in.id_proyecto, project_student_in.id_estudiante)
    if existing_assignment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student is already assigned to this project.",
        )
    project_student = await crud_project_student.create_project_student(db, project_student_in)
    return project_student

@router.put("/{project_id}/{student_id}", response_model=ProjectStudent)
async def update_project_student(
    *,
    db: AsyncSession = Depends(get_db),
    project_id: int,
    student_id: int,
    project_student_in: ProjectStudentUpdate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can update assignments
) -> Any:
    """
    Update a student's role in a project.
    """
    project_student = await crud_project_student.update_project_student(db, project_id=project_id, student_id=student_id, project_student_in=project_student_in)
    if not project_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project-student assignment not found",
        )
    return project_student

@router.delete("/{project_id}/{student_id}", response_model=ProjectStudent)
async def delete_project_student(
    *,
    db: AsyncSession = Depends(get_db),
    project_id: int,
    student_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can remove assignments
) -> Any:
    """
    Remove a student from a project.
    """
    project_student = await crud_project_student.delete_project_student(db, project_id=project_id, student_id=student_id)
    if not project_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project-student assignment not found",
        )
    return project_student