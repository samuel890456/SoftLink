import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardMetricCard from '../components/DashboardMetricCard';
import Button from '../components/Button';
import Card from '../components/Card';
import { LayoutDashboard, CheckCircle, XCircle, TrendingUp, Users, FileText, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import iniciativasService from '../services/iniciativasService';
import proyectosService from '../services/proyectosService';
import usuariosService from '../services/usuariosService';

function Panel() {
  const [dashboardMetrics, setDashboardMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [errorMetrics, setErrorMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const [initiativesRes, projectsRes, studentsRes] = await Promise.all([
          iniciativasService.getIniciativas({ limit: 1 }), // Just need total count
          proyectosService.getProyectos({ limit: 1 }), // Just need total count
          usuariosService.getUsuarios({ limit: 1 }), // Just need total count
        ]);

        const newMetrics = [
          { id: 1, title: 'Iniciativas Registradas', value: initiativesRes.data.meta.total, icon: '💡' },
          { id: 2, title: 'Proyectos Activos', value: projectsRes.data.meta.total, icon: '🚀' }, // Assuming all fetched projects are "active" for now
          { id: 3, title: 'Estudiantes Registrados', value: studentsRes.data.meta.total, icon: '👨‍🎓' },
          { id: 4, title: 'Proyectos Completados', value: 0, icon: '✅' }, // Placeholder, needs specific API for completed count
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
        const response = await iniciativasService.getIniciativas({ estado: 'pendiente' });
        setPendingInitiatives(response.data.data || []);
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
        setDashboardProjects(response.data.data || []);
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
        const response = await proyectosService.getProyectos(); // Fetch all projects to aggregate by status
        const projects = response.data.data || [];

        const statusCounts = projects.reduce((acc, project) => {
          const status = project.estado || 'desconocido';
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

      {/* Metrics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {metrics.map((metric, index) => (
          <motion.div key={metric.id} variants={itemVariants}>
            <DashboardMetricCard
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
            />
          </motion.div>
        ))}
      </motion.div>

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

          <div className="space-y-3 mb-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center bg-lightGray p-4 rounded-2xl hover:shadow-soft transition-all-300"
              >
                <span className="text-darkGray font-medium flex-1 truncate">{initiative.name}</span>
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

          <Link to="/iniciativas">
            <Button variant="primary" className="w-full">
              Ver Todas las Iniciativas
            </Button>
          </Link>
        </Card>

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

          <div className="space-y-3 mb-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center bg-lightGray p-4 rounded-2xl hover:shadow-soft transition-all-300"
              >
                <span className="text-darkGray font-medium flex-1 truncate">{project.name}</span>
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

          <Link to="/proyectos">
            <Button variant="primary" className="w-full">
              Ver Todos los Proyectos
            </Button>
          </Link>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-600 p-3 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-darkGray">
              Progreso de Proyectos
            </h2>
          </div>
          <div className="h-64 flex items-center justify-center bg-lightGray rounded-3xl">
            <p className="text-gray-500 text-center px-8">
              [Gráfico Circular: Proyectos por Estado]
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
