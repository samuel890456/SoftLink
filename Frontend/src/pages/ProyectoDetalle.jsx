import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import proyectosService from '../services/proyectosService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { ArrowLeft, Rocket, CheckCircle, Users, Calendar, MessageSquare, Star, Award } from 'lucide-react';

function ProyectoDetalle() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await proyectosService.getProyectoById(id);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Error al cargar los detalles del proyecto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
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
          <p className="text-gray-600">Cargando detalles del proyecto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Error: {error}</p>
          <Link to="/proyectos" className="text-primary hover:underline mt-4 block">Volver a Proyectos</Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Proyecto no encontrado.</p>
          <Link to="/proyectos" className="text-primary hover:underline mt-4 block">Volver a Proyectos</Link>
        </div>
      </div>
    );
  }

  // Assuming user roles: 1 for Coordinator, 2 for Student, 3 for Admin
  const isCoordinator = user && user.id_rol === 1;
  const isStudent = user && user.id_rol === 2;
  const isAdmin = user && user.id_rol === 3;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to="/proyectos" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver a Proyectos
        </Link>

        <Card className="bg-gradient-to-br from-white to-lightGray p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-2xl">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-poppins font-bold text-darkGray">{project.titulo}</h1>
                <p className="text-gray-600 text-lg capitalize">{project.estado}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
              project.estado === 'completado' ? 'bg-green-100 text-accent' :
              project.estado === 'en desarrollo' ? 'bg-blue-100 text-primary' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {project.estado}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{project.descripcion}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {project.fecha_inicio && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Inicio: {new Date(project.fecha_inicio).toLocaleDateString()}</span>
              </div>
            )}
            {project.fecha_fin && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Fin: {new Date(project.fecha_fin).toLocaleDateString()}</span>
              </div>
            )}
            {project.coordinador && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Coordinador: {project.coordinador.nombre}</span>
              </div>
            )}
          </div>

          <h2 className="text-2xl font-poppins font-bold text-darkGray mb-4">Progreso</h2>
          <ProgressBar progress={project.progress || 0} className="mb-8" />

          {/* Hitos */}
          {project.hitos && project.hitos.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-poppins font-bold text-darkGray mb-4">Hitos</h2>
              <div className="space-y-4">
                {project.hitos.map((hito, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-darkGray">{hito.titulo}</h3>
                    <p className="text-gray-600 text-sm">{hito.descripcion}</p>
                    <span className="text-xs text-gray-500">Fecha de entrega: {new Date(hito.fecha_entrega).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estudiantes Asignados */}
          {project.estudiantes_asignados && project.estudiantes_asignados.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-poppins font-bold text-darkGray mb-4">Estudiantes Asignados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.estudiantes_asignados.map((student, index) => (
                  <Link to={`/estudiantes/${student.id_usuario}`} key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-darkGray">{student.nombre}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Evaluaciones */}
          {project.evaluaciones && project.evaluaciones.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-poppins font-bold text-darkGray mb-4">Evaluaciones</h2>
              <div className="space-y-4">
                {project.evaluaciones.map((evaluacion, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-darkGray">Puntuación: {evaluacion.puntuacion}/5</span>
                    </div>
                    <p className="text-gray-700 text-sm">{evaluacion.comentario}</p>
                    <span className="text-xs text-gray-500">Evaluado por: {evaluacion.evaluador.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comentarios */}
          {project.comentarios && project.comentarios.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-poppins font-bold text-darkGray mb-4">Comentarios</h2>
              <div className="space-y-4">
                {project.comentarios.map((comentario, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-700">{comentario.contenido}</p>
                    <span className="text-xs text-gray-500">Por: {comentario.autor.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Acciones (ej. para Coordinador/Admin) */}
          {(isCoordinator || isAdmin) && (
            <div className="flex justify-end space-x-4 mt-8">
              <Button variant="secondary">Editar Proyecto</Button>
              {project.estado !== 'completado' && (
                <Button variant="success">Marcar como Completado</Button>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default ProyectoDetalle;
