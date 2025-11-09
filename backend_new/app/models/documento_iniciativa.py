from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class DocumentoIniciativa(Base):
    __tablename__ = "documentos_iniciativa"
    id_doc = Column(Integer, primary_key=True, index=True)
    id_iniciativa = Column(Integer, ForeignKey("iniciativas.id_iniciativa", ondelete="CASCADE"))
    nombre_archivo = Column(String(255))
    ruta_archivo = Column(String(255))
    tipo = Column(String(50))

    iniciativa = relationship("Initiative", back_populates="documentos")