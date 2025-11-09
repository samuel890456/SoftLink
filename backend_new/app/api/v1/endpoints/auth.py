from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.core.security import verify_password, create_access_token
from app.core.config import settings
from app.crud.user import user as crud_user
from app.schemas.token import Token
from app.schemas.user import UserCreate, User
from app.schemas.login_response import TokenResponse # New import

router = APIRouter()

@router.post("/login", response_model=TokenResponse) # Changed response_model
async def login_access_token(
    db: AsyncSession = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an an access token for future requests
    """
    user = await crud_user.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    response_data = {
        "access_token": create_access_token(
            user.id_usuario, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
        "id_rol": user.id_rol # Added id_rol
    }
    return response_data

@router.post("/register", response_model=User)
async def register_user(
    *,
    db: AsyncSession = Depends(get_db),
    user_in: UserCreate,
) -> Any:
    """
    Register a new user
    """
    try:
        user = await crud_user.get_user_by_email(db, email=user_in.email)
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un usuario con este email ya existe en el sistema.",
            )
        user = await crud_user.create_user(db, user_in)
        return user
    except Exception as e:
        raise # Re-raise the exception to let FastAPI handle it