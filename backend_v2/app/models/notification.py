from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Notification(Base):
    __tablename__ = "notificaciones"

    id_notificacion = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    titulo = Column(String(150))
    mensaje = Column(Text)
    fecha = Column(DateTime(timezone=True), server_default=func.now())
    leido = Column(Boolean, default=False)

    # Relationships
    usuario = relationship("User", back_populates="notificaciones")
