from sqlalchemy import Column, Integer, ForeignKey, Text, CheckConstraint
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Evaluation(Base):
    __tablename__ = "evaluaciones"

    id_eval = Column(Integer, primary_key=True, index=True)
    id_proyecto = Column(Integer, ForeignKey("proyectos.id_proyecto", ondelete="CASCADE"))
    id_evaluador = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="SET NULL"))
    id_criterio = Column(Integer, ForeignKey("criterios.id_criterio", ondelete="SET NULL"))
    puntuacion = Column(Integer)
    observaciones = Column(Text)

    # Relationships
    proyecto = relationship("Project", back_populates="evaluaciones")
    evaluador = relationship("User", back_populates="evaluaciones_realizadas")
    criterio = relationship("Criterion", back_populates="evaluaciones")

    __table_args__ = (
        CheckConstraint('puntuacion BETWEEN 0 AND 100', name='check_puntuacion_range'),
    )
