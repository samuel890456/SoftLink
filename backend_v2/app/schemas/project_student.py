from pydantic import BaseModel, ConfigDict
from app.schemas.project import Project
from app.schemas.user import User

class ProjectStudentBase(BaseModel):
    id_proyecto: int
    id_estudiante: int
    rol_en_proyecto: str | None = None

class ProjectStudentCreate(ProjectStudentBase):
    pass

class ProjectStudentUpdate(ProjectStudentBase):
    rol_en_proyecto: str | None = None

class ProjectStudent(ProjectStudentBase):
    project: Project | None = None
    student: User | None = None
    
    model_config = ConfigDict(from_attributes=True)
