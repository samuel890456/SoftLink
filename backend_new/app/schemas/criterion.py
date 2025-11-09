from pydantic import BaseModel
from decimal import Decimal

class CriterionBase(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None
    peso: Decimal | None = None

class CriterionCreate(CriterionBase):
    nombre: str

class CriterionUpdate(CriterionBase):
    pass

class CriterionInDBBase(CriterionBase):
    id_criterio: int

    class Config:
        from_attributes = True

class Criterion(CriterionInDBBase):
    pass