from pydantic import BaseModel
from datetime import datetime

class AuditBase(BaseModel):
    tabla_afectada: str | None = None
    accion: str | None = None
    id_usuario: int | None = None
    detalles: str | None = None

class AuditCreate(AuditBase):
    tabla_afectada: str
    accion: str

class AuditUpdate(AuditBase):
    pass

class AuditInDBBase(AuditBase):
    id_log: int
    fecha: datetime

    class Config:
        from_attributes = True

class Audit(AuditInDBBase):
    pass