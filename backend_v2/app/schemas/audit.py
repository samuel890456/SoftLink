from pydantic import BaseModel, ConfigDict
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

    model_config = ConfigDict(from_attributes=True)

class Audit(AuditInDBBase):
    pass
