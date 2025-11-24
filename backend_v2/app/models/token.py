from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Token(Base):
    __tablename__ = "tokens"

    id_token = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    token = Column(String, nullable=False)
    tipo = Column(String(50), default='auth') # auth | recovery
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_expiracion = Column(DateTime(timezone=True))

    # Relationships
    usuario = relationship("User", back_populates="tokens")
