from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Evaluation(Base):
    __tablename__ = "evaluaciones"
    id_eval = Column(Integer, primary_key=True, index=True)
    id_proyecto = Column(Integer, ForeignKey("proyectos.id_proyecto", ondelete="CASCADE"))
    id_evaluador = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    id_criterio = Column(Integer, ForeignKey("criterios.id_criterio", ondelete="SET NULL"))
    puntuacion = Column(Integer) # CHECK (puntuacion BETWEEN 0 AND 100)
    observaciones = Column(Text)

    project = relationship("Project", back_populates="evaluaciones")
    evaluator = relationship("User", back_populates="evaluaciones_realizadas")
    criterion = relationship("Criterion", back_populates="evaluaciones")