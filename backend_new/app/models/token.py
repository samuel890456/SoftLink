from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from sqlalchemy.sql import func

class Token(Base):
    __tablename__ = "tokens"
    id_token = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    token = Column(Text, nullable=False)
    tipo = Column(String(50), default="auth")
    fecha_creacion = Column(DateTime, server_default=func.now())
    fecha_expiracion = Column(DateTime)

    user = relationship("User", back_populates="tokens")