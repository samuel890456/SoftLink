import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Rocket, GraduationCap, Sparkles, ArrowRight, Zap,
    TrendingUp, Users, Target, Award, BarChart3
} from 'lucide-react';
import CollectorProfileCard from '../components/CollectorProfileCard';
import ProjectCard from '../components/ProjectCard';
import DashboardMetricCard from '../components/DashboardMetricCard';

export default function LandingPage() {
    // Datos simulados para estudiantes tipo coleccionista
    const students = [
        {
            name: 'Ana García',
            tech: ['React', 'TypeScript', 'Node.js'],
            avatar: '👩‍💻',
            github: 'https://github.com/anag',
            linkedin: 'https://linkedin.com/in/anag',
            email: 'ana@example.com',
            projects: 12,
            contributions: 156
        },
        {
            name: 'Carlos Mendoza',
            tech: ['Python', 'Django', 'PostgreSQL'],
            avatar: '👨‍💻',
            github: 'https://github.com/carlosm',
            linkedin: 'https://linkedin.com/in/carlosm',
            email: 'carlos@example.com',
            projects: 8,
            contributions: 89
        },
        {
            name: 'María López',
            tech: ['Vue.js', 'Firebase', 'GraphQL'],
            avatar: '👩‍💻',
            github: 'https://github.com/marial',
            projects: 15,
            contributions: 203
        },
        {
            name: 'José Ramírez',
            tech: ['Flutter', 'Dart', 'REST'],
            avatar: '👨‍💻',
            github: 'https://github.com/joser',
            linkedin: 'https://linkedin.com/in/joser',
            projects: 9,
            contributions: 112
        },
        {
            name: 'Laura Torres',
            tech: ['React Native', 'Expo', 'AWS'],
            avatar: '👩‍💻',
            github: 'https://github.com/lauram',
            linkedin: 'https://linkedin.com/in/lauram',
            email: 'laura@example.com',
            projects: 11,
            contributions: 187
        },
        {
            name: 'Diego Fernández',
            tech: ['Next.js', 'Prisma', 'TailwindCSS'],
            avatar: '👨‍💻',
            github: 'https://github.com/diegof',
            projects: 7,
            contributions: 95
        }
    ];

    // Datos para métricas del dashboard
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
            icon: Award
        },
        {
            title: 'Estudiantes Registrados',
            value: '524',
            change: '+24%',
            trend: 'up',
            icon: Users
        },
        {
            title: 'Impacto Regional',
            value: '98%',
            change: '+5%',
            trend: 'up',
            icon: TrendingUp
        }
    ];

    // Proyectos destacados
    const projects = [
        {
            id: 1,
            title: 'Sistema de Gestión de Residuos IoT',
            description: 'Plataforma web con integración IoT para optimizar la recolección y procesamiento de residuos urbanos en tiempo real.',
            category: 'Sostenibilidad',
            status: 'activa',
            progress: 85,
            students: 12,
            icon: '♻️'
        },
        {
            id: 2,
            title: 'Marketplace Educativo Inteligente',
            description: 'App móvil cross-platform con IA para intercambio de recursos educativos entre instituciones universitarias.',
            category: 'Educación',
            status: 'activa',
            progress: 72,
            students: 15,
            icon: '📚'
        },
        {
            id: 3,
            title: 'Dashboard Financiero para PYMES',
            description: 'Aplicación web con visualizaciones interactivas para gestión financiera y análisis predictivo para pequeñas empresas.',
            category: 'Empresarial',
            status: 'en-revision',
            progress: 45,
            students: 8,
            icon: '📊'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 0.9, 0.3, 1]
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-emerald-50">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
                {/* Partículas flotantes */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-white/40 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -40, 0],
                                opacity: [0.2, 1, 0.2],
                                scale: [1, 2, 1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Columna izquierda */}
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mb-8"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Sparkles className="w-5 h-5 text-yellow-300" />
                                </motion.div>
                                <span className="text-white font-semibold">Plataforma líder en innovación</span>
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
                                <span className="block text-white">Innovación</span>
                                <span className="block bg-gradient-to-r from-yellow-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                                    y Talento
                                </span>
                                <span className="block text-white">Universitario</span>
                            </h1>

                            <p className="text-2xl text-white/90 mb-10 font-light">
                                Conectando estudiantes con proyectos reales para el desarrollo tecnológico.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link to="/iniciativas">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group inline-flex items-center space-x-3 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl w-full sm:w-auto justify-center"
                                    >
                                        <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                        <span>Explorar Iniciativas</span>
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </motion.button>
                                </Link>

                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl w-full sm:w-auto justify-center"
                                    >
                                        <GraduationCap className="w-6 h-6" />
                                        <span>Crear cuenta</span>
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Estadísticas */}
                            <div className="mt-12 flex gap-8 justify-center sm:justify-start">
                                {['500+', '150+', '98%'].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat}</div>
                                        <div className="text-sm text-white/70">Activos</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Columna derecha - Mockup 3D */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, rotateY: -15 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 1 }}
                            whileHover={{ rotateY: 5, rotateX: 5 }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="relative hidden lg:block"
                        >
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="bg-white/20 backdrop-blur-md h-32 rounded-2xl p-4 border border-white/30">
                                            <div className="h-3 bg-white/40 rounded mb-2"></div>
                                            <div className="h-3 bg-white/40 rounded w-3/4"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl"
                            >
                                <div className="flex items-center space-x-2">
                                    <Zap className="w-5 h-5" />
                                    <span className="font-bold">Nuevo Proyecto</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sección de Estudiantes - Fichas de Coleccionista */}
            <section className="py-24 px-4 relative overflow-hidden">
                {/* Fondo con textura sutil */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

                <div className="container mx-auto max-w-[1280px] relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full border-2 border-indigo-200 mb-6"
                        >
                            <Zap className="w-6 h-6 text-indigo-600" />
                            <span className="text-indigo-700 font-bold text-lg">Talento Destacado</span>
                        </motion.div>

                        <h2 className="font-poppins font-black text-5xl md:text-6xl text-[#0F172A] mb-6">
                            Nuestros <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Estudiantes</span>
                        </h2>
                        <p className="text-xl text-[#6B7280] max-w-2xl mx-auto font-inter">
                            Conoce al talento que está transformando la región
                        </p>
                    </motion.div>

                    {/* Grid de fichas de coleccionista */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {students.map((student, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <CollectorProfileCard student={student} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Sección de Proyectos */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-[1280px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border-2 border-green-200 mb-6">
                            <Target className="w-6 h-6 text-green-600" />
                            <span className="text-green-700 font-bold text-lg">Iniciativas Activas</span>
                        </div>

                        <h2 className="font-poppins font-black text-5xl md:text-6xl text-[#0F172A] mb-6">
                            Proyectos <span className="text-indigo-600">Destacados</span>
                        </h2>
                        <p className="text-xl text-[#6B7280] max-w-2xl mx-auto font-inter">
                            Únete a proyectos que generan impacto real
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto max-w-[1280px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border-2 border-purple-200 mb-6">
                            <BarChart3 className="w-6 h-6 text-purple-600" />
                            <span className="text-purple-700 font-bold text-lg">Panel de Control</span>
                        </div>

                        <h2 className="font-poppins font-black text-5xl md:text-6xl text-[#0F172A] mb-6">
                            Dashboard de <span className="text-indigo-600">Gestión</span>
                        </h2>
                    </motion.div>

                    {/* Grid de métricas con diseño asimétrico */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className={index % 2 === 0 ? '' : 'lg:mt-8'}
                            >
                                <DashboardMetricCard metric={metric} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">¿Listo para comenzar?</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Únete a cientos de estudiantes y empresas que ya están transformando el futuro tecnológico.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-bold text-lg shadow-lg hover:shadow-indigo-500/30">
                            Registrarse Ahora
                        </Link>
                        <Link to="/login" className="px-8 py-4 bg-transparent border-2 border-gray-600 text-white rounded-xl hover:bg-gray-800 transition font-bold text-lg">
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
