from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

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

    initiative = relationship("Initiative", back_populates="proyectos")
    coordinator = relationship("User", back_populates="proyectos_coordinados")
    estudiantes_asignados = relationship("ProjectStudent", back_populates="project")
    hitos = relationship("Hito", back_populates="project")
    evaluaciones = relationship("Evaluation", back_populates="project")
    comentarios = relationship("Comment", back_populates="project")