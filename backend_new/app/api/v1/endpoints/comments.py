from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.crud.comment import comment as crud_comment
from app.schemas.comment import Comment, CommentCreate, CommentUpdate

router = APIRouter()

@router.get("/project/{project_id}", response_model=list[Comment])
async def read_comments_by_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Retrieve comments for a specific project.
    """
    comments = await crud_comment.get_comments_by_project(db, project_id=project_id, skip=skip, limit=limit)
    return comments

@router.post("/", response_model=Comment)
async def create_comment(
    *,
    db: AsyncSession = Depends(get_db),
    comment_in: CommentCreate,
    current_user: Any = Depends(get_current_active_user), # Any active user can create comments
) -> Any:
    """
    Create new comment.
    """
    # Ensure the comment is linked to the current user
    comment_in.id_usuario = current_user.id_usuario
    comment = await crud_comment.create_comment(db, comment_in)
    return comment

@router.put("/{comment_id}", response_model=Comment)
async def update_comment(
    *,
    db: AsyncSession = Depends(get_db),
    comment_id: int,
    comment_in: CommentUpdate,
    current_user: Any = Depends(get_current_active_user), # Only creator or coordinator can update
) -> Any:
    """
    Update a comment.
    """
    comment = await crud_comment.get_comment(db, comment_id=comment_id)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )
    
    # Check if current user is the creator or a coordinator
    if comment.id_usuario != current_user.id_usuario and current_user.id_rol != 1: # Assuming 1 is coordinator role
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this comment",
        )
    
    comment = await crud_comment.update_comment(db, comment_id=comment_id, comment_in=comment_in)
    return comment

@router.delete("/{comment_id}", response_model=Comment)
async def delete_comment(
    *,
    db: AsyncSession = Depends(get_db),
    comment_id: int,
    current_user: Any = Depends(get_current_active_user), # Only creator or coordinator can delete
) -> Any:
    """
    Delete a comment.
    """
    comment = await crud_comment.get_comment(db, comment_id=comment_id)
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )
    
    # Check if current user is the creator or a coordinator
    if comment.id_usuario != current_user.id_usuario and current_user.id_rol != 1: # Assuming 1 is coordinator role
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this comment",
        )
    
    comment = await crud_comment.delete_comment(db, comment_id=comment_id)
    return comment