from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class ProjectStudent(Base):
    __tablename__ = "proyectos_estudiantes"
    id_proyecto = Column(Integer, ForeignKey("proyectos.id_proyecto", ondelete="CASCADE"), primary_key=True)
    id_estudiante = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), primary_key=True)
    rol_en_proyecto = Column(String(50))

    project = relationship("Project", back_populates="estudiantes_asignados")
    student = relationship("User", back_populates="proyectos_asignados")