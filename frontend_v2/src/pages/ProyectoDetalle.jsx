import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/projectService';
import { ArrowLeft, Calendar, CheckCircle2, Circle, Plus, Flag, Upload, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProyectoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [project, setProject] = useState(null);
    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    const [newMilestone, setNewMilestone] = useState({ titulo: '', descripcion: '', fecha_entrega: '' });
    const [newDelivery, setNewDelivery] = useState({ archivo_url: '', comentario: '' });

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [projectData, milestonesData] = await Promise.all([
                projectService.getById(id),
                projectService.getMilestones(id)
            ]);
            setProject(projectData);
            setMilestones(milestonesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMilestone = async (e) => {
        e.preventDefault();
        try {
            await projectService.createMilestone(id, {
                ...newMilestone,
                id_proyecto: parseInt(id)
            });
            setIsModalOpen(false);
            setNewMilestone({ titulo: '', descripcion: '', fecha_entrega: '' });
            loadData();
        } catch (error) {
            console.error('Error creating milestone:', error);
            alert('Error al crear el hito');
        }
    };

    const handleSubmitDelivery = async (e) => {
        e.preventDefault();
        try {
            await projectService.submitDelivery(id, selectedMilestone.id_hito, {
                ...newDelivery,
                id_hito: selectedMilestone.id_hito
            });
            setIsDeliveryModalOpen(false);
            setNewDelivery({ archivo_url: '', comentario: '' });
            alert('Entrega enviada con éxito');
            loadData();
        } catch (error) {
            console.error('Error submitting delivery:', error);
            alert('Error al enviar la entrega');
        }
    };

    const openDeliveryModal = (milestone) => {
        setSelectedMilestone(milestone);
        setIsDeliveryModalOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!project) return <div>Proyecto no encontrado</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/proyectos')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Proyectos
                </button>

                {/* Project Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.titulo}</h1>
                            <p className="text-gray-600 mb-4">{project.descripcion}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Inicio: {new Date(project.fecha_inicio).toLocaleDateString()}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.estado === 'activo' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {project.estado.charAt(0).toUpperCase() + project.estado.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Progreso General</div>
                            <div className="text-3xl font-bold text-blue-600">{project.progreso || 0}%</div>
                        </div>
                    </div>
                </div>

                {/* Milestones Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Flag className="w-5 h-5 text-blue-600" />
                        Hitos y Entregas
                    </h2>
                    {user?.id_rol === 1 && ( // Only Coordinator can add milestones
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-600/20"
                        >
                            <Plus className="w-4 h-4" />
                            Nuevo Hito
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {milestones.map((milestone) => (
                        <motion.div
                            key={milestone.id_hito}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4"
                        >
                            <div className={`mt-1 ${milestone.estado === 'completado' ? 'text-green-500' : 'text-gray-300'}`}>
                                {milestone.estado === 'completado' ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{milestone.titulo}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{milestone.descripcion}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                            Entrega: {milestone.fecha_entrega ? new Date(milestone.fecha_entrega).toLocaleDateString() : 'Sin fecha'}
                                        </span>
                                        {user?.id_rol === 2 && milestone.estado !== 'completado' && (
                                            <button
                                                onClick={() => openDeliveryModal(milestone)}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Entregar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {milestones.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200 text-gray-500">
                            No hay hitos definidos para este proyecto.
                        </div>
                    )}
                </div>
            </div>

            {/* Create Milestone Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                    >
                        <h3 className="text-xl font-bold mb-4">Nuevo Hito</h3>
                        <form onSubmit={handleCreateMilestone} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    required
                                    value={newMilestone.titulo}
                                    onChange={(e) => setNewMilestone({ ...newMilestone, titulo: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    required
                                    value={newMilestone.descripcion}
                                    onChange={(e) => setNewMilestone({ ...newMilestone, descripcion: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Entrega</label>
                                <input
                                    type="date"
                                    required
                                    value={newMilestone.fecha_entrega}
                                    onChange={(e) => setNewMilestone({ ...newMilestone, fecha_entrega: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Crear Hito
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Submit Delivery Modal */}
            {isDeliveryModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                    >
                        <h3 className="text-xl font-bold mb-4">Entregar Evidencia</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Hito: <span className="font-medium text-gray-900">{selectedMilestone?.titulo}</span>
                        </p>
                        <form onSubmit={handleSubmitDelivery} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Enlace al Archivo / Repositorio</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://github.com/..."
                                        value={newDelivery.archivo_url}
                                        onChange={(e) => setNewDelivery({ ...newDelivery, archivo_url: e.target.value })}
                                        className="w-full pl-10 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios Adicionales</label>
                                <textarea
                                    value={newDelivery.comentario}
                                    onChange={(e) => setNewDelivery({ ...newDelivery, comentario: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Detalles sobre la entrega..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsDeliveryModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Enviar Entrega
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
