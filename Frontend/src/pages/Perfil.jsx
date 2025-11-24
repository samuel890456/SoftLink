import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Modal from '../components/Modal';
import usuariosService from '../services/usuariosService';
import proyectosEstudiantesService from '../services/proyectosEstudiantesService';
import proyectosService from '../services/proyectosService';
import evaluacionesService from '../services/evaluacionesService';
import { 
  User, Mail, Phone, Edit2, Save, X, Code, Github, Calendar, 
  Award, Settings, Activity, Briefcase, MapPin, Globe, FileText,
  Star, Clock, CheckCircle, AlertCircle, Camera, Lock, Eye, EyeOff
} from 'lucide-react';

function Perfil() {
  const { user, isLoading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estados del formulario
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editTechnologies, setEditTechnologies] = useState('');
  const [editTelefono, setEditTelefono] = useState('');
  const [editGithub, setEditGithub] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editSitioWeb, setEditSitioWeb] = useState('');
  const [editDireccion, setEditDireccion] = useState('');
  const [editIdentificadorFiscal, setEditIdentificadorFiscal] = useState('');
  const [editFoto, setEditFoto] = useState(null);
  const [editFotoPreview, setEditFotoPreview] = useState(null);
  const [editHojaVida, setEditHojaVida] = useState(null);
  
  // Estados de contraseña
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados de datos
  const [userProjects, setUserProjects] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingEvaluations, setLoadingEvaluations] = useState(true);
  const [errorProjects, setErrorProjects] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Cargar proyectos del usuario
  useEffect(() => {
    const fetchUserProjects = async () => {
      if (user?.id_usuario) {
        setLoadingProjects(true);
        try {
          // Obtener proyectos del estudiante usando project_students
          if (user.id_rol === 2) { // Estudiante
            const projectStudents = await proyectosEstudiantesService.getProyectosForStudent(user.id_usuario);
            // Los proyectos vienen incluidos en projectStudents si el backend está configurado correctamente
            const projectsData = projectStudents.map(ps => {
              if (ps.project) {
                return { ...ps.project, rol_en_proyecto: ps.rol_en_proyecto };
              } else {
                // Fallback: obtener proyecto individualmente si no viene incluido
                return { id_proyecto: ps.id_proyecto, rol_en_proyecto: ps.rol_en_proyecto };
              }
            });
            // Si algunos proyectos no tienen datos completos, obtenerlos individualmente
            const fullProjectsData = await Promise.all(
              projectsData.map(async (p) => {
                if (!p.titulo && p.id_proyecto) {
                  try {
                    const project = await proyectosService.getProyectoById(p.id_proyecto);
                    return { ...project, rol_en_proyecto: p.rol_en_proyecto };
                  } catch (err) {
                    console.error(`Error fetching project ${p.id_proyecto}:`, err);
                    return p;
                  }
                }
                return p;
              })
            );
            setUserProjects(fullProjectsData.filter(p => p !== null));
          } else if (user.id_rol === 1) { // Coordinador
            // Coordinadores pueden ver todos los proyectos
            const allProjects = await proyectosService.getProyectos();
            setUserProjects(allProjects.filter(p => p.id_coordinador === user.id_usuario));
          }
        } catch (err) {
          setErrorProjects('Error al cargar los proyectos del usuario.');
          console.error("Error fetching user projects:", err);
        } finally {
          setLoadingProjects(false);
        }
      }
    };
    fetchUserProjects();
  }, [user]);

  // Cargar evaluaciones del usuario
  useEffect(() => {
    const fetchEvaluations = async () => {
      if (user?.id_usuario && userProjects.length > 0) {
        setLoadingEvaluations(true);
        try {
          const allEvaluations = [];
          for (const project of userProjects) {
            try {
              const projectEvaluations = await evaluacionesService.getEvaluacionesByProject(project.id_proyecto);
              allEvaluations.push(...projectEvaluations);
            } catch (err) {
              console.error(`Error fetching evaluations for project ${project.id_proyecto}:`, err);
            }
          }
          setEvaluaciones(allEvaluations);
        } catch (err) {
          console.error("Error fetching evaluations:", err);
        } finally {
          setLoadingEvaluations(false);
        }
      }
    };
    fetchEvaluations();
  }, [user, userProjects]);

  // Inicializar estados del formulario cuando el usuario carga
  useEffect(() => {
    if (user) {
      setEditName(user.nombre || '');
      setEditEmail(user.email || '');
      setEditTechnologies(user.tecnologias || '');
      setEditTelefono(user.telefono || '');
      setEditGithub(user.github || '');
      setEditBio(user.bio || '');
      setEditSitioWeb(user.sitio_web || '');
      setEditDireccion(user.direccion || '');
      setEditIdentificadorFiscal(user.identificador_fiscal || '');
      setEditFotoPreview(user.foto ? `http://localhost:8000${user.foto}` : null);
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdateError(null);
    if (!isEditing && user) {
      setEditName(user.nombre || '');
      setEditEmail(user.email || '');
      setEditTechnologies(user.tecnologias || '');
      setEditTelefono(user.telefono || '');
      setEditGithub(user.github || '');
      setEditBio(user.bio || '');
      setEditSitioWeb(user.sitio_web || '');
      setEditDireccion(user.direccion || '');
      setEditIdentificadorFiscal(user.identificador_fiscal || '');
      setEditFoto(null);
      setEditFotoPreview(user.foto ? `http://localhost:8000${user.foto}` : null);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const formData = new FormData();
      formData.append('nombre', editName);
      formData.append('email', editEmail);
      if (editTelefono) formData.append('telefono', editTelefono);
      if (editBio) formData.append('bio', editBio);
      
      // Campos específicos de estudiante
      if (user.id_rol === 2) {
        if (editGithub) formData.append('github', editGithub);
        if (editTechnologies) formData.append('tecnologias', editTechnologies);
      }
      
      // Campos específicos de empresa
      if (user.id_rol === 3) {
        if (editSitioWeb) formData.append('sitio_web', editSitioWeb);
        if (editDireccion) formData.append('direccion', editDireccion);
        if (editIdentificadorFiscal) formData.append('identificador_fiscal', editIdentificadorFiscal);
      }
      
      if (editFoto) {
        formData.append('foto', editFoto);
      }
      
      if (editHojaVida) {
        formData.append('hoja_vida', editHojaVida);
      }
      
      const response = await usuariosService.updateUsuario(user.id_usuario, formData);
      updateUser(response.data);
      alert('Perfil actualizado con éxito!');
      setIsEditing(false);
    } catch (err) {
      setUpdateError(err.response?.data?.detail || 'Error al actualizar el perfil.');
      console.error("Error updating profile:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('password', newPassword);
      
      await usuariosService.updateUsuario(user.id_usuario, formData);
      alert('Contraseña actualizada con éxito!');
      setIsEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.response?.data?.detail || 'Error al actualizar la contraseña.');
      console.error("Error updating password:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Calcular promedio de evaluaciones
  const averageScore = evaluaciones.length > 0
    ? evaluaciones.reduce((sum, evaluacion) => sum + (evaluacion.puntuacion || 0), 0) / evaluaciones.length
    : 0;

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Cargando...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Acceso Requerido</h1>
          <p className="text-gray-600 mb-6">Por favor, inicia sesión para ver tu perfil.</p>
          <Button variant="primary" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
        </Card>
      </div>
    );
  }

  const getRoleName = (idRol) => {
    switch(idRol) {
      case 1: return 'Coordinador';
      case 2: return 'Estudiante';
      case 3: return 'Empresa';
      default: return 'Usuario';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-poppins font-bold text-gray-800 mb-8 text-center">
          Mi Perfil
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información principal */}
        <div className="lg:col-span-1 space-y-6">
          {/* 1. Información Personal */}
          <Card className="bg-gradient-to-br from-white to-gray-50">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <Avatar 
                  src={editFotoPreview || (user.foto ? `http://localhost:8000${user.foto}` : null)} 
                  alt={user.nombre || user.email} 
                  size="xl" 
                  initials={user.nombre ? user.nombre.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()} 
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.nombre || user.email}</h2>
              <p className="text-gray-600 mb-2 capitalize">{getRoleName(user.id_rol)}</p>
              {user.fecha_registro && (
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Registrado: {new Date(user.fecha_registro).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="break-words">{user.email}</span>
              </div>
              {user.telefono && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{user.telefono}</span>
                </div>
              )}
              {user.id_rol === 2 && user.github && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Github className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-words">
                    {user.github}
                  </a>
                </div>
              )}
              {user.id_rol === 3 && user.sitio_web && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={user.sitio_web} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-words">
                    {user.sitio_web}
                  </a>
                </div>
              )}
              {user.id_rol === 3 && user.direccion && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{user.direccion}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t">
              <Button
                onClick={handleEditToggle}
                variant="primary"
                className="w-full"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </Card>

          {/* 4. Evaluaciones/Reputación (solo para estudiantes) */}
          {user.id_rol === 2 && (
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-gray-800">Evaluaciones</h3>
              </div>
              {loadingEvaluations ? (
                <p className="text-gray-600">Cargando evaluaciones...</p>
              ) : evaluaciones.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                      <span className="text-3xl font-bold text-gray-800">
                        {averageScore.toFixed(1)} / 100
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{evaluaciones.length} evaluación(es)</p>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {evaluaciones.slice(0, 3).map((evaluacion, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-semibold">Puntuación: {evaluacion.puntuacion}/100</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        {evaluacion.observaciones && (
                          <p className="text-xs text-gray-600 line-clamp-2">{evaluacion.observaciones}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">Aún no tienes evaluaciones.</p>
              )}
            </Card>
          )}
        </div>

        {/* Columna derecha - Contenido principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Datos Académicos/Profesionales */}
          {(user.id_rol === 2 || user.bio) && (
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-gray-800">
                  {user.id_rol === 2 ? 'Datos Académicos' : 'Información Profesional'}
                </h3>
              </div>
              {user.bio && (
                <div className="mb-4">
                  <p className="text-gray-700 whitespace-pre-line">{user.bio}</p>
                </div>
              )}
              {user.id_rol === 2 && user.tecnologias && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Tecnologías y Lenguajes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.tecnologias.split(',').map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {user.id_rol === 2 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Hoja de Vida
                  </h4>
                  {user.hoja_vida ? (
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <a 
                        href={`http://localhost:8000${user.hoja_vida}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Ver Hoja de Vida
                      </a>
                      {isEditing && (
                        <label className="text-sm text-primary hover:underline cursor-pointer">
                          Cambiar
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setEditHojaVida(e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  ) : (
                    <div>
                      {isEditing ? (
                        <label className="block w-full p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors text-center">
                          <FileText className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-600">Subir Hoja de Vida (PDF, DOC, DOCX)</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setEditHojaVida(e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <p className="text-sm text-gray-500">No hay hoja de vida cargada.</p>
                      )}
                    </div>
                  )}
                  {editHojaVida && isEditing && (
                    <p className="text-xs text-green-600 mt-2">Archivo seleccionado: {editHojaVida.name}</p>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* 3. Portafolio/Proyectos */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-gray-800">Mis Proyectos</h3>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/proyectos')}
                className="text-sm"
              >
                Ver Todos
              </Button>
            </div>

            {loadingProjects ? (
              <p className="text-gray-600">Cargando proyectos...</p>
            ) : errorProjects ? (
              <p className="text-red-500">Error: {errorProjects}</p>
            ) : userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.slice(0, 4).map((project, index) => (
                  <motion.div
                    key={project.id_proyecto || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer"
                    onClick={() => navigate(`/proyectos/${project.id_proyecto}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
                        {project.titulo}
                      </h4>
                      {project.rol_en_proyecto && (
                        <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {project.rol_en_proyecto}
                        </span>
                      )}
                    </div>
                    {project.descripcion && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.descripcion}</p>
                    )}
                    <ProgressBar progress={project.progreso || 0} className="mb-2" />
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">Progreso: {project.progreso || 0}%</span>
                      <span className={`px-2 py-1 rounded-full font-semibold capitalize ${
                        project.estado === 'activo' ? 'bg-green-100 text-green-700' :
                        project.estado === 'completado' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {project.estado || 'activo'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Aún no has participado en ningún proyecto.</p>
                <Button variant="primary" onClick={() => navigate('/proyectos')}>
                  Explorar Proyectos
                </Button>
              </div>
            )}
          </Card>

          {/* 6. Actividad Reciente */}
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-800">Actividad Reciente</h3>
            </div>
            <div className="space-y-3">
              {userProjects.slice(0, 5).map((project, index) => (
                <div key={project.id_proyecto || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    project.estado === 'completado' ? 'bg-green-100' :
                    project.estado === 'activo' ? 'bg-blue-100' :
                    'bg-gray-100'
                  }`}>
                    {project.estado === 'completado' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{project.titulo}</p>
                    <p className="text-sm text-gray-600">
                      {project.estado === 'completado' ? 'Completado' : 'En progreso'} • 
                      Progreso: {project.progreso || 0}%
                    </p>
                  </div>
                </div>
              ))}
              {userProjects.length === 0 && (
                <p className="text-gray-600 text-center py-4">No hay actividad reciente.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal de Edición de Perfil */}
      <Modal
        isOpen={isEditing}
        onClose={handleEditToggle}
        title="Editar Perfil"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar 
                src={editFotoPreview} 
                alt={editName} 
                size="xl" 
                initials={editName ? editName.charAt(0).toUpperCase() : 'U'} 
              />
              <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <FormInput
            label="Nombre"
            name="nombre"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            disabled={isUpdating}
            required
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            disabled={isUpdating}
            required
          />
          <FormInput
            label="Teléfono"
            name="telefono"
            type="text"
            value={editTelefono}
            onChange={(e) => setEditTelefono(e.target.value)}
            disabled={isUpdating}
          />
          <FormInput
            label="Biografía/Descripción"
            name="bio"
            type="textarea"
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            disabled={isUpdating}
            placeholder="Cuéntanos sobre ti..."
          />

          {user.id_rol === 2 && (
            <>
              <FormInput
                label="GitHub"
                name="github"
                type="url"
                value={editGithub}
                onChange={(e) => setEditGithub(e.target.value)}
                disabled={isUpdating}
                placeholder="https://github.com/tu-usuario"
              />
              <FormInput
                label="Tecnologías (separadas por coma)"
                name="tecnologias"
                type="text"
                value={editTechnologies}
                onChange={(e) => setEditTechnologies(e.target.value)}
                disabled={isUpdating}
                placeholder="Python, React, Node.js, ..."
              />
            </>
          )}

          {user.id_rol === 3 && (
            <>
              <FormInput
                label="Sitio Web"
                name="sitio_web"
                type="url"
                value={editSitioWeb}
                onChange={(e) => setEditSitioWeb(e.target.value)}
                disabled={isUpdating}
                placeholder="https://www.empresa.com"
              />
              <FormInput
                label="Dirección"
                name="direccion"
                type="text"
                value={editDireccion}
                onChange={(e) => setEditDireccion(e.target.value)}
                disabled={isUpdating}
              />
              <FormInput
                label="Identificador Fiscal"
                name="identificador_fiscal"
                type="text"
                value={editIdentificadorFiscal}
                onChange={(e) => setEditIdentificadorFiscal(e.target.value)}
                disabled={isUpdating}
              />
            </>
          )}

          {updateError && <p className="text-red-500 text-sm mt-2">{updateError}</p>}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              onClick={handleEditToggle}
              variant="secondary"
              disabled={isUpdating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isUpdating}
            >
              {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Cambio de Contraseña */}
      <Modal
        isOpen={isEditingPassword}
        onClose={() => {
          setIsEditingPassword(false);
          setPasswordError(null);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }}
        title="Cambiar Contraseña"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <FormInput
            label="Nueva Contraseña"
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isUpdating}
            required
            placeholder="Mínimo 6 caracteres"
          />
          <div className="relative">
            <FormInput
              label="Confirmar Contraseña"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isUpdating}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              onClick={() => {
                setIsEditingPassword(false);
                setPasswordError(null);
                setNewPassword('');
                setConfirmPassword('');
              }}
              variant="secondary"
              disabled={isUpdating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isUpdating}
            >
              {isUpdating ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 5. Configuraciones */}
      <Card className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-gray-800">Configuraciones</h3>
          </div>
        </div>
        <div className="space-y-3">
          <Button
            variant="secondary"
            onClick={() => setIsEditingPassword(true)}
            className="w-full md:w-auto"
          >
            <Lock className="w-4 h-4 mr-2" />
            Cambiar Contraseña
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Perfil;
