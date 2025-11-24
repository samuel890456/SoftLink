from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CommentBase(BaseModel):
    id_usuario: int
    id_proyecto: int
    contenido: str

class CommentCreate(CommentBase):
    pass

class CommentUpdate(CommentBase):
    contenido: str | None = None

class CommentInDBBase(CommentBase):
    id_comentario: int
    fecha: datetime

    model_config = ConfigDict(from_attributes=True)

class Comment(CommentInDBBase):
    pass