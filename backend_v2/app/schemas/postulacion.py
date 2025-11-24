from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict

# Shared properties
class PostulacionBase(BaseModel):
    mensaje: Optional[str] = None

# Properties to receive via API on creation
class PostulacionCreate(PostulacionBase):
    id_iniciativa: int

# Properties to receive via API on update
class PostulacionUpdate(BaseModel):
    estado: Optional[str] = None # pendiente, aceptada, rechazada

class PostulacionInDBBase(PostulacionBase):
    id_postulacion: int
    id_iniciativa: int
    id_estudiante: int
    fecha_postulacion: datetime
    estado: str

    model_config = ConfigDict(from_attributes=True)

# Additional properties to return via API
class Postulacion(PostulacionInDBBase):
    pass
