import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import proyectosService from '../services/proyectosService';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Rocket, CheckCircle, Clock, Users, TrendingUp, BarChart3, Plus } from 'lucide-react';

function Proyectos() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // Definir cuántos proyectos por página
  const { user } = useAuth(); // Get user from AuthContext
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'activo', 'finalizado', 'en evaluación'
  const [showCreateForm, setShowCreateForm] = useState(false); // State for create project form

  const fetchProyectos = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };
      if (filterStatus !== 'all') {
        params.estado = filterStatus; // Assuming API uses 'estado' for status filter
      }
      const response = await proyectosService.getProyectos(params);
      setAllProjects(response.data.data || []);
      setTotalPages(Math.ceil(response.data.meta.total / itemsPerPage));
    } catch (err) {
      setError('Error al cargar los proyectos.');
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, [currentPage, filterStatus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-3xl">
            <Rocket className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-darkGray mb-4">
          Nuestros Proyectos
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre los proyectos activos y completados de nuestra comunidad
        </p>
      </motion.div>

      {/* Active Projects */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <Clock className="w-6 h-6 text-orange-500" />
          <h2 className="text-3xl font-poppins font-bold text-darkGray">
            Proyectos Activos
          </h2>
          <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-semibold">
            {activeProjects.length}
          </span>
        </div>

        {activeProjects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeProjects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="hover:shadow-glow transition-all-300 cursor-pointer h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-2xl">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-darkGray mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="truncate">
                        {project.students ? project.students.map(s => s.nombre).join(', ') : 'Sin estudiantes asignados'}
                      </span>
                    </div>
                    <ProgressBar progress={project.progress || 0} />
                  </div>

                  <Link to={`/proyectos/${project.id}`}>
                    <Button
                      variant="primary"
                      className="w-full"
                      aria-label={`Ver detalles de ${project.title}`}
                    >
                      Ver Detalles
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No hay proyectos activos</p>
          </motion.div>
        )}
      </section>

      {/* Completed Projects */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <CheckCircle className="w-6 h-6 text-accent" />
          <h2 className="text-3xl font-poppins font-bold text-darkGray">
            Proyectos Completados
          </h2>
          <span className="bg-green-100 text-accent px-4 py-1 rounded-full text-sm font-semibold">
            {completedProjects.length}
          </span>
        </div>

        {completedProjects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {completedProjects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="hover:shadow-glow transition-all-300 border-2 border-green-100 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-accent to-green-600 p-3 rounded-2xl">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-darkGray mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {project.impact && (
                      <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        <span>{project.impact}</span>
                      </div>
                    )}
                    {project.testimonial && (
                      <p className="text-sm text-gray-600 italic line-clamp-2">
                        "{project.testimonial}"
                      </p>
                    )}
                  </div>

                  <Button variant="success" className="w-full" size="sm">
                    Ver Testimonio
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No hay proyectos completados aún</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default Proyectos;
