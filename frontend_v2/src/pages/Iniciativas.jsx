import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { initiativeService } from '../services/initiativeService';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, User, ArrowRight, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Iniciativas() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [initiatives, setInitiatives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('todas'); // todas, mis_iniciativas
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newInitiative, setNewInitiative] = useState({
        nombre: '',
        descripcion: '',
        categoria: '',
        impacto: ''
    });

    useEffect(() => {
        loadInitiatives();
    }, []);

    const loadInitiatives = async () => {
        try {
            const data = await initiativeService.getAll();
            setInitiatives(data);
        } catch (error) {
            console.error('Error loading initiatives:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await initiativeService.create(newInitiative);
            setIsModalOpen(false);
            setNewInitiative({ nombre: '', descripcion: '', categoria: '', impacto: '' });
            loadInitiatives();
        } catch (error) {
            console.error('Error creating initiative:', error);
            alert('Error al crear la iniciativa');
        }
    };

    const filteredInitiatives = initiatives.filter(initiative => {
        const matchesSearch = initiative.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            initiative.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === 'mis_iniciativas' && user) {
            return matchesSearch && initiative.id_usuario === user.id_usuario;
        }
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Iniciativas</h1>
                        <p className="text-gray-600 mt-1">Explora y participa en proyectos innovadores</p>
                    </div>

                    {user && user.id_rol === 3 && ( // Solo empresas pueden crear
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center gap-2 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Nueva Iniciativa
                        </button>
                    )}
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar iniciativas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {user && (
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400 w-5 h-5" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option value="todas">Todas las iniciativas</option>
                                <option value="mis_iniciativas">Mis iniciativas</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredInitiatives.map((initiative) => (
                                <motion.div
                                    key={initiative.id_iniciativa}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                                                {initiative.categoria || 'General'}
                                            </span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${initiative.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                                                initiative.estado === 'aprobada' ? 'bg-green-100 text-green-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {initiative.estado}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                            {initiative.nombre}
                                        </h3>

                                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                            {initiative.descripcion}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(initiative.fecha_creacion).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                                {initiative.id_usuario}
                                            </div>
                                            <span>Proponente</span>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/iniciativas/${initiative.id_iniciativa}`)}
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group"
                                        >
                                            Ver Detalles
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && filteredInitiatives.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron iniciativas</h3>
                        <p className="text-gray-500 mt-1">Intenta ajustar tu búsqueda o filtros</p>
                    </div>
                )}

                {/* Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Nueva Iniciativa</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <Plus className="w-6 h-6 rotate-45" />
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                    <input
                                        type="text"
                                        required
                                        value={newInitiative.nombre}
                                        onChange={(e) => setNewInitiative({ ...newInitiative, nombre: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Ej: Desarrollo de App Móvil"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <select
                                        value={newInitiative.categoria}
                                        onChange={(e) => setNewInitiative({ ...newInitiative, categoria: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        <option value="Desarrollo Web">Desarrollo Web</option>
                                        <option value="Móvil">Móvil</option>
                                        <option value="IA/ML">IA/ML</option>
                                        <option value="Ciberseguridad">Ciberseguridad</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        required
                                        rows="3"
                                        value={newInitiative.descripcion}
                                        onChange={(e) => setNewInitiative({ ...newInitiative, descripcion: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="Describe brevemente la iniciativa..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Impacto Esperado</label>
                                    <textarea
                                        rows="2"
                                        value={newInitiative.impacto}
                                        onChange={(e) => setNewInitiative({ ...newInitiative, impacto: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="¿Qué impacto tendrá este proyecto?"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-600/20"
                                    >
                                        Crear Iniciativa
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
