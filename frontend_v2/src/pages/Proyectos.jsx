import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FolderGit2, Calendar, Clock, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Proyectos() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            let data;
            if (user) {
                data = await projectService.getMyProjects();
            } else {
                data = await projectService.getPublicProjects();
            }
            setProjects(data);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
                        <p className="mt-2 text-gray-600">
                            {!user
                                ? 'Explora los proyectos innovadores que se están desarrollando en SoftLink.'
                                : user.id_rol === 2
                                    ? 'Gestiona tus proyectos activos y revisa tus entregas.'
                                    : 'Supervisa el progreso de los proyectos en curso.'}
                        </p>
                    </div>
                </div>

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id_proyecto}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                            <FolderGit2 className="w-6 h-6" />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.estado === 'activo' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {project.estado.charAt(0).toUpperCase() + project.estado.slice(1)}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                        {project.titulo}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {project.descripcion}
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                            Inicio: {new Date(project.fecha_inicio).toLocaleDateString()}
                                        </div>

                                        <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${project.progreso || 0}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Progreso</span>
                                            <span className="font-medium text-gray-900">{project.progreso || 0}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-medium">
                                        ID: #{project.id_proyecto}
                                    </span>
                                    <button
                                        onClick={() => navigate(`/proyectos/${project.id_proyecto}`)}
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group"
                                    >
                                        Ver Tablero
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FolderGit2 className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No tienes proyectos activos</h3>
                        <p className="text-gray-500">
                            {user?.id_rol === 2
                                ? 'Postúlate a una iniciativa para comenzar un proyecto.'
                                : 'Cuando se aprueben postulaciones, aparecerán aquí.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
