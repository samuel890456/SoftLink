from pydantic import BaseModel, Field, ConfigDict

class EvaluationBase(BaseModel):
    id_proyecto: int
    id_evaluador: int | None = None
    id_criterio: int | None = None
    puntuacion: int = Field(..., ge=0, le=100) # Ensure score is between 0 and 100
    observaciones: str | None = None

class EvaluationCreate(EvaluationBase):
    pass

class EvaluationUpdate(EvaluationBase):
    puntuacion: int | None = Field(None, ge=0, le=100)

class EvaluationInDBBase(EvaluationBase):
    id_eval: int

    model_config = ConfigDict(from_attributes=True)

class Evaluation(EvaluationInDBBase):
    pass
