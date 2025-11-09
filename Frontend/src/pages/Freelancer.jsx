import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { Briefcase, Target, TrendingUp, Award, Code, Calendar, Users, Sparkles, ArrowRight, User, Search } from 'lucide-react';

function Freelancer() {
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

  const benefits = [
    {
      icon: Briefcase,
      title: 'Experiencia Real',
      desc: 'Trabaja en proyectos con clientes reales, enfrentando desafíos del mundo profesional.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: TrendingUp,
      title: 'Visibilidad y Portafolio',
      desc: 'Construye un portafolio impresionante con proyectos terminados y testimonios de clientes.',
      color: 'from-accent to-green-600'
    },
    {
      icon: Users,
      title: 'Conexión Laboral',
      desc: 'Establece contactos con empresas que buscan talento emergente en la región.',
      color: 'from-blue-500 to-blue-700'
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Crea tu Perfil',
      desc: 'Completa tu perfil de estudiante destacando tus habilidades y proyectos previos.',
      icon: User
    },
    {
      step: '2',
      title: 'Explora Convocatorias',
      desc: 'Revisa las iniciativas disponibles y postúlate a las que te interesen.',
      icon: Search
    },
    {
      step: '3',
      title: 'Desarrolla y Evalúa',
      desc: 'Trabaja en el proyecto, recibe retroalimentación y obtén tu evaluación final.',
      icon: Award
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="bg-gradient-to-br from-primary via-indigo-600 to-purple-700 text-white p-12 rounded-3xl relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full inline-block mb-6">
              <span className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Modalidad FreeLancer</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 leading-tight">
              Modalidad <span className="bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">FreeLancer</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
              Trabaja en proyectos reales, construye tu portafolio y convierte esta experiencia en tu proyecto de graduación.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <Card className="mb-16 bg-gradient-to-br from-white to-lightGray">
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-3xl">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-poppins font-bold text-darkGray mb-4">
              ¿Qué es la Modalidad FreeLancer?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nuestra modalidad FreeLancer ofrece a los estudiantes del 6to semestre la oportunidad de trabajar en proyectos tecnológicos reales para empresas y comunidades, bajo un esquema flexible y autónomo. Esta experiencia no solo te permite aplicar tus conocimientos, sino que también puede servir como tu experiencia de graduación, validando tus habilidades en un entorno profesional.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Conviértete en un desarrollador independiente, gestiona tus propios tiempos y entrega soluciones de alto impacto, todo mientras construyes un portafolio sólido y te conectas con el mercado laboral.
            </p>
          </div>
        </div>
      </Card>

      {/* Benefits */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-poppins font-bold text-darkGray mb-4">
            Beneficios Clave
          </h2>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas para tu desarrollo profesional
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center hover:shadow-glow transition-all-300 h-full">
                <div className={`bg-gradient-to-br ${benefit.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft`}>
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-darkGray mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process */}
      <Card className="mb-16 bg-gradient-to-br from-lightGray to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-poppins font-bold text-darkGray mb-4">
            Proceso de Inscripción
          </h2>
          <p className="text-xl text-gray-600">
            Sigue estos simples pasos para comenzar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {process.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-primary to-indigo-700 text-white text-6xl font-bold w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                {item.step}
              </div>
              <div className="bg-lightGray p-4 rounded-3xl mb-4 inline-block">
                <item.icon className="w-12 h-12 text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-darkGray mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 text-white p-12 rounded-3xl text-center shadow-glow relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-poppins font-bold mb-4">
            ¿Listo para empezar tu experiencia FreeLancer?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Inscríbete hoy mismo y transforma tu futuro profesional.
          </p>
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                className="bg-white text-primary hover:bg-gray-100 hover:shadow-glow"
                size="lg"
              >
                <span>Inscribirme ahora</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Freelancer;
