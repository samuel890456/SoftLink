import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { initiativeService } from '../services/initiativeService';
import { postulacionService } from '../services/postulacionService';
import { Calendar, User, Briefcase, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function IniciativaDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [initiative, setInitiative] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [existingPostulation, setExistingPostulation] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [initiativeData, myPostulations] = await Promise.all([
                initiativeService.getById(id),
                user?.id_rol === 2 ? postulacionService.getMyPostulations() : Promise.resolve([])
            ]);

            setInitiative(initiativeData);

            if (user?.id_rol === 2) { // Student
                const found = myPostulations.find(p => p.id_iniciativa === parseInt(id));
                setExistingPostulation(found);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostulate = async () => {
        if (!message.trim()) {
            alert('Por favor escribe un mensaje de motivación');
            return;
        }

        setApplying(true);
        try {
            await postulacionService.create({
                id_iniciativa: parseInt(id),
                mensaje: message
            });
            alert('¡Postulación enviada con éxito!');
            loadData(); // Reload to update status
        } catch (error) {
            console.error('Error applying:', error);
            alert('Error al enviar la postulación');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!initiative) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Iniciativa no encontrada</h2>
                <button onClick={() => navigate('/iniciativas')} className="mt-4 text-blue-600 hover:underline">
                    Volver al listado
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/iniciativas')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a Iniciativas
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                {initiative.categoria}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${initiative.estado === 'aprobada' ? 'bg-green-500/20 text-green-100' : 'bg-yellow-500/20 text-yellow-100'
                                }`}>
                                {initiative.estado.charAt(0).toUpperCase() + initiative.estado.slice(1)}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{initiative.nombre}</h1>
                        <div className="flex items-center gap-6 text-blue-100 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(initiative.fecha_creacion).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Proponente #{initiative.id_usuario}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                    Descripción
                                </h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {initiative.descripcion}
                                </p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-blue-600" />
                                    Impacto Esperado
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {initiative.impacto || 'No especificado'}
                                </p>
                            </section>
                        </div>

                        {/* Sidebar / Action Area */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 sticky top-8">
                                <h3 className="font-bold text-gray-900 mb-4">Postulación</h3>

                                {user?.id_rol === 2 ? ( // Student
                                    existingPostulation ? (
                                        <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                                            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                            <p className="text-green-800 font-medium">Ya te has postulado</p>
                                            <p className="text-green-600 text-sm mt-1">
                                                Estado: {existingPostulation.estado}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Mensaje de Motivación
                                                </label>
                                                <textarea
                                                    rows="4"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                                                    placeholder="Cuéntanos por qué quieres participar..."
                                                />
                                            </div>
                                            <button
                                                onClick={handlePostulate}
                                                disabled={applying}
                                                className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-600/20 disabled:opacity-50"
                                            >
                                                {applying ? 'Enviando...' : 'Enviar Postulación'}
                                            </button>
                                        </div>
                                    )
                                ) : (
                                    <div className="text-center text-gray-500 text-sm">
                                        {user ? 'Solo los estudiantes pueden postularse.' : 'Inicia sesión para postularte.'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
