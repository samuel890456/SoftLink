from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_user
from app.crud import crud_user
from app.schemas.user import UserUpdate, User
from app.models.user import User as UserModel

router = APIRouter()

@router.get("/me", response_model=User)
async def get_current_user_profile(
    current_user: UserModel = Depends(get_current_user)
):
    """
    Get current user profile
    """
    return current_user

@router.put("/me", response_model=User)
async def update_user_profile(
    user_update: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """
    Update current user profile
    """
    updated_user = await crud_user.update_user(db, user_id=current_user.id_usuario, user_update=user_update)
    return updated_user
