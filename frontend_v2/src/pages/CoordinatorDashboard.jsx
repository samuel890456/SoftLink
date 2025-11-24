import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { initiativeService } from '../services/initiativeService';
import { postulacionService } from '../services/postulacionService';
import { Users, Building2, FileText, CheckCircle, XCircle, ArrowRight, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoordinatorDashboard() {
    const [stats, setStats] = useState(null);
    const [postulations, setPostulations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsData, postulationsData] = await Promise.all([
                dashboardService.getStats(),
                postulacionService.getPending()
            ]);
            setStats(statsData);
            setPostulations(postulationsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveInitiative = async (id) => {
        if (window.confirm('¿Estás seguro de aprobar esta iniciativa?')) {
            try {
                await initiativeService.update(id, { estado: 'aprobada' });
                loadData();
            } catch (error) {
                console.error('Error approving initiative:', error);
                alert('Error al aprobar la iniciativa');
            }
        }
    };

    const handleRejectInitiative = async (id) => {
        if (window.confirm('¿Estás seguro de rechazar esta iniciativa?')) {
            try {
                await initiativeService.update(id, { estado: 'rechazada' });
                loadData();
            } catch (error) {
                console.error('Error rejecting initiative:', error);
                alert('Error al rechazar la iniciativa');
            }
        }
    };

    const handleApprovePostulation = async (id) => {
        if (window.confirm('¿Aprobar esta postulación? Esto asignará al estudiante al proyecto.')) {
            try {
                await postulacionService.updateStatus(id, 'aceptada');
                loadData();
            } catch (error) {
                console.error('Error approving postulation:', error);
                alert('Error al aprobar la postulación');
            }
        }
    };

    const handleRejectPostulation = async (id) => {
        if (window.confirm('¿Rechazar esta postulación?')) {
            try {
                await postulacionService.updateStatus(id, 'rechazada');
                loadData();
            } catch (error) {
                console.error('Error rejecting postulation:', error);
                alert('Error al rechazar la postulación');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Estudiantes Registrados</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats?.total_students || 0}</h3>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Empresas Registradas</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats?.total_companies || 0}</h3>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Iniciativas Pendientes</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats?.pending_initiatives_count || 0}</h3>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Pending Initiatives Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            Iniciativas Pendientes
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Iniciativa</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats?.pending_initiatives?.length > 0 ? (
                                    stats.pending_initiatives.map((initiative) => (
                                        <tr key={initiative.id_iniciativa} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{initiative.nombre}</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {new Date(initiative.fecha_creacion).toLocaleDateString()} • {initiative.categoria}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleApproveInitiative(initiative.id_iniciativa)}
                                                        className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                        title="Aprobar"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectInitiative(initiative.id_iniciativa)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Rechazar"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                                            No hay iniciativas pendientes.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pending Postulations Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-purple-600" />
                            Postulaciones Pendientes
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante / Iniciativa</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {postulations.length > 0 ? (
                                    postulations.map((postulation) => (
                                        <tr key={postulation.id_postulacion} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{postulation.estudiante?.nombre}</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Postula a: <span className="font-medium text-blue-600">{postulation.iniciativa?.nombre}</span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1 italic">
                                                    "{postulation.mensaje}"
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleApprovePostulation(postulation.id_postulacion)}
                                                        className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                        title="Aceptar Postulación"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectPostulation(postulation.id_postulacion)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Rechazar Postulación"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                                            No hay postulaciones pendientes.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
