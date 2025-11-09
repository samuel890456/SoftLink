from pydantic import BaseModel

class DocumentoIniciativaBase(BaseModel):
    id_iniciativa: int
    nombre_archivo: str | None = None
    ruta_archivo: str | None = None
    tipo: str | None = None

class DocumentoIniciativaCreate(DocumentoIniciativaBase):
    pass

class DocumentoIniciativaUpdate(DocumentoIniciativaBase):
    pass

class DocumentoIniciativa(DocumentoIniciativaBase):
    id_doc: int

    class Config:
        from_attributes = True