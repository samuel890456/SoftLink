from sqlalchemy import Column, Integer, String, ForeignKey, Date, Text
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Project(Base):
    __tablename__ = "proyectos"

    id_proyecto = Column(Integer, primary_key=True, index=True)
    id_iniciativa = Column(Integer, ForeignKey("iniciativas.id_iniciativa", ondelete="CASCADE"), unique=True)
    titulo = Column(String(150), nullable=False)
    descripcion = Column(Text)
    estado = Column(String(30), default="activo")
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    progreso = Column(Integer, default=0)
    id_coordinador = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))

    # Relationships
    iniciativa = relationship("Initiative", back_populates="proyecto")
    coordinador = relationship("User", back_populates="proyectos_coordinados")
    estudiantes = relationship("ProjectStudent", back_populates="proyecto")
    hitos = relationship("Milestone", back_populates="proyecto")
    evaluaciones = relationship("Evaluation", back_populates="proyecto")
    comentarios = relationship("Comment", back_populates="proyecto")
