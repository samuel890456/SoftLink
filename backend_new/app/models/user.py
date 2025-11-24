from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "usuarios"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False) # Storing plain password for now, will hash later
    telefono = Column(String(20))
    github = Column(String(255))
    tecnologias = Column(Text)
    foto = Column(String(255))
    hoja_vida = Column(String(255)) # Ruta o URL a la hoja de vida (CV)
    # Nuevos campos
    bio = Column(Text) # Para descripción general de usuario/empresa
    sitio_web = Column(String(255)) # Para el sitio web de la empresa o portafolio
    direccion = Column(String(255)) # Para la dirección de la empresa
    identificador_fiscal = Column(String(50)) # Para el DNI o número de identificación fiscal de la empresa

    id_rol = Column(Integer, ForeignKey("roles.id_rol", ondelete="SET NULL"))
    fecha_registro = Column(DateTime, server_default=func.now())

    role = relationship("Role", back_populates="users")
    tokens = relationship("Token", back_populates="user")
    iniciativas_creadas = relationship("Initiative", back_populates="creator")
    proyectos_coordinados = relationship("Project", back_populates="coordinator")
    proyectos_asignados = relationship("ProjectStudent", back_populates="student")
    evaluaciones_realizadas = relationship("Evaluation", back_populates="evaluator")
    comentarios = relationship("Comment", back_populates="user")
    mensajes_enviados = relationship("Message", foreign_keys="[Message.id_remitente]", back_populates="sender")
    mensajes_recibidos = relationship("Message", foreign_keys="[Message.id_destinatario]", back_populates="receiver")
    notificaciones = relationship("Notification", back_populates="user")
    auditorias = relationship("Audit", back_populates="user")
    postulaciones = relationship("Postulacion", back_populates="estudiante")