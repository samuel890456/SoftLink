import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { Target, CheckCircle, TrendingUp, Award, Scale, BarChart3, Lightbulb, Users, Code2 } from 'lucide-react';

function Criterios() {
  const criterios = [
    {
      icon: Code2,
      title: 'Viabilidad Técnica',
      description: 'Evaluamos la factibilidad técnica del proyecto, considerando las tecnologías disponibles, los recursos necesarios y la complejidad de implementación.',
      color: 'from-blue-500 to-cyan-500',
      points: [
        'Tecnologías y herramientas adecuadas',
        'Recursos técnicos disponibles',
        'Complejidad manejable para estudiantes',
        'Tiempo de desarrollo realista'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Impacto Potencial',
      description: 'Analizamos el impacto social, educativo o empresarial que puede generar la iniciativa, priorizando proyectos con mayor valor agregado.',
      color: 'from-green-500 to-emerald-500',
      points: [
        'Impacto social positivo',
        'Beneficios para la comunidad',
        'Valor educativo para estudiantes',
        'Relevancia en el mercado'
      ]
    },
    {
      icon: Scale,
      title: 'Relevancia Social',
      description: 'Valoramos la importancia de la iniciativa en el contexto social y su capacidad de resolver problemas reales de la comunidad.',
      color: 'from-purple-500 to-pink-500',
      points: [
        'Resolución de problemas reales',
        'Beneficio para grupos específicos',
        'Alcance e impacto social',
        'Sostenibilidad a largo plazo'
      ]
    },
    {
      icon: Users,
      title: 'Alineación Académica',
      description: 'Verificamos que la iniciativa esté alineada con los objetivos de aprendizaje del programa y las competencias a desarrollar.',
      color: 'from-orange-500 to-red-500',
      points: [
        'Competencias del programa',
        'Objetivos de aprendizaje',
        'Nivel de dificultad apropiado',
        'Experiencia de graduación válida'
      ]
    }
  ];

  const procesoEvaluacion = [
    {
      step: '1',
      title: 'Recepción de Iniciativas',
      description: 'Las empresas o instituciones envían sus iniciativas a través del formulario de registro.',
      icon: Lightbulb
    },
    {
      step: '2',
      title: 'Evaluación Inicial',
      description: 'Los coordinadores revisan la documentación y realizan una evaluación preliminar según los criterios establecidos.',
      icon: Target
    },
    {
      step: '3',
      title: 'Puntuación Automática',
      description: 'El sistema calcula automáticamente una puntuación basada en los criterios: viabilidad técnica, impacto potencial, relevancia social y alineación académica.',
      icon: BarChart3
    },
    {
      step: '4',
      title: 'Clasificación y Priorización',
      description: 'Las iniciativas se clasifican y priorizan según su puntuación, asegurando que los mejores proyectos sean asignados primero.',
      icon: Award
    },
    {
      step: '5',
      title: 'Aprobación Final',
      description: 'Los coordinadores realizan una revisión final y aprueban las iniciativas que cumplan con todos los requisitos.',
      icon: CheckCircle
    }
  ];

  const sistemaPuntuacion = [
    { criterio: 'Viabilidad Técnica', peso: 30, max: 30 },
    { criterio: 'Impacto Potencial', peso: 25, max: 25 },
    { criterio: 'Relevancia Social', peso: 25, max: 25 },
    { criterio: 'Alineación Académica', peso: 20, max: 20 },
    { criterio: 'Total', peso: 100, max: 100, isTotal: true }
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-3xl inline-block mb-6">
          <Scale className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-poppins font-bold text-darkGray mb-6">
          Criterios de <span className="text-primary">Selección</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Nuestro sistema de evaluación garantiza que solo las mejores iniciativas sean seleccionadas, 
          asegurando proyectos de calidad que generen impacto real y contribuyan al desarrollo profesional de nuestros estudiantes.
        </p>
      </motion.div>

      {/* Criterios de Evaluación */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-darkGray mb-4">
            Criterios de Evaluación
          </h2>
          <p className="text-lg text-gray-600">
            Cuatro pilares fundamentales para la selección de iniciativas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {criterios.map((criterio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all-300">
                <div className={`bg-gradient-to-br ${criterio.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <criterio.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-darkGray mb-4">
                  {criterio.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {criterio.description}
                </p>
                <ul className="space-y-2">
                  {criterio.points.map((point, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sistema de Puntuación */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-darkGray mb-4">
            Sistema de Puntuación
          </h2>
          <p className="text-lg text-gray-600">
            Cada criterio tiene un peso específico en la evaluación final
          </p>
        </motion.div>

        <Card className="bg-gradient-to-br from-white to-lightGray">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-darkGray">Criterio</th>
                  <th className="text-center py-4 px-6 font-semibold text-darkGray">Peso (%)</th>
                  <th className="text-center py-4 px-6 font-semibold text-darkGray">Puntuación Máxima</th>
                </tr>
              </thead>
              <tbody>
                {sistemaPuntuacion.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 ${
                      item.isTotal ? 'bg-primary/10 font-bold' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-6 text-darkGray">{item.criterio}</td>
                    <td className="py-4 px-6 text-center text-gray-700">{item.peso}%</td>
                    <td className="py-4 px-6 text-center text-primary font-semibold">{item.max} puntos</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> Las iniciativas deben obtener un mínimo de 70 puntos sobre 100 para ser aprobadas. 
              Las iniciativas con mayor puntuación tienen prioridad en la asignación de estudiantes.
            </p>
          </div>
        </Card>
      </section>

      {/* Proceso de Evaluación */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-darkGray mb-4">
            Proceso de Evaluación
          </h2>
          <p className="text-lg text-gray-600">
            Cómo evaluamos y seleccionamos las iniciativas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {procesoEvaluacion.map((paso, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < procesoEvaluacion.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent z-0" style={{ width: 'calc(100% - 3rem)', marginLeft: '3rem' }} />
              )}
              
              <Card className="relative z-10 text-center h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all-300">
                <div className="bg-gradient-to-br from-primary to-indigo-700 text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {paso.step}
                </div>
                <div className="bg-lightGray p-4 rounded-2xl mb-4 inline-block">
                  <paso.icon className="w-8 h-8 text-primary mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-darkGray mb-3">
                  {paso.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {paso.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Información Adicional */}
      <Card className="bg-gradient-to-br from-primary/10 to-indigo-100 border-2 border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-2xl">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-poppins font-bold text-darkGray mb-4">
              ¿Tienes una iniciativa?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Si tienes una idea de proyecto que crees que podría ser seleccionada, no dudes en enviarla. 
              Nuestro equipo de coordinadores la evaluará cuidadosamente según estos criterios y te notificará 
              el resultado en un plazo máximo de 15 días hábiles.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Recuerda:</strong> Mientras más completa y detallada sea tu iniciativa, mayor será su 
              probabilidad de ser aprobada y asignada a estudiantes.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Criterios;

