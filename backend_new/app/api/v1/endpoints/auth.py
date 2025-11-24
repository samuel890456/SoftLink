import os
import uuid # Para generar nombres de archivo únicos
from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form # Modificado
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.core.security import verify_password, create_access_token
from app.core.config import settings
from app.crud.user import user as crud_user
from app.schemas.token import Token
from app.schemas.user import UserCreate, User # Modificado
from app.schemas.login_response import TokenResponse # New import

router = APIRouter()

# Directorio donde se guardarán las fotos
UPLOAD_DIR = "static/uploads" # Debe coincidir con el app.mount en main.py

@router.post("/login", response_model=TokenResponse) # Changed response_model
async def login_access_token(
    db: AsyncSession = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an an access token for future requests
    """
    try:
        user = await crud_user.get_user_by_email(db, email=form_data.username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Verificar la contraseña
        if not verify_password(form_data.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        response_data = TokenResponse(
            access_token=create_access_token(
                user.id_usuario, expires_delta=access_token_expires
            ),
            token_type="bearer",
            id_rol=user.id_rol
        )
        return response_data
    except HTTPException:
        # Re-raise HTTP exceptions (like authentication failures)
        raise
    except Exception as e:
        # Log the error and return a generic error message
        print(f"Error during login: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error during login: {str(e)}"
        )

@router.post("/register", response_model=User)
async def register_user(
    *,
    db: AsyncSession = Depends(get_db),
    nombre: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    id_rol: int = Form(...),
    telefono: str | None = Form(None),
    github: str | None = Form(None),
    tecnologias: str | None = Form(None),
    bio: str | None = Form(None),
    sitio_web: str | None = Form(None),
    direccion: str | None = Form(None),
    identificador_fiscal: str | None = Form(None),
    foto: UploadFile | None = File(None), # Nuevo campo para la foto
) -> Any:
    """
    Register a new user with optional photo upload
    """
    try:
        user = await crud_user.get_user_by_email(db, email=email)
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un usuario con este email ya existe en el sistema.",
            )

        foto_url = None
        if foto and foto.filename: # Asegurarse de que hay un archivo y un nombre de archivo
            # Generar un nombre de archivo único
            file_extension = os.path.splitext(foto.filename)[1]
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            file_path = os.path.join(UPLOAD_DIR, unique_filename)

            # Asegurarse de que el directorio de subida exista
            os.makedirs(UPLOAD_DIR, exist_ok=True)

            # Guardar el archivo
            with open(file_path, "wb") as buffer:
                buffer.write(await foto.read())
            
            # Construir la URL de la foto
            foto_url = f"/static/uploads/{unique_filename}"

        user_in_db = UserCreate(
            nombre=nombre,
            email=email,
            password=password,
            id_rol=id_rol,
            telefono=telefono,
            github=github,
            tecnologias=tecnologias,
            bio=bio,
            sitio_web=sitio_web,
            direccion=direccion,
            identificador_fiscal=identificador_fiscal,
            foto=foto_url # Guardar la URL de la foto
        )
        
        user = await crud_user.create_user(db, user_in_db)
        return user
    except Exception as e:
        print(f"Error during user registration: {e}") # Para depuración
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al registrar el usuario: {e}"
        )