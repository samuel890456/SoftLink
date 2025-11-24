from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Postulacion(Base):
    __tablename__ = "postulaciones"

    id_postulacion = Column(Integer, primary_key=True, index=True)
    id_iniciativa = Column(Integer, ForeignKey("iniciativas.id_iniciativa", ondelete="CASCADE"))
    id_estudiante = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    fecha_postulacion = Column(DateTime(timezone=True), server_default=func.now())
    estado = Column(String(30), default="pendiente")  # pendiente | aceptada | rechazada
    mensaje = Column(Text, nullable=True)

    # Relationships
    iniciativa = relationship("Initiative", back_populates="postulaciones")
    estudiante = relationship("User", back_populates="postulaciones")
