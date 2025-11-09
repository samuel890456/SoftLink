from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class Notification(Base):
    __tablename__ = "notificaciones"
    id_notificacion = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    titulo = Column(String(150))
    mensaje = Column(Text)
    fecha = Column(DateTime, server_default=func.now())
    leido = Column(Boolean, default=False)

    user = relationship("User", back_populates="notificaciones")