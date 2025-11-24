import shutil
import os
from typing import Any
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.core.config import settings
from app.models.user import User
from app.api.deps import get_current_user
from app.db.session import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update

router = APIRouter()

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/image")
async def upload_profile_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    file_extension = file.filename.split(".")[-1]
    filename = f"profile_{current_user.id_usuario}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Update user profile in DB
        # We need a new session here since we're not injecting it
        async with AsyncSessionLocal() as db:
            stmt = update(User).where(User.id_usuario == current_user.id_usuario).values(foto=filename)
            await db.execute(stmt)
            await db.commit()
            
        return {"filename": filename, "url": f"/static/uploads/{filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not upload file: {str(e)}")

@router.post("/document")
async def upload_cv(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    filename = f"cv_{current_user.id_usuario}.pdf"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        async with AsyncSessionLocal() as db:
            stmt = update(User).where(User.id_usuario == current_user.id_usuario).values(hoja_vida=filename)
            await db.execute(stmt)
            await db.commit()
            
        return {"filename": filename, "url": f"/static/uploads/{filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not upload file: {str(e)}")
