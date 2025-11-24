from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.schemas.role import Role

class UserBase(BaseModel):
    email: EmailStr
    nombre: str
    telefono: str | None = None
    github: str | None = None
    tecnologias: str | None = None
    bio: str | None = None
    sitio_web: str | None = None

class UserCreate(UserBase):
    password: str
    id_rol: int

class UserUpdate(BaseModel):
    nombre: str | None = None
    telefono: str | None = None
    github: str | None = None
    tecnologias: str | None = None
    bio: str | None = None
    sitio_web: str | None = None

class User(UserBase):
    id_usuario: int
    id_rol: int | None
    fecha_registro: datetime
    role: Role | None = None
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
