from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Initiative(Base):
    __tablename__ = "iniciativas"
    
    id_iniciativa = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    descripcion = Column(Text, nullable=False)
    categoria = Column(String(50))
    impacto = Column(Text)
    estado = Column(String(30), default="pendiente")
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    proponente = relationship("User", back_populates="iniciativas")
    postulaciones = relationship("Postulacion", back_populates="iniciativa")
    proyecto = relationship("Project", back_populates="iniciativa", uselist=False)
    documentos = relationship("DocumentoIniciativa", back_populates="iniciativa")
