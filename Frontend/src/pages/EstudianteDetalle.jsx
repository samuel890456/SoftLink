import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import usuariosService from '../services/usuariosService';
import proyectosEstudiantesService from '../services/proyectosEstudiantesService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { ArrowLeft, Mail, Code, Github, Briefcase, Activity, UserCheck, MessageCircle } from 'lucide-react';

function EstudianteDetalle() {
  const { id } = useParams();
  const { user: currentUser } = useAuth(); // Current logged-in user
  const [student, setStudent] = useState(null);
  const [studentProjects, setStudentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const studentResponse = await usuariosService.getUsuarioById(id);
        setStudent(studentResponse);

        // Fetch projects associated with this student using proyectosEstudiantesService
        try {
          const projectsResponse = await proyectosEstudiantesService.getProyectosForStudent(id);
          // Los proyectos vienen en projectStudents, necesitamos extraer los proyectos
          const projects = projectsResponse.map(ps => ps.project).filter(p => p !== null && p !== undefined);
          setStudentProjects(projects);
        } catch (projectErr) {
          console.error("Error fetching student projects:", projectErr);
          setStudentProjects([]);
        }

      } catch (err) {
        console.error("Error fetching student details:", err);
        setError("Error al cargar los detalles del estudiante.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Cargando perfil del estudiante...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Error: {error}</p>
          <Link to="/estudiantes" className="text-primary hover:underline mt-4 block">Volver al Directorio</Link>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Estudiante no encontrado.</p>
          <Link to="/estudiantes" className="text-primary hover:underline mt-4 block">Volver al Directorio</Link>
        </div>
      </div>
    );
  }

  // Check if current user is the student being viewed for editing purposes
  const isCurrentUser = currentUser && currentUser.id_usuario === student.id_usuario;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to="/estudiantes" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver al Directorio
        </Link>

        <Card className="bg-gradient-to-br from-white to-lightGray p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
            <Avatar src={student.foto} alt={student.nombre} initials={student.nombre} size="xl" />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-poppins font-bold text-darkGray mb-2">{student.nombre}</h1>
              <p className="text-gray-600 text-lg mb-1">{student.email}</p>
              {student.telefono && <p className="text-gray-600 text-lg mb-1">Teléfono: {student.telefono}</p>}
              {student.bio && <p className="text-gray-700 text-base mb-4">{student.bio}</p>} {/* Nuevo campo bio */}
              {student.fecha_registro && <p className="text-gray-500 text-sm">Miembro desde: {new Date(student.fecha_registro).toLocaleDateString()}</p>}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                {student.tecnologias && student.tecnologias.length > 0 ? (
                  student.tecnologias.split(', ').map((tech, i) => (
                    <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">Sin tecnologías</span>
                )}
              </div>
            </div>
            {isCurrentUser && (
              <div className="md:ml-auto">
                <Button variant="secondary">Editar Perfil</Button>
              </div>
            )}
          </div>

          {student.github && (
            <div className="flex items-center space-x-2 text-gray-600 mb-6">
              <Github className="w-5 h-5" />
              <a href={student.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {student.github}
              </a>
            </div>
          )}

          <h2 className="text-2xl font-poppins font-bold text-darkGray mb-6">Proyectos Asociados</h2>
          {studentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentProjects.map((project) => (
                <Card key={project.id_proyecto} className="p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-darkGray mb-2">{project.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.descripcion || 'Sin descripción'}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Briefcase className="w-4 h-4" />
                    <span>Estado: {project.estado || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                    <Activity className="w-4 h-4" />
                    <span>Progreso: {project.progreso || 0}%</span>
                  </div>
                  <Link to={`/proyectos/${project.id_proyecto}`} className="text-primary hover:underline mt-4 block">Ver Detalles</Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Briefcase className="w-12 h-12 mx-auto mb-4" />
              <p>Este estudiante aún no tiene proyectos asociados.</p>
            </div>
          )}

          {/* Botón de Enviar Mensaje - Solo si el usuario actual no es el estudiante */}
          {currentUser && !isCurrentUser && (
            <div className="mt-6">
              <Button 
                variant="primary" 
                className="flex items-center space-x-2"
                onClick={() => {
                  // Aquí se puede implementar la funcionalidad de envío de mensajes
                  alert('Funcionalidad de mensajería próximamente');
                }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Mensaje</span>
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default EstudianteDetalle;
