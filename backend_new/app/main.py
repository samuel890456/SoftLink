import os # Nuevo
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.api.v1.api import api_router
from app.core.config import settings
from app.db.init_db import init_db
from app.db.session import AsyncSessionLocal
import asyncio
import traceback

# Definir la ruta base del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Nuevo
STATIC_DIR = os.path.join(BASE_DIR, "static") # Nuevo

app = FastAPI(
    title="SoftLink Backend API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
# En desarrollo, permitir todas las solicitudes desde localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
    ] + (settings.BACKEND_CORS_ORIGINS if settings.BACKEND_CORS_ORIGINS else []),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Montar el directorio de archivos estáticos
# Asegurarse de que el directorio 'static' exista antes de montarlo
if not os.path.exists(STATIC_DIR): # Nuevo
    os.makedirs(STATIC_DIR) # Nuevo
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static") # Modificado

app.include_router(api_router, prefix=settings.API_V1_STR)

# Exception handlers to ensure CORS headers are always present
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "*",
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "*",
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    print(f"Unhandled exception: {exc}")
    traceback.print_exc()
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": f"Internal server error: {str(exc)}"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "*",
        }
    )

@app.on_event("startup")
async def on_startup():
    # Initialize database and create roles
    try:
        async with AsyncSessionLocal() as session:
            await init_db(session)
        print("Database initialized and roles created on startup!")
    except Exception as e:
        print(f"Error initializing database: {e}")
        traceback.print_exc()

@app.get("/")
async def root():
    return {"message": "Welcome to SoftLink Backend API!"}