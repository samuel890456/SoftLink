from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class DeliveryBase(BaseModel):
    archivo_url: str
    comentario: Optional[str] = None

class DeliveryCreate(DeliveryBase):
    id_hito: int

class DeliveryUpdate(DeliveryBase):
    pass

class DeliveryInDBBase(DeliveryBase):
    id_entrega: int
    id_hito: int
    id_estudiante: int
    fecha_entrega: datetime

    model_config = ConfigDict(from_attributes=True)

class Delivery(DeliveryInDBBase):
    pass
