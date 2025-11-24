import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from typing import List, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.crud.user import user as crud_user
from app.schemas.user import User, UserUpdate

router = APIRouter()

# Directorio donde se guardarán las fotos
UPLOAD_DIR = "static/uploads"

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

@router.put("/{user_id}", response_model=User)
async def update_user(
    *,
    db: AsyncSession = Depends(get_db),
    user_id: int,
    current_user: Any = Depends(get_current_active_user),
    nombre: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    telefono: Optional[str] = Form(None),
    github: Optional[str] = Form(None),
    tecnologias: Optional[str] = Form(None),
    bio: Optional[str] = Form(None),
    sitio_web: Optional[str] = Form(None),
    direccion: Optional[str] = Form(None),
    identificador_fiscal: Optional[str] = Form(None),
    password: Optional[str] = Form(None),
    foto: Optional[UploadFile] = File(None),
    hoja_vida: Optional[UploadFile] = File(None),
) -> Any:
    """
    Update user by ID. Users can only update their own profile unless they are coordinators.
    """
    # Check if user exists
    db_user = await crud_user.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this ID does not exist in the system.",
        )
    
    # Check permissions: users can only update their own profile, coordinators can update any
    if current_user.id_usuario != user_id and current_user.id_rol != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to update this user.",
        )
    
    # Handle photo upload
    foto_url = db_user.foto  # Keep existing photo if no new one is uploaded
    if foto and foto.filename:
        # Generate unique filename
        file_extension = os.path.splitext(foto.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        # Ensure upload directory exists
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        
        # Save file
        with open(file_path, "wb") as buffer:
            buffer.write(await foto.read())
        
        # Build photo URL
        foto_url = f"/static/uploads/{unique_filename}"
        
        # Delete old photo if it exists and is different
        if db_user.foto and db_user.foto != foto_url:
            old_file_path = db_user.foto.lstrip("/")
            if os.path.exists(old_file_path):
                try:
                    os.remove(old_file_path)
                except Exception as e:
                    print(f"Error deleting old photo: {e}")
    
    # Handle CV (hoja de vida) upload
    hoja_vida_url = db_user.hoja_vida  # Keep existing CV if no new one is uploaded
    if hoja_vida and hoja_vida.filename:
        # Generate unique filename
        file_extension = os.path.splitext(hoja_vida.filename)[1]
        unique_filename = f"cv_{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        # Ensure upload directory exists
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        
        # Save file
        with open(file_path, "wb") as buffer:
            buffer.write(await hoja_vida.read())
        
        # Build CV URL
        hoja_vida_url = f"/static/uploads/{unique_filename}"
        
        # Delete old CV if it exists and is different
        if db_user.hoja_vida and db_user.hoja_vida != hoja_vida_url:
            old_file_path = db_user.hoja_vida.lstrip("/")
            if os.path.exists(old_file_path):
                try:
                    os.remove(old_file_path)
                except Exception as e:
                    print(f"Error deleting old CV: {e}")
    
    # Prepare update data
    update_data = {}
    if nombre is not None:
        update_data["nombre"] = nombre
    if email is not None:
        update_data["email"] = email
    if telefono is not None:
        update_data["telefono"] = telefono
    if github is not None:
        update_data["github"] = github
    if tecnologias is not None:
        update_data["tecnologias"] = tecnologias
    if bio is not None:
        update_data["bio"] = bio
    if sitio_web is not None:
        update_data["sitio_web"] = sitio_web
    if direccion is not None:
        update_data["direccion"] = direccion
    if identificador_fiscal is not None:
        update_data["identificador_fiscal"] = identificador_fiscal
    if password is not None:
        update_data["password"] = password
    if foto_url:
        update_data["foto"] = foto_url
    if hoja_vida_url:
        update_data["hoja_vida"] = hoja_vida_url
    
    # Create UserUpdate schema
    user_update = UserUpdate(**update_data)
    
    # Update user
    updated_user = await crud_user.update_user(db, user_id=user_id, user_in=user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating user.",
        )
    
    return updated_user
