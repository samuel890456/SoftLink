import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * DashboardMetricCard Component
 * Card de métrica para dashboard con número grande, ícono y sparkline
 * 
 * @param {Object} metric - Datos de la métrica
 */
function DashboardMetricCard({ metric }) {
  const { title, value, change, icon: Icon, trend } = metric;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.32,
        ease: [0.22, 0.9, 0.3, 1]
      }}
      className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-xl transition-all duration-320 border border-gray-100 group"
    >
      {/* Header con ícono */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-sm">
          <Icon className="w-7 h-7 text-white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
            trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-semibold">{change}</span>
          </div>
        )}
      </div>

      {/* Valor grande */}
      <div className="mb-2">
        <div className="font-poppins font-bold text-[40px] text-[#0F172A]">
          {value}
        </div>
      </div>

      {/* Título */}
      <div className="text-[16px] text-[#6B7280] font-inter">
        {title}
      </div>

      {/* Sparkline sutil (simulado) */}
      <div className="mt-6 h-12 flex items-end space-x-1">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: Math.random() * 100 + '%' }}
            transition={{ 
              delay: index * 0.05, 
              duration: 0.5,
              ease: [0.22, 0.9, 0.3, 1]
            }}
            className="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg opacity-60 group-hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default DashboardMetricCard;
