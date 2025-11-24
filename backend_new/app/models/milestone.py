from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Hito(Base):
    __tablename__ = "hitos"
    id_hito = Column(Integer, primary_key=True, index=True)
    id_proyecto = Column(Integer, ForeignKey("proyectos.id_proyecto", ondelete="CASCADE"))
    titulo = Column(String(150))
    descripcion = Column(Text)
    fecha_entrega = Column(Date)
    estado = Column(String(30), default="pendiente")

    project = relationship("Project", back_populates="hitos")