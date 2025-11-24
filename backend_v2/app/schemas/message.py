from pydantic import BaseModel, ConfigDict
from datetime import datetime

class MessageBase(BaseModel):
    id_remitente: int | None = None
    id_destinatario: int | None = None
    asunto: str | None = None
    contenido: str | None = None
    leido: bool | None = False

class MessageCreate(MessageBase):
    id_destinatario: int # Must specify recipient when creating
    contenido: str # Must have content

class MessageUpdate(MessageBase):
    asunto: str | None = None
    contenido: str | None = None
    leido: bool | None = None

class MessageInDBBase(MessageBase):
    id_mensaje: int
    fecha_envio: datetime

    model_config = ConfigDict(from_attributes=True)

class Message(MessageInDBBase):
    pass
