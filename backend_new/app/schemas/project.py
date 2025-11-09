from pydantic import BaseModel
from datetime import date
from app.schemas.initiative import Initiative
from app.schemas.user import User

class ProjectBase(BaseModel):
    id_iniciativa: int
    titulo: str
    descripcion: str | None = None
    estado: str | None = "activo"
    fecha_inicio: date | None = None
    fecha_fin: date | None = None
    progreso: int | None = 0
    id_coordinador: int | None = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    id_iniciativa: int | None = None
    titulo: str | None = None

class ProjectInDBBase(ProjectBase):
    id_proyecto: int

    class Config:
        from_attributes = True

class Project(ProjectInDBBase):
    initiative: Initiative | None = None
    coordinator: User | None = None