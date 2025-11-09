from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.config import settings
from app.db.init_db import init_db
from app.db.session import AsyncSessionLocal
import asyncio

app = FastAPI(
    title="SoftLink Backend API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def on_startup():
    # Initialize database and create roles
    async with AsyncSessionLocal() as session:
        await init_db(session)
    print("Database initialized and roles created on startup!")

@app.get("/")
async def root():
    return {"message": "Welcome to SoftLink Backend API!"}