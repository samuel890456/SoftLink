from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.schemas.role import Role

class UserBase(BaseModel):
    nombre: str
    email: EmailStr
    telefono: str | None = None
    github: str | None = None
    tecnologias: str | None = None
    foto: str | None = None
    id_rol: int | None = None

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: str | None = None

class UserInDBBase(UserBase):
    id_usuario: int
    fecha_registro: datetime

    class Config:
        from_attributes = True

class User(UserInDBBase):
    role: Role | None = None # Relationship to Role schema