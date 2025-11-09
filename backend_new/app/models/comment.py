from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from sqlalchemy.sql import func

class Comment(Base):
    __tablename__ = "comentarios"
    id_comentario = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    id_proyecto = Column(Integer, ForeignKey("proyectos.id_proyecto", ondelete="CASCADE"))
    contenido = Column(Text, nullable=False)
    fecha = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="comentarios")
    project = relationship("Project", back_populates="comentarios")