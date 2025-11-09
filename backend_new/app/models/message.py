from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class Message(Base):
    __tablename__ = "mensajes"
    id_mensaje = Column(Integer, primary_key=True, index=True)
    id_remitente = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    id_destinatario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    asunto = Column(String(150))
    contenido = Column(Text)
    fecha_envio = Column(DateTime, server_default=func.now())
    leido = Column(Boolean, default=False)

    sender = relationship("User", foreign_keys=[id_remitente], back_populates="mensajes_enviados")
    receiver = relationship("User", foreign_keys=[id_destinatario], back_populates="mensajes_recibidos")