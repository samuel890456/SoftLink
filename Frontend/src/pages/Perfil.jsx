import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import FormInput from '../components/FormInput'; // Importar FormInput
import usuariosService from '../services/usuariosService'; // Importar el servicio de usuarios
import proyectosService from '../services/proyectosService'; // Para obtener los proyectos del usuario
import Modal from '../components/Modal'; // Import Modal component
import { User, Mail, Edit2, Save, X, Code } from 'lucide-react';

function Perfil() {
  const { user, isLoading: authLoading, token, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editTechnologies, setEditTechnologies] = useState('');
  const [userProjects, setUserProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Cargar los proyectos del usuario
  useEffect(() => {
    const fetchUserProjects = async () => {
      if (user?.id_usuario) {
        setLoadingProjects(true);
        try {
          // Asumiendo que hay un endpoint para obtener proyectos por ID de usuario
          // O que el endpoint de proyectos puede filtrar por id_usuario
          const projectsData = await proyectosService.getProyectos({ id_usuario: user.id_usuario });
          setUserProjects(projectsData);
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

  // Inicializar estados del formulario de edición cuando el usuario carga
  useEffect(() => {
    if (user) {
      setEditName(user.nombre || '');
      setEditEmail(user.email || '');
      setEditTechnologies(user.tecnologias || '');
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdateError(null);
    // Reset form fields when opening the modal
    if (!isEditing && user) {
      setEditName(user.nombre || '');
      setEditEmail(user.email || '');
      setEditTechnologies(user.tecnologias || '');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const updatedData = {
        nombre: editName,
        email: editEmail,
        tecnologias: editTechnologies,
        // No se actualiza la contraseña desde aquí, ni el rol, ni el github
      };
      // Asumiendo que el backend devuelve el usuario actualizado
      const response = await usuariosService.updateUsuario(user.id_usuario, updatedData);
      updateUser(response.data); // Update user in AuthContext
      alert('Perfil actualizado con éxito!');
      setIsEditing(false); // Close modal on success
    } catch (err) {
      setUpdateError(err.response?.data?.detail || 'Error al actualizar el perfil.');
      console.error("Error updating profile:", err);
    } finally {
      setIsUpdating(false);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-poppins font-bold text-gray-800 mb-8 text-center">
          Mi Perfil
        </h1>
      </motion.div>

      {/* Información del Usuario */}
      <Card className="bg-gradient-to-br from-white to-gray-50 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <Avatar 
            src={user.foto} 
            alt={user.nombre || user.email} 
            size="xl" 
            initials={user.nombre ? user.nombre.charAt(0) : user.email.charAt(0)} 
          />
          <div className="flex-grow text-center md:text-left">
            {!isEditing ? (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.nombre || user.email}</h2>
                <p className="text-gray-600 mb-4 capitalize">{user.id_rol === 1 ? 'Coordinador' : user.id_rol === 2 ? 'Estudiante' : 'Empresa'}</p>
              </>
            ) : (
              <div className="space-y-3 w-full max-w-md">
                {/* Los inputs de edición se mostrarán aquí */}
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={handleEditToggle}
              variant="primary"
              aria-label="Editar perfil"
            >
              <Edit2 className="w-5 h-5 mr-2" />
              Editar
            </Button>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-primary" />
            <span>{user.email}</span>
          </div>
          {user.tecnologias && (
            <div className="flex items-start space-x-3">
              <Code className="w-5 h-5 text-primary mt-1" />
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
        </div>
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditing}
        onClose={handleEditToggle}
        title="Editar Perfil"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormInput
            label="Nombre"
            name="nombre"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            disabled={isUpdating}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            disabled={isUpdating}
          />
          <FormInput
            label="Tecnologías (separadas por coma)"
            name="tecnologias"
            type="text"
            value={editTechnologies}
            onChange={(e) => setEditTechnologies(e.target.value)}
            disabled={isUpdating}
          />
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
              variant="success"
              disabled={isUpdating}
            >
              {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Sección Mis Proyectos */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-primary to-indigo-700 p-3 rounded-2xl">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-poppins font-bold text-gray-800">
            Mis Proyectos
          </h2>
        </div>

        {loadingProjects ? (
          <p className="text-gray-600">Cargando proyectos...</p>
        ) : errorProjects ? (
          <p className="text-red-500">Error: {errorProjects}</p>
        ) : userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2">
                  {project.title}
                </h3>
                <ProgressBar progress={project.progress} className="mb-3" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Progreso: {project.progress}%</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    project.status === 'En Curso' ? 'bg-green-100 text-accent' :
                    project.status === 'En Desarrollo' ? 'bg-blue-100 text-primary' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Aún no has participado en ningún proyecto.</p>
            <Button variant="primary" className="mt-4">
              Explorar Proyectos
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Perfil;