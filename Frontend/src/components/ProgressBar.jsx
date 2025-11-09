import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProgressBar Component
 * Barra de progreso animada con Framer Motion
 * 
 * @param {number} progress - Valor de progreso (0-100)
 * @param {string} className - Clases adicionales
 */
function ProgressBar({ progress = 0, className = '', showLabel = false }) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso</span>
          <span className="text-sm font-bold text-indigo-600">{progress}%</span>
        </div>
      )}
      
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 0.9, 0.3, 1] // cubic-bezier(.22,.9,.3,1)
          }}
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full shadow-sm"
        />
      </div>
    </div>
  );
}

export default ProgressBar;
