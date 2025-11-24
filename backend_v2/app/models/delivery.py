from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class Delivery(Base):
    __tablename__ = "entregas"

    id_entrega = Column(Integer, primary_key=True, index=True)
    id_hito = Column(Integer, ForeignKey("hitos.id_hito", ondelete="CASCADE"))
    id_estudiante = Column(Integer, ForeignKey("usuarios.id_usuario", ondelete="CASCADE"))
    archivo_url = Column(String(255), nullable=False)
    comentario = Column(Text)
    fecha_entrega = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    hito = relationship("Milestone", back_populates="entregas")
    estudiante = relationship("User", back_populates="entregas")
