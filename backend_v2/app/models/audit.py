from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Audit(Base):
    __tablename__ = "auditoria"

    id_log = Column(Integer, primary_key=True, index=True)
    tabla_afectada = Column(String(50))
    accion = Column(String(50))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    fecha = Column(DateTime(timezone=True), server_default=func.now())
    detalles = Column(Text)

    # Relationships
    usuario = relationship("User", back_populates="auditoria_logs")
