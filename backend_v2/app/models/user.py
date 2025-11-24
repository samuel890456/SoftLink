from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

class User(Base):
    __tablename__ = "usuarios"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    telefono = Column(String(20))
    github = Column(String(255))
    tecnologias = Column(Text)
    foto = Column(String(255))
    hoja_vida = Column(String(255))
    bio = Column(Text)
    sitio_web = Column(String(255))
    direccion = Column(String(255))
    identificador_fiscal = Column(String(50))
    id_rol = Column(Integer, ForeignKey("roles.id_rol", ondelete="SET NULL"))
    fecha_registro = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    rol = relationship("Role", back_populates="users")
    iniciativas = relationship("Initiative", back_populates="proponente")
    postulaciones = relationship("Postulacion", back_populates="estudiante")
    proyectos_coordinados = relationship("Project", back_populates="coordinador")
    proyectos_participados = relationship("ProjectStudent", back_populates="estudiante")
    evaluaciones_realizadas = relationship("Evaluation", back_populates="evaluador")
    entregas = relationship("Delivery", back_populates="estudiante")
    comentarios = relationship("Comment", back_populates="usuario")
    # mensajes_enviados and mensajes_recibidos are defined via backref in Message model
    notificaciones = relationship("Notification", back_populates="usuario")
    auditoria_logs = relationship("Audit", back_populates="usuario")
    tokens = relationship("Token", back_populates="usuario")
