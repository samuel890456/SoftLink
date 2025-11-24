from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, initiatives, dashboard, postulaciones, projects, upload

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(initiatives.router, prefix="/initiatives", tags=["initiatives"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(postulaciones.router, prefix="/postulaciones", tags=["postulaciones"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
