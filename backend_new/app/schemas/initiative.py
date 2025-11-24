from pydantic import BaseModel, ConfigDict
from datetime import datetime

class InitiativeBase(BaseModel):
    nombre: str
    descripcion: str
    categoria: str | None = None
    impacto: str | None = None
    estado: str | None = "pendiente"
    id_usuario: int | None = None # Creator ID

class InitiativeCreate(InitiativeBase):
    pass

class InitiativeUpdate(InitiativeBase):
    nombre: str | None = None
    descripcion: str | None = None

class InitiativeInDBBase(InitiativeBase):
    id_iniciativa: int
    fecha_creacion: datetime

    model_config = ConfigDict(from_attributes=True)

class Initiative(InitiativeInDBBase):
    pass