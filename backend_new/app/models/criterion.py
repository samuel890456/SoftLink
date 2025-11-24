from sqlalchemy import Column, Integer, String, Text, Numeric
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Criterion(Base):
    __tablename__ = "criterios"
    id_criterio = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    descripcion = Column(Text)
    peso = Column(Numeric(4, 2))

    evaluaciones = relationship("Evaluation", back_populates="criterion")