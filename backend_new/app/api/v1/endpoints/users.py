from fastapi import APIRouter, Depends, HTTPException
from typing import List, Any
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.crud.user import user as crud_user
from app.schemas.user import User

router = APIRouter()

@router.get("/", response_model=List[User])
async def read_users(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve users.
    """
    users = await crud_user.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/{user_id}", response_model=User)
async def read_user(
    *,
    db: AsyncSession = Depends(get_db),
    user_id: int,
) -> Any:
    """
    Get user by ID.
    """
    user = await crud_user.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this ID does not exist in the system.",
        )
    return user
