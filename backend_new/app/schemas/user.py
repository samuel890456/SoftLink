from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from app.schemas.role import Role

class UserBase(BaseModel):
    nombre: str
    email: EmailStr
    telefono: str | None = None
    github: str | None = None
    tecnologias: str | None = None
    foto: str | None = None
    hoja_vida: str | None = None # Campo para hoja de vida (CV)
    bio: str | None = None # Nuevo campo
    sitio_web: str | None = None # Nuevo campo
    direccion: str | None = None # Nuevo campo
    identificador_fiscal: str | None = None # Nuevo campo
    id_rol: int | None = None

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: str | None = None

class UserInDBBase(UserBase):
    id_usuario: int
    fecha_registro: datetime

    model_config = ConfigDict(from_attributes=True)

class User(UserInDBBase):
    role: Role | None = None # Relationship to Role schema