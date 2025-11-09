import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, GraduationCap, Sparkles, ArrowRight, Zap, TrendingUp, Users, Award, Target, Code2, Mail, Github, Linkedin, Award as AwardIcon } from 'lucide-react';

function HomeDisruptive() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-emerald-50">
      {/* Hero con efectos 3D y partículas */}
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

              <h1 className="text-6xl md:text-8xl font-black font-poppins leading-tight mb-8">
                <span className="block text-white">Innovación</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                  y Talento
                </span>
                <span className="block text-white">Universitario</span>
              </h1>

              <p className="text-2xl text-white/90 mb-10 font-light">
                Para el desarrollo tecnológico
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center space-x-3 bg-white text-indigo-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl"
                >
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span>Explorar Iniciativas</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl"
                >
                  <GraduationCap className="w-6 h-6" />
                  <span>Crear cuenta</span>
                </motion.button>
              </div>

              {/* Estadísticas */}
              <div className="mt-12 flex gap-8">
                {['500+', '150+', '98%'].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-5xl font-black text-white mb-2">{stat}</div>
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
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {[1,2,3,4].map((i) => (
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
                  <span className="font-bold">Nuevo</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Estudiantes */}
      <section className="py-24 px-4 bg-white relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-3 bg-indigo-100 px-6 py-3 rounded-full mb-6">
              <Zap className="w-6 h-6 text-indigo-600" />
              <span className="text-indigo-700 font-bold">Talento Destacado</span>
            </div>
            <h2 className="text-6xl font-black font-poppins mb-6">
              Nuestros <span className="text-indigo-600">Estudiantes</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Ana García', tech: ['React', 'TypeScript', 'Node.js'], avatar: '👩‍💻', projects: 12, contributions: 156 },
              { name: 'Carlos Mendoza', tech: ['Python', 'Django', 'PostgreSQL'], avatar: '👨‍💻', projects: 8, contributions: 89 },
              { name: 'María López', tech: ['Vue.js', 'Firebase', 'GraphQL'], avatar: '👩‍💻', projects: 15, contributions: 203 }
            ].map((student, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -12, rotateY: 5, scale: 1.02 }}
                style={{ transformStyle: "preserve-3d" }}
                className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-indigo-300 shadow-xl hover:shadow-2xl transition-all overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-emerald-50 opacity-50" />
                
                <div className="relative">
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-32 h-32 rounded-full border-4 border-indigo-200 relative mb-4"
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-5xl border-4 border-white shadow-2xl">
                        {student.avatar}
                      </div>
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h3>
                    <p className="text-sm text-gray-600">Estudiante Activo</p>
                  </div>

                  <div className="flex justify-around mb-6 py-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-black text-indigo-600">{student.projects}</div>
                      <div className="text-xs text-gray-600 font-medium">Proyectos</div>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-emerald-600">{student.contributions}</div>
                      <div className="text-xs text-gray-600 font-medium">Commits</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Code2 className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {student.tech.map((skill, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-3 rounded-2xl border-2 border-yellow-200 mb-6"
                  >
                    <AwardIcon className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-bold text-orange-700">Top Contributor</span>
                  </motion.div>

                  <div className="flex justify-center space-x-3 pt-4 border-t-2 border-gray-100">
                    <motion.a whileHover={{ scale: 1.15, rotate: 5 }} href="#" className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white shadow-lg">
                      <Github className="w-6 h-6" />
                    </motion.a>
                    <motion.a whileHover={{ scale: 1.15, rotate: -5 }} href="#" className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg">
                      <Linkedin className="w-6 h-6" />
                    </motion.a>
                    <motion.a whileHover={{ scale: 1.15, rotate: 3 }} href="#" className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                      <Mail className="w-6 h-6" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeDisruptive;

