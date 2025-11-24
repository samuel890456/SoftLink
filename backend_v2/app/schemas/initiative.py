from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List

# Shared properties
class InitiativeBase(BaseModel):
    nombre: str
    descripcion: str
    categoria: Optional[str] = None
    impacto: Optional[str] = None
    estado: Optional[str] = "pendiente"

# Properties to receive on item creation
class InitiativeCreate(InitiativeBase):
    pass

# Properties to receive on item update
class InitiativeUpdate(InitiativeBase):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None

# Properties shared by models stored in DB
class InitiativeInDBBase(InitiativeBase):
    id_iniciativa: int
    id_usuario: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Initiative(InitiativeInDBBase):
    pass

# Properties stored in DB
class InitiativeInDB(InitiativeInDBBase):
    pass
