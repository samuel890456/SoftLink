import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardMetricCard from '../components/DashboardMetricCard';
import Button from '../components/Button';
import Card from '../components/Card';
import { LayoutDashboard, CheckCircle, XCircle, TrendingUp, Users, FileText, BarChart3, UserPlus } from 'lucide-react';
import iniciativasService from '../services/iniciativasService';
import proyectosService from '../services/proyectosService';
import usuariosService from '../services/usuariosService';
import postulacionesService from '../services/postulacionesService';

function Panel() {
  const [dashboardMetrics, setDashboardMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [errorMetrics, setErrorMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const [initiativesRes, projectsRes, studentsRes] = await Promise.all([
          iniciativasService.getIniciativas({ limit: 1000 }), // Get all to count
          proyectosService.getProyectos({ limit: 1000 }), // Get all to count
          usuariosService.getUsuarios({ limit: 1000 }), // Get all to count
        ]);

        // La API devuelve arrays directamente
        const initiatives = Array.isArray(initiativesRes) ? initiativesRes : (initiativesRes?.data || []);
        const projects = Array.isArray(projectsRes) ? projectsRes : (projectsRes?.data || []);
        const users = Array.isArray(studentsRes) ? studentsRes : (studentsRes?.data || []);

        const estudiantes = users.filter(u => u.id_rol === 2);
        const proyectosCompletados = projects.filter(p => p.estado === 'completado' || p.estado === 'completada');
        const proyectosActivos = projects.filter(p => p.estado === 'activo' || !p.estado);

        const newMetrics = [
          { id: 1, title: 'Iniciativas Registradas', value: initiatives.length, icon: '💡' },
          { id: 2, title: 'Proyectos Activos', value: proyectosActivos.length, icon: '🚀' },
          { id: 3, title: 'Estudiantes Registrados', value: estudiantes.length, icon: '👨‍🎓' },
          { id: 4, title: 'Proyectos Completados', value: proyectosCompletados.length, icon: '✅' },
        ];
        setDashboardMetrics(newMetrics);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
        setErrorMetrics("Error al cargar las métricas del dashboard.");
      } finally {
        setLoadingMetrics(false);
      }
    };
    fetchMetrics();
  }, []);

  const [pendingInitiatives, setPendingInitiatives] = useState([]);
  const [loadingPendingInitiatives, setLoadingPendingInitiatives] = useState(true);
  const [errorPendingInitiatives, setErrorPendingInitiatives] = useState(null);

  useEffect(() => {
    const fetchPendingInitiatives = async () => {
      try {
        setLoadingPendingInitiatives(true);
        const response = await iniciativasService.getIniciativas({ limit: 1000 });
        const initiatives = Array.isArray(response) ? response : (response?.data || []);
        const pending = initiatives.filter(init => init.estado === 'pendiente' || !init.estado);
        setPendingInitiatives(pending);
      } catch (error) {
        console.error("Error fetching pending initiatives:", error);
        setErrorPendingInitiatives("Error al cargar las iniciativas pendientes.");
      } finally {
        setLoadingPendingInitiatives(false);
      }
    };
    fetchPendingInitiatives();
  }, []);

  const [dashboardProjects, setDashboardProjects] = useState([]);
  const [loadingDashboardProjects, setLoadingDashboardProjects] = useState(true);
  const [errorDashboardProjects, setErrorDashboardProjects] = useState(null);

  const [projectsByStatusData, setProjectsByStatusData] = useState([]);
  const [loadingProjectsByStatus, setLoadingProjectsByStatus] = useState(true);
  const [errorProjectsByStatus, setErrorProjectsByStatus] = useState(null);

  useEffect(() => {
    const fetchDashboardProjects = async () => {
      try {
        setLoadingDashboardProjects(true);
        const response = await proyectosService.getProyectos({ limit: 5 }); // Fetch a few projects for management
        const projects = Array.isArray(response) ? response : (response?.data || []);
        setDashboardProjects(projects.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard projects:", error);
        setErrorDashboardProjects("Error al cargar los proyectos del dashboard.");
      } finally {
        setLoadingDashboardProjects(false);
      }
    };
    fetchDashboardProjects();
  }, []);

  useEffect(() => {
    const fetchProjectsByStatus = async () => {
      try {
        setLoadingProjectsByStatus(true);
        const response = await proyectosService.getProyectos({ limit: 1000 }); // Fetch all projects to aggregate by status
        const projects = Array.isArray(response) ? response : (response?.data || []);

        const statusCounts = projects.reduce((acc, project) => {
          const status = project.estado || 'activo';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(statusCounts).map(status => ({
          name: status,
          value: statusCounts[status],
        }));
        setProjectsByStatusData(chartData);
      } catch (error) {
        console.error("Error fetching projects by status:", error);
        setErrorProjectsByStatus("Error al cargar los datos de proyectos por estado.");
      } finally {
        setLoadingProjectsByStatus(false);
      }
    };
    fetchProjectsByStatus();
  }, []);

  // Postulaciones Logic
  const [pendingPostulations, setPendingPostulations] = useState([]);
  const [loadingPostulations, setLoadingPostulations] = useState(true);

  useEffect(() => {
    const fetchPostulations = async () => {
      try {
        setLoadingPostulations(true);
        const response = await postulacionesService.getPostulaciones();
        // Filter only pending ones locally if API returns all
        const pending = response.filter(p => p.estado === 'pendiente');
        setPendingPostulations(pending);
      } catch (error) {
        console.error("Error fetching postulations:", error);
      } finally {
        setLoadingPostulations(false);
      }
    };
    fetchPostulations();
  }, []);

  const handleApprovePostulation = async (postulationId) => {
    try {
      await postulacionesService.updatePostulacion(postulationId, { estado: 'aceptada' });
      setPendingPostulations(prev => prev.filter(p => p.id_postulacion !== postulationId));
      // Here you might also want to trigger project creation or assignment
      alert("Postulación aprobada. (Nota: La creación automática de proyecto se implementará en el siguiente paso)");
    } catch (error) {
      console.error("Error approving postulation:", error);
      alert("Error al aprobar la postulación.");
    }
  };

  const handleRejectPostulation = async (postulationId) => {
    try {
      await postulacionesService.updatePostulacion(postulationId, { estado: 'rechazada' });
      setPendingPostulations(prev => prev.filter(p => p.id_postulacion !== postulationId));
    } catch (error) {
      console.error("Error rejecting postulation:", error);
      alert("Error al rechazar la postulación.");
    }
  };


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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-3xl">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-poppins font-bold text-darkGray">
              Panel de Administración
            </h1>
            <p className="text-gray-600 mt-1">Gestiona iniciativas y proyectos</p>
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {errorMetrics && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl">
          <p>{errorMetrics}</p>
        </div>
      )}

      {/* Metrics */}
      {!loadingMetrics && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {dashboardMetrics.map((metric, index) => {
            if (!metric) {
              return null;
            }
            return (
              <motion.div key={metric.id} variants={itemVariants}>
                <DashboardMetricCard metric={metric} />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {loadingMetrics && (
        <div className="text-center py-12 mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Cargando métricas...</p>
        </div>
      )}

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Initiatives Management */}
        <Card className="bg-gradient-to-br from-white to-lightGray">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-accent to-green-600 p-3 rounded-2xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-darkGray">
              Gestión de Iniciativas
            </h2>
          </div>

          {errorPendingInitiatives && (
            <div className="mb-4 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
              {errorPendingInitiatives}
            </div>
          )}
          {loadingPendingInitiatives ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Cargando iniciativas pendientes...</p>
            </div>
          ) : pendingInitiatives.length > 0 ? (
            <div className="space-y-3 mb-6">
              {pendingInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.id_iniciativa || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center bg-lightGray p-4 rounded-2xl hover:shadow-soft transition-all-300"
                >
                  <span className="text-darkGray font-medium flex-1 truncate">{initiative.nombre}</span>
                  <div className="flex space-x-2">
                    <Button variant="success" size="sm" aria-label="Aprobar iniciativa">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="danger" size="sm" aria-label="Rechazar iniciativa">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No hay iniciativas pendientes.</p>
            </div>
          )}

          <Link to="/iniciativas">
            <Button variant="primary" className="w-full">
              Ver Todas las Iniciativas
            </Button>
          </Link>
        </Card>

        {/* Postulaciones Management (NEW) */}
        <Card className="bg-gradient-to-br from-white to-lightGray">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-darkGray">
              Postulaciones Pendientes
            </h2>
          </div>

          {loadingPostulations ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Cargando postulaciones...</p>
            </div>
          ) : pendingPostulations.length > 0 ? (
            <div className="space-y-3 mb-6">
              {pendingPostulations.map((postulation, index) => (
                <motion.div
                  key={postulation.id_postulacion || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center bg-lightGray p-4 rounded-2xl hover:shadow-soft transition-all-300"
                >
                  <div className="flex-1 truncate mr-2">
                    <p className="text-darkGray font-medium text-sm">Estudiante #{postulation.id_estudiante}</p>
                    <p className="text-gray-500 text-xs">Iniciativa #{postulation.id_iniciativa}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="success"
                      size="sm"
                      aria-label="Aprobar postulación"
                      onClick={() => handleApprovePostulation(postulation.id_postulacion)}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      aria-label="Rechazar postulación"
                      onClick={() => handleRejectPostulation(postulation.id_postulacion)}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No hay postulaciones pendientes.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Projects Management & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Projects Management */}
        <Card className="bg-gradient-to-br from-white to-lightGray">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-primary to-indigo-700 p-3 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-darkGray">
              Gestión de Proyectos
            </h2>
          </div>

          {errorDashboardProjects && (
            <div className="mb-4 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
              {errorDashboardProjects}
            </div>
          )}
          {loadingDashboardProjects ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Cargando proyectos...</p>
            </div>
          ) : dashboardProjects.length > 0 ? (
            <div className="space-y-3 mb-6">
              {dashboardProjects.map((project, index) => (
                <motion.div
                  key={project.id_proyecto || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center bg-lightGray p-4 rounded-2xl hover:shadow-soft transition-all-300"
                >
                  <span className="text-darkGray font-medium flex-1 truncate">{project.titulo}</span>
                  <div className="flex space-x-2">
                    <Button variant="primary" size="sm" aria-label="Ver progreso del proyecto">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="sm" aria-label="Evaluar proyecto">
                      Evaluar
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No hay proyectos disponibles.</p>
            </div>
          )}

          <Link to="/proyectos">
            <Button variant="primary" className="w-full">
              Ver Todos los Proyectos
            </Button>
          </Link>
        </Card>

        {/* Charts Section */}
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-2xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-darkGray">
              Estadísticas de Adopción
            </h2>
          </div>
          <div className="h-64 flex items-center justify-center bg-lightGray rounded-3xl">
            <p className="text-gray-500 text-center px-8">
              [Gráfico de Barras: Usuarios Registrados por Mes]
              <br />
              <span className="text-sm">Graficar con biblioteca de gráficos</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Panel;
