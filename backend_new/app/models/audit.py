from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from sqlalchemy.sql import func

class Audit(Base):
    __tablename__ = "auditoria"
    id_log = Column(Integer, primary_key=True, index=True)
    tabla_afectada = Column(String(50))
    accion = Column(String(50))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    fecha = Column(DateTime, server_default=func.now())
    detalles = Column(Text)

    user = relationship("User", back_populates="auditorias")