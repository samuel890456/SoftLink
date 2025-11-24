from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Message(Base):
    __tablename__ = "mensajes"

    id_mensaje = Column(Integer, primary_key=True, index=True)
    id_remitente = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    id_destinatario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    asunto = Column(String(150))
    contenido = Column(Text)
    fecha_envio = Column(DateTime(timezone=True), server_default=func.now())
    leido = Column(Boolean, default=False)

    # Relationships
    remitente = relationship("User", foreign_keys=[id_remitente], backref="mensajes_enviados")
    destinatario = relationship("User", foreign_keys=[id_destinatario], backref="mensajes_recibidos")
