import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users } from 'lucide-react';
import ProgressBar from './ProgressBar';

/**
 * ProjectCard Component
 * Card de proyecto con barra de progreso, badges y animaciones
 * 
 * @param {Object} project - Datos del proyecto
 */
function ProjectCard({ project }) {
  const { id, title, description, category, status, progress, students, icon } = project;

  // Colores para badges según estado
  const statusColors = {
    'activa': 'bg-green-100 text-green-700 border-green-200',
    'en-revision': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'completada': 'bg-blue-100 text-blue-700 border-blue-200',
    'archivada': 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ 
        duration: 0.32,
        ease: [0.22, 0.9, 0.3, 1]
      }}
      className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-xl transition-all duration-320 border border-gray-100 group cursor-pointer"
    >
      {/* Header con ícono y badges */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-2xl shadow-sm">
            {icon || '🚀'}
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-[28px] text-[#0F172A] mb-1 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#6B7280]">{category}</span>
            </div>
          </div>
        </div>
        
        {/* Badge de estado */}
        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
          statusColors[status] || statusColors['activa']
        }`}>
          {status}
        </span>
      </div>

      {/* Descripción */}
      <p className="text-[16px] text-[#6B7280] mb-6 line-clamp-2 font-inter">
        {description}
      </p>

      {/* Información adicional */}
      <div className="flex items-center space-x-4 mb-4 text-sm text-[#6B7280]">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{students || 0} estudiantes</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>En progreso</span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} className="mb-4" />

      {/* Footer con botón */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm font-semibold text-indigo-600">
          Ver detalles
        </span>
        <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

export default ProjectCard;

