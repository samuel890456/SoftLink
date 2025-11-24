from pydantic import BaseModel, ConfigDict
from datetime import date

class MilestoneBase(BaseModel):
    id_proyecto: int
    titulo: str | None = None
    descripcion: str | None = None
    fecha_entrega: date | None = None
    estado: str | None = "pendiente"

class MilestoneCreate(MilestoneBase):
    pass

class MilestoneUpdate(MilestoneBase):
    titulo: str | None = None
    descripcion: str | None = None
    fecha_entrega: date | None = None
    estado: str | None = None

class MilestoneInDBBase(MilestoneBase):
    id_hito: int

    model_config = ConfigDict(from_attributes=True)

class Milestone(MilestoneInDBBase):
    pass
