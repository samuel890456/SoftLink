from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user, get_current_active_coordinator
from app.crud.evaluation import evaluation as crud_evaluation
from app.schemas.evaluation import Evaluation, EvaluationCreate, EvaluationUpdate

router = APIRouter()

@router.get("/project/{project_id}", response_model=list[Evaluation])
async def read_evaluations_by_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve evaluations for a specific project.
    """
    evaluations = await crud_evaluation.get_evaluations_by_project(db, project_id=project_id, skip=skip, limit=limit)
    return evaluations

@router.post("/", response_model=Evaluation)
async def create_evaluation(
    *,
    db: AsyncSession = Depends(get_db),
    evaluation_in: EvaluationCreate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can create evaluations
) -> Any:
    """
    Create new evaluation.
    """
    # Ensure the evaluator is the current user if not specified
    if not evaluation_in.id_evaluador:
        evaluation_in.id_evaluador = current_user.id_usuario
    
    evaluation = await crud_evaluation.create_evaluation(db, evaluation_in)
    return evaluation

@router.put("/{eval_id}", response_model=Evaluation)
async def update_evaluation(
    *,
    db: AsyncSession = Depends(get_db),
    eval_id: int,
    evaluation_in: EvaluationUpdate,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can update evaluations
) -> Any:
    """
    Update an evaluation.
    """
    evaluation = await crud_evaluation.get_evaluation(db, eval_id=eval_id)
    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )
    evaluation = await crud_evaluation.update_evaluation(db, eval_id=eval_id, evaluation_in=evaluation_in)
    return evaluation

@router.delete("/{eval_id}", response_model=Evaluation)
async def delete_evaluation(
    *,
    db: AsyncSession = Depends(get_db),
    eval_id: int,
    current_user: Any = Depends(get_current_active_coordinator), # Only coordinators can delete evaluations
) -> Any:
    """
    Delete an evaluation.
    """
    evaluation = await crud_evaluation.get_evaluation(db, eval_id=eval_id)
    if not evaluation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evaluation not found",
        )
    evaluation = await crud_evaluation.delete_evaluation(db, eval_id=eval_id)
    return evaluation