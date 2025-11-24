import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, GraduationCap, Rocket, TrendingUp, Users, Award, 
  CheckCircle, Clock, Code2, Globe, Briefcase, Target, Sparkles,
  Star, Zap, BarChart3, PieChart, Activity, UserCheck, Mail, 
  Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github, Lightbulb, FileText
} from 'lucide-react';
import iniciativasService from '../services/iniciativasService';
import usuariosService from '../services/usuariosService';
import proyectosService from '../services/proyectosService';

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const [initiatives, setInitiatives] = useState([]);
  const [loadingInitiatives, setLoadingInitiatives] = useState(true);
  const [errorInitiatives, setErrorInitiatives] = useState(null);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        setLoadingInitiatives(true);
        const response = await iniciativasService.getIniciativas({ limit: 4 });
        // La API devuelve directamente un array
        const initiativesData = Array.isArray(response) ? response : [];
        setInitiatives(initiativesData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching initiatives:", error);
        setErrorInitiatives("Error al cargar las iniciativas.");
      } finally {
        setLoadingInitiatives(false);
      }
    };
    fetchInitiatives();
  }, []);

  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [errorStudents, setErrorStudents] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoadingStudents(true);
        const response = await usuariosService.getUsuarios({ limit: 100 });
        // La API devuelve directamente un array, filtrar solo estudiantes
        const usersData = Array.isArray(response) ? response : [];
        const estudiantes = usersData.filter(u => u.id_rol === 2).slice(0, 5);
        setStudents(estudiantes);
      } catch (error) {
        console.error("Error fetching students:", error);
        setErrorStudents("Error al cargar los estudiantes.");
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, []);

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const response = await proyectosService.getProyectos({ limit: 100 });
        // La API devuelve directamente un array
        const projectsData = Array.isArray(response) ? response : [];
        // Filtrar solo proyectos activos
        const activeProjects = projectsData.filter(p => p.estado === 'activo' || !p.estado).slice(0, 3);
        setProjects(activeProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setErrorProjects("Error al cargar los proyectos.");
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const [metrics, setMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [errorMetrics, setErrorMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const [initiativesRes, projectsRes, studentsRes] = await Promise.all([
          iniciativasService.getIniciativas({ limit: 1000 }),
          proyectosService.getProyectos({ limit: 1000 }),
          usuariosService.getUsuarios({ limit: 1000 }),
        ]);
        
        // La API devuelve arrays directamente
        const initiatives = Array.isArray(initiativesRes) ? initiativesRes : [];
        const projects = Array.isArray(projectsRes) ? projectsRes : [];
        const users = Array.isArray(studentsRes) ? studentsRes : [];
        const estudiantes = users.filter(u => u.id_rol === 2);
        const proyectosCompletados = projects.filter(p => p.estado === 'completado' || p.estado === 'completada');

        const newMetrics = [
          { value: initiatives.length, label: 'Iniciativas Activas', icon: Lightbulb, color: 'from-blue-500 to-cyan-500' },
          { value: proyectosCompletados.length, label: 'Proyectos Completados', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
          { value: estudiantes.length, label: 'Estudiantes Registrados', icon: Users, color: 'from-purple-500 to-pink-500' }
        ];
        setMetrics(newMetrics);
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setErrorMetrics("Error al cargar las métricas.");
      } finally {
        setLoadingMetrics(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>
        
        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido izquierdo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-medium">Plataforma Institucional</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-6 leading-tight">
                <span className="text-white">Innovación y</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                  Talento Universitario
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light">
                Para el desarrollo tecnológico
              </p>

              <p className="text-lg text-white/80 mb-10 max-w-lg">
                Colabora, aprende y crea soluciones reales con la comunidad institucional. 
                Conecta con proyectos que transforman.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/iniciativas"
                  className="group inline-flex items-center justify-center space-x-3 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all-300"
                >
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>Explorar Iniciativas</span>
                </Link>

                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center space-x-3 bg-[#10B981] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all-300"
                >
                  <GraduationCap className="w-6 h-6" />
                  <span>Registrarme</span>
                </Link>
              </div>

              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                {['500+', '150+', '98%'].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat}</div>
                    <div className="text-sm text-white/70">Activos</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mockup/Ilustración derecha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/20 backdrop-blur-sm h-32 rounded-2xl p-4 border border-white/30">
                      <div className="h-4 bg-white/40 rounded mb-2"></div>
                      <div className="h-4 bg-white/40 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-white/80 text-sm">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4" />
                    <span>Plataforma Web</span>
                  </div>
                  <span>✓ Activo</span>
                </div>
              </div>

              {/* Badge flotante */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-accent to-green-600 text-white px-6 py-3 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">Proyecto Destacado</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white/50 text-sm">Scroll para explorar</div>
        </motion.div>
      </section>

      {/* Sección: Iniciativas Destacadas */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Oportunidades Activas</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-poppins font-bold text-darkGray mb-6">
              Iniciativas <span className="text-primary">Destacadas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Únete a proyectos reales que generan impacto social y tecnológico
            </p>
          </motion.div>

          {loadingInitiatives ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Cargando iniciativas...</p>
            </div>
          ) : initiatives.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {initiatives.map((initiative, index) => (
                <Link key={initiative.id_iniciativa || index} to={`/iniciativas/${initiative.id_iniciativa}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-2xl transition-all-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-2xl">
                        <Lightbulb className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          initiative.estado === 'completada' ? 'bg-green-100 text-accent' :
                          initiative.estado === 'en desarrollo' ? 'bg-blue-100 text-primary' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {initiative.estado || 'pendiente'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-darkGray mb-3 group-hover:text-primary transition-colors">
                      {initiative.nombre}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{initiative.descripcion || 'Sin descripción'}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span className="capitalize">{initiative.categoria || 'Sin categoría'}</span>
                      </div>
                      {initiative.impacto && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="line-clamp-1">{initiative.impacto}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold capitalize">{initiative.categoria || 'General'}</span>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay iniciativas disponibles</p>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/iniciativas"
              className="inline-flex items-center space-x-2 text-primary font-bold text-lg hover:underline"
            >
              <span>Ver todas las iniciativas</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sección: Estudiantes */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-4">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold">Comunidad Activa</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-poppins font-bold text-darkGray mb-6">
              Nuestros <span className="text-primary">Estudiantes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce a los talentos que están transformando la región
            </p>
          </motion.div>

          {loadingStudents ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Cargando estudiantes...</p>
            </div>
          ) : students.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {students.map((student, index) => (
                <Link key={student.id_usuario || index} to={`/estudiantes/${student.id_usuario}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white p-6 rounded-3xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all-300 text-center cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-indigo-700 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                      {student.nombre ? student.nombre.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h4 className="text-lg font-bold text-darkGray mb-2 line-clamp-1">{student.nombre || 'Sin nombre'}</h4>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {student.tecnologias ? student.tecnologias.split(',').slice(0, 2).map((tech, i) => (
                        <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-semibold">
                          {tech.trim()}
                        </span>
                      )) : (
                        <span className="text-xs text-gray-400">Sin tecnologías</span>
                      )}
                    </div>
                    <span className="text-primary font-semibold text-sm hover:underline inline-flex items-center">
                      Ver Perfil <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay estudiantes disponibles</p>
            </div>
          )}
        </div>
      </section>

      {/* Sección: Proyectos */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 font-semibold">En Progreso</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-poppins font-bold text-darkGray mb-6">
              Proyectos <span className="text-primary">Activos</span>
            </h2>
          </motion.div>

          {loadingProjects ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Cargando proyectos...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Link key={project.id_proyecto || index} to={`/proyectos/${project.id_proyecto}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border-2 border-gray-100 hover:shadow-2xl transition-all-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-gradient-to-br from-primary to-indigo-700 p-3 rounded-2xl">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        project.estado === 'completado' ? 'bg-green-100 text-green-700' :
                        project.estado === 'activo' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {project.estado || 'activo'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-darkGray mb-3 line-clamp-2">{project.titulo}</h3>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progreso</span>
                        <span className="font-bold text-primary">{project.progreso || 0}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progreso || 0}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2 }}
                          className="h-full bg-gradient-to-r from-primary to-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      {project.coordinator && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <UserCheck className="w-4 h-4" />
                          <span>Coord: {project.coordinator.nombre || 'Sin coordinador'}</span>
                        </div>
                      )}
                      {project.initiative && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Code2 className="w-4 h-4" />
                          <span className="line-clamp-1">{project.initiative.nombre || 'Sin iniciativa'}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay proyectos activos</p>
            </div>
          )}
        </div>
      </section>

      {/* Sección: Dashboard Preview */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Panel de Administración</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-poppins font-bold text-darkGray mb-6">
              Monitorea y <span className="text-primary">Gestiona</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dashboard completo para coordinar iniciativas y proyectos
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
            {/* Métricas */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border-2 border-gray-100 hover:border-primary/20 transition-all-300"
                >
                  <div className={`bg-gradient-to-br ${metric.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-darkGray mb-2">{metric.value}</div>
                  <div className="text-gray-600">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Gráfico simulado */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-darkGray">Estadísticas Generales</h3>
                <div className="flex space-x-2">
                  {['Semana', 'Mes', 'Año'].map((period) => (
                    <button key={period} className="px-4 py-2 bg-white rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all">
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl">
                <div className="text-center text-gray-400">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                  <p>Gráfico de barras interactivo</p>
                  <p className="text-sm">Visualiza el crecimiento de proyectos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Testimonios */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-600 font-semibold">Lo que dicen de nosotros</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-poppins font-bold text-darkGray mb-6">
              Nuestras <span className="text-primary">Historias de Éxito</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo SoftLink ha transformado la trayectoria de nuestros estudiantes y proyectos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Gracias a SoftLink, encontré el proyecto perfecto para aplicar mis conocimientos y crecer profesionalmente. ¡Una experiencia increíble!",
                name: "Sofía Martínez",
                title: "Estudiante de Ingeniería de Sistemas",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              },
              {
                quote: "La plataforma me conectó con talentos que impulsaron mi iniciativa a un nivel que no imaginaba. El apoyo y la comunidad son invaluables.",
                name: "Dr. Alejandro Gómez",
                title: "Coordinador de Proyecto",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg"
              },
              {
                quote: "SoftLink es el puente entre la academia y la industria. Mis habilidades se fortalecieron y ahora tengo un portafolio sólido.",
                name: "Luis Fernando Díaz",
                title: "Desarrollador Frontend",
                avatar: "https://randomuser.me/api/portraits/men/78.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border-2 border-gray-100 hover:shadow-xl transition-all-300"
              >
                <div className="flex items-center mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary" />
                  <div>
                    <h4 className="text-lg font-bold text-darkGray">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-primary to-indigo-700 p-3 rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold">SoftLink</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Plataforma institucional para conectar talento con proyectos tecnológicos reales.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {['Inicio', 'Iniciativas', 'Proyectos', 'Estudiantes'].map((link) => (
                  <li key={link}>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Información</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Campus Principal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+57 300 123 4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contacto@softlink.edu</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, color: 'hover:text-blue-400' },
                  { Icon: Twitter, color: 'hover:text-cyan-400' },
                  { Icon: Instagram, color: 'hover:text-pink-400' },
                  { Icon: Linkedin, color: 'hover:text-blue-500' }
                ].map(({ Icon, color }, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-gray-800 rounded-2xl ${color} transition-all`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SoftLink. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
