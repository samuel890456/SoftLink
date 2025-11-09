import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

/**
 * ProfileCard Component (Estudiante)
 * Card de perfil con avatar circular, tech stack y redes sociales
 * 
 * @param {Object} student - Datos del estudiante
 */
function ProfileCard({ student }) {
  const { name, tech, avatar, github, linkedin, email, projects } = student;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        duration: 0.32,
        ease: [0.22, 0.9, 0.3, 1]
      }}
      className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-xl transition-all duration-320 border border-gray-100 group cursor-pointer"
    >
      {/* Avatar y nombre */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-4xl mb-4 shadow-lg">
          {avatar || '👤'}
        </div>
        <h3 className="font-poppins font-semibold text-[28px] text-[#0F172A] text-center">
          {name}
        </h3>
        <p className="text-sm text-[#6B7280]">Estudiante</p>
      </div>

      {/* Tech Stack Chips */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {tech.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Estadísticas */}
      {projects && (
        <div className="mb-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-[#0F172A]">{projects}</div>
              <div className="text-[#6B7280]">Proyectos</div>
            </div>
          </div>
        </div>
      )}

      {/* Redes sociales */}
      <div className="flex items-center justify-center space-x-3 pt-4 border-t border-gray-100">
        {github && (
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <Github className="w-5 h-5" />
          </motion.a>
        )}
        {linkedin && (
          <motion.a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
        )}
        {email && (
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

export default ProfileCard;

