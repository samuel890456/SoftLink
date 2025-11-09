import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, GraduationCap, ArrowRight, Check, X, Clock, Users, Target } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProfileCard from '../components/ProfileCard';
import DashboardMetricCard from '../components/DashboardMetricCard';
import ProgressBar from '../components/ProgressBar';

function PlataformaPI() {
  // Datos simulados para proyectos
  const projects = [
    {
      id: 1,
      title: 'Sistema de Gestión de Residuos',
      description: 'Plataforma web para optimizar la recolección y procesamiento de residuos urbanos mediante IoT.',
      category: 'Sostenibilidad',
      status: 'activa',
      progress: 75,
      students: 8,
      icon: '♻️'
    },
    {
      id: 2,
      title: 'App Móvil para PYMES',
      description: 'Aplicación móvil cross-platform para gestión de inventario y ventas para pequeñas empresas.',
      category: 'Empresarial',
      status: 'en-revision',
      progress: 45,
      students: 6,
      icon: '📱'
    },
    {
      id: 3,
      title: 'Marketplace Educativo',
      description: 'Plataforma de intercambio de recursos educativos entre instituciones universitarias.',
      category: 'Educación',
      status: 'completada',
      progress: 100,
      students: 12,
      icon: '📚'
    }
  ];

  // Datos simulados para estudiantes
  const students = [
    {
      name: 'Ana García',
      tech: ['React', 'Node.js', 'TypeScript'],
      avatar: '👩‍💻',
      github: 'https://github.com/anag',
      linkedin: 'https://linkedin.com/in/anag',
      email: 'ana@example.com',
      projects: 5
    },
    {
      name: 'Carlos Mendoza',
      tech: ['Python', 'Django', 'PostgreSQL'],
      avatar: '👨‍💻',
      github: 'https://github.com/carlosm',
      projects: 3
    },
    {
      name: 'María López',
      tech: ['Vue.js', 'Firebase', 'GraphQL'],
      avatar: '👩‍💻',
      github: 'https://github.com/marial',
      projects: 4
    }
  ];

  // Datos simulados para métricas
  const metrics = [
    {
      title: 'Iniciativas Activas',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Target
    },
    {
      title: 'Proyectos Completados',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: Check
    },
    {
      title: 'Estudiantes Registrados',
      value: '524',
      change: '+24%',
      trend: 'up',
      icon: Users
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10 max-w-1280px">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenido izquierdo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-poppins font-black text-[40px] md:text-5xl lg:text-6xl leading-tight text-white mb-6"
              >
                Innovación y talento universitario
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-inter"
              >
                Colabora, aprende y crea soluciones reales con la comunidad institucional.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="group inline-flex items-center justify-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-320">
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>Explorar Iniciativas</span>
                </button>

                <button className="group inline-flex items-center justify-center space-x-2 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-600 hover:scale-105 hover:shadow-2xl transition-all duration-320">
                  <GraduationCap className="w-6 h-6" />
                  <span>Crear cuenta</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Mockup derecho */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.9, 0.3, 1] }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                {/* Simulación de dashboard */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/20 backdrop-blur-sm h-32 rounded-xl p-4 border border-white/30">
                      <div className="h-3 bg-white/40 rounded mb-2"></div>
                      <div className="h-3 bg-white/40 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge flotante */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span className="font-bold">Activo</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Convocatorias */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-1280px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-[28px] md:text-4xl text-[#0F172A] mb-4">
              Convocatorias Activas
            </h2>
            <p className="text-[16px] text-[#6B7280] max-w-2xl mx-auto">
              Únete a proyectos que generan impacto real
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 bg-[#F9FAFB]">
        <div className="container mx-auto max-w-1280px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-[28px] md:text-4xl text-[#0F172A] mb-4">
              Dashboard de Gestión
            </h2>
          </motion.div>

          {/* Grid de métricas */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <DashboardMetricCard key={index} metric={metric} />
            ))}
          </div>

          {/* Tabla de proyectos */}
          <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.06)] overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-poppins font-semibold text-[28px] text-[#0F172A]">
                Gestión de Iniciativas
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Proyecto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]">Progreso</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#6B7280]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#0F172A]">{project.title}</div>
                        <div className="text-sm text-[#6B7280]">{project.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          project.status === 'activa' ? 'bg-green-100 text-green-700' :
                          project.status === 'en-revision' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ProgressBar progress={project.progress} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="w-10 h-10 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors">
                            <Check className="w-5 h-5" />
                          </button>
                          <button className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Estudiante Directory */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-1280px">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-poppins font-bold text-[28px] md:text-4xl text-[#0F172A] mb-4">
              Nuestros Estudiantes
            </h2>
            <p className="text-[16px] text-[#6B7280] max-w-2xl mx-auto">
              Conoce al talento que está transformando la región
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {students.map((student, index) => (
              <ProfileCard key={index} student={student} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlataformaPI;

