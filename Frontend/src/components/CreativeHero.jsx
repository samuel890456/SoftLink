import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Sparkles, ArrowRight, Zap, TrendingUp } from 'lucide-react';

/**
 * Hero Section - Diseño Disruptivo y Dinámico
 * Asimétrico, con elementos flotantes y gradientes vibrantes
 */
function CreativeHero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
      {/* Fondo con partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas decorativas */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradientes animados de fondo */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna Izquierda - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
            style={{ y, opacity }}
          >
            {/* Badge animado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
              <span className="text-white font-semibold text-sm">¡Plataforma líder en innovación!</span>
            </motion.div>

            {/* Título principal con gradiente */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-poppins font-black text-6xl md:text-7xl lg:text-8xl leading-tight mb-8"
            >
              <span className="block text-white">Innovación</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                y Talento
              </span>
              <span className="block text-white">Universitario</span>
            </motion.h1>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-inter font-light max-w-xl"
            >
              Para el desarrollo tecnológico. Colabora, aprende y crea soluciones reales.
            </motion.p>

            {/* CTAs con hover 3D */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center space-x-3 bg-white text-indigo-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Rocket className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Explorar Iniciativas</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(16,185,129,0.4)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.5)] transition-shadow"
              >
                <Zap className="w-6 h-6" />
                <span>Crear cuenta</span>
              </motion.button>
            </motion.div>

            {/* Estadísticas flotantes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-wrap gap-8"
            >
              {[
                { value: '500+', label: 'Estudiantes' },
                { value: '150+', label: 'Proyectos' },
                { value: '98%', label: 'Satisfacción' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Columna Derecha - Visualización 3D */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.22, 0.9, 0.3, 1] }}
            className="relative"
          >
            {/* Card principal con efecto 3D */}
            <motion.div
              whileHover={{ rotateY: 5, rotateX: 5 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/30 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                {/* Grid de datos simulados */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="bg-white/20 backdrop-blur-md h-24 rounded-2xl p-4 border border-white/30"
                    >
                      <div className="h-3 bg-white/40 rounded-full mb-2"></div>
                      <div className="h-3 bg-white/40 rounded-full w-3/4"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Indicadores de actividad */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-400 rounded-full"
                    />
                    <span className="text-white/80 text-sm">Activo</span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-yellow-300" />
                </div>
              </div>

              {/* Badges flotantes */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold">Nuevo</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl border border-white/30 shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold">Premium</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-white/50 text-sm mb-2">Scroll para explorar</p>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/70 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CreativeHero;

