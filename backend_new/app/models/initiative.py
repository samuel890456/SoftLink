from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class Initiative(Base):
    __tablename__ = "iniciativas"
    id_iniciativa = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    descripcion = Column(Text, nullable=False)
    categoria = Column(String(50))
    impacto = Column(Text)
    estado = Column(String(30), default="pendiente")
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    fecha_creacion = Column(DateTime, server_default=func.now())

    creator = relationship("User", back_populates="iniciativas_creadas")
    documentos = relationship("DocumentoIniciativa", back_populates="iniciativa")
    proyectos = relationship("Project", back_populates="initiative")