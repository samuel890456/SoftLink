from pydantic import BaseModel

class ProjectStudentBase(BaseModel):
    id_proyecto: int
    id_estudiante: int
    rol_en_proyecto: str | None = None

class ProjectStudentCreate(ProjectStudentBase):
    pass

class ProjectStudentUpdate(ProjectStudentBase):
    rol_en_proyecto: str | None = None

class ProjectStudent(ProjectStudentBase):
    class Config:
        from_attributes = True