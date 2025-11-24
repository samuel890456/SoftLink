from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Comment(Base):
    __tablename__ = "comentarios"

    id_comentario = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    id_proyecto = Column(Integer, ForeignKey("proyectos.id_proyecto", ondelete="CASCADE"))
    contenido = Column(Text, nullable=False)
    fecha = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    usuario = relationship("User", back_populates="comentarios")
    proyecto = relationship("Project", back_populates="comentarios")
