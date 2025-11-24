import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Award, TrendingUp, Code2 } from 'lucide-react';

/**
 * CollectorProfileCard - Ficha de Coleccionista
 * Diseño tipo "ficha de coleccionista" con avatar circular, fondo degradado vertical,
 * tech stack destacado y badges de logros
 */
function CollectorProfileCard({ student }) {
    const { name, tech, avatar, github, linkedin, email, projects, contributions } = student;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            whileHover={{ y: -12, rotateY: 5, scale: 1.02 }}
            transition={{
                duration: 0.4,
                ease: [0.22, 0.9, 0.3, 1]
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-indigo-300 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] transition-all duration-400 cursor-pointer"
        >
            {/* Fondo degradado vertical */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 opacity-50" />

            {/* Contenido principal */}
            <div className="relative p-8">
                {/* Header con avatar circular grande */}
                <div className="flex flex-col items-center mb-6">
                    {/* Avatar con anillo animado */}
                    <div className="relative mb-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-5xl shadow-2xl relative z-10 border-4 border-white"
                        >
                            {avatar || '👤'}
                        </motion.div>

                        {/* Anillo decorativo rotatorio */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-indigo-200"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Nombre con tipografía Poppins bold */}
                    <h3 className="font-poppins font-bold text-[28px] text-[#0F172A] mb-2 text-center group-hover:text-indigo-600 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-[#6B7280] font-inter">Estudiante Activo</p>
                </div>

                {/* Stats en fila */}
                <div className="flex items-center justify-around mb-6 py-4 bg-white/60 rounded-2xl backdrop-blur-sm border border-gray-100">
                    <div className="text-center">
                        <div className="text-3xl font-black text-indigo-600">{projects || 5}</div>
                        <div className="text-xs text-[#6B7280] font-medium">Proyectos</div>
                    </div>
                    <div className="w-px h-12 bg-gray-200" />
                    <div className="text-center">
                        <div className="text-3xl font-black text-emerald-600">{contributions || 24}</div>
                        <div className="text-xs text-[#6B7280] font-medium">Commits</div>
                    </div>
                </div>

                {/* Tech Stack - Chips con animación staggered */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                        <Code2 className="w-5 h-5 text-indigo-600" />
                        <span className="text-sm font-semibold text-[#6B7280] uppercase tracking-wide">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tech.map((skill, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-shadow"
                            >
                                <span>{skill}</span>
                                <TrendingUp className="w-3 h-3" />
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Badge de logros */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-3 rounded-2xl border-2 border-yellow-200"
                >
                    <Award className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-bold text-orange-700">Top Contributor</span>
                </motion.div>

                {/* Redes sociales con hover 3D */}
                <div className="flex items-center justify-center space-x-3 pt-4 border-t-2 border-gray-100">
                    {github && (
                        <motion.a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: 5, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Github className="w-6 h-6" />
                        </motion.a>
                    )}
                    {linkedin && (
                        <motion.a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: -5, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Linkedin className="w-6 h-6" />
                        </motion.a>
                    )}
                    {email && (
                        <motion.a
                            href={`mailto:${email}`}
                            whileHover={{ scale: 1.15, rotate: 3, y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Mail className="w-6 h-6" />
                        </motion.a>
                    )}
                </div>
            </div>

            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </motion.div>
    );
}

export default CollectorProfileCard;
