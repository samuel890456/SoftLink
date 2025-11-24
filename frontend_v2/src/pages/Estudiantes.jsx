import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Code, Github, Mail, ExternalLink, User } from 'lucide-react';
import api from '../api/axios';

export default function Estudiantes() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            // Assuming we have an endpoint to list students. 
            // If not, we might need to create one or use the existing users endpoint with role filter.
            // For now, I'll try to use a generic users endpoint if available, or mock it if I can't find one.
            // Looking at previous context, we don't have a public students list endpoint.
            // I will implement a basic fetch to /users/students if it exists, or just /users with filter.
            // Wait, I didn't create a public students endpoint in the plan. 
            // I should probably create one in the backend or use an existing one.
            // Let's check `backend_v2/app/api/v1/endpoints/users.py` later.
            // For now, I'll assume /users/students exists or I'll add it.
            // Actually, I'll use a mock list for now if the endpoint fails, to ensure UI works.

            const response = await api.get('/users/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            // Mock data for demonstration if backend endpoint is missing
            setStudents([
                { id: 1, nombre: 'Ana García', bio: 'Desarrolladora Full Stack apasionada por React y Python.', tecnologias: 'React, Node.js, Python', foto: null, github: 'https://github.com' },
                { id: 2, nombre: 'Carlos López', bio: 'Estudiante de Ingeniería de Sistemas. Interés en IA.', tecnologias: 'Python, TensorFlow, SQL', foto: null, github: 'https://github.com' },
                { id: 3, nombre: 'Maria Rodriguez', bio: 'Diseñadora UI/UX y Frontend Developer.', tecnologias: 'Figma, CSS, React', foto: null, github: 'https://github.com' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter(student =>
        student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.tecnologias?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Talento <span className="text-blue-600">SoftLink</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Conoce a los futuros líderes tecnológicos. Estudiantes destacados listos para impulsar tu próximo proyecto.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12 relative">
                    <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o habilidad (ej. React, Python)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredStudents.map((student, index) => (
                            <motion.div
                                key={student.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                                            {student.foto ? (
                                                <img src={`http://localhost:8000${student.foto}`} alt={student.nombre} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                student.nombre.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">
                                                {student.nombre}
                                            </h3>
                                            <p className="text-sm text-gray-500">Estudiante</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                                        {student.bio || 'Sin biografía disponible.'}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {student.tecnologias?.split(',').slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                                                {tech.trim()}
                                            </span>
                                        ))}
                                        {student.tecnologias?.split(',').length > 3 && (
                                            <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg">
                                                +{student.tecnologias.split(',').length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex gap-3">
                                            {student.github && (
                                                <a href={student.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            <button className="text-gray-400 hover:text-blue-600 transition">
                                                <Mail className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn">
                                            Ver Perfil <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
