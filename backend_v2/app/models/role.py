from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Role(Base):
    __tablename__ = "roles"
    
    id_rol = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), unique=True, nullable=False)
    descripcion = Column(Text)
    
    # Relationships
    users = relationship("User", back_populates="rol")
