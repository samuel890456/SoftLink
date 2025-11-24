import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import CoordinatorDashboard from './CoordinatorDashboard';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Bienvenido, {user?.nombre}!</h2>
                            <p className="text-gray-600">
                                Rol: <span className="font-medium text-blue-600">{user?.role?.nombre}</span>
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                            <LogOut className="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Role Specific Content */}
                {user?.id_rol === 1 ? (
                    <CoordinatorDashboard />
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-xl font-bold mb-4">Panel de Control</h3>
                        <p className="text-gray-600 mb-4">
                            Bienvenido al panel de control de SoftLink. Aquí podrás gestionar tus actividades.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h4 className="font-semibold text-blue-800 mb-2">Próximamente</h4>
                            <ul className="text-blue-700 space-y-1">
                                <li>• Gestión de Iniciativas</li>
                                <li>• Proyectos y Seguimiento</li>
                                <li>• Evaluaciones y Comentarios</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
