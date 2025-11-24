from pydantic import BaseModel, ConfigDict
from datetime import datetime

class NotificationBase(BaseModel):
    id_usuario: int
    titulo: str | None = None
    mensaje: str | None = None
    leido: bool | None = False

class NotificationCreate(NotificationBase):
    titulo: str
    mensaje: str

class NotificationUpdate(NotificationBase):
    leido: bool | None = None

class NotificationInDBBase(NotificationBase):
    id_notificacion: int
    fecha: datetime

    model_config = ConfigDict(from_attributes=True)

class Notification(NotificationInDBBase):
    pass
