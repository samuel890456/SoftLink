from pydantic import BaseModel, ConfigDict
from fastapi import UploadFile # Nuevo

class DocumentoIniciativaBase(BaseModel):
    id_iniciativa: int
    nombre_archivo: str | None = None
    ruta_archivo: str | None = None
    tipo: str | None = None

class DocumentoIniciativaCreate(DocumentoIniciativaBase):
    pass

# Nuevo esquema para la subida de archivos
class DocumentoIniciativaUpload(BaseModel):
    id_iniciativa: int
    tipo: str | None = None
    file: UploadFile # El archivo en sí

class DocumentoIniciativaUpdate(DocumentoIniciativaBase):
    pass

class DocumentoIniciativa(DocumentoIniciativaBase):
    id_doc: int

    model_config = ConfigDict(from_attributes=True)