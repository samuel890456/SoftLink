import { Link } from 'react-router-dom';
import { Code2, User, Building } from 'lucide-react';

export default function RegisterChoice() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="text-center mb-12">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                        <Code2 className="w-10 h-10 text-blue-600" />
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            SoftLink
                        </span>
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Únete a SoftLink</h1>
                    <p className="text-xl text-gray-600">Elige el tipo de cuenta que quieres crear</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Estudiante */}
                    <Link to="/register/student">
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition">
                                <User className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Soy Estudiante</h2>
                            <p className="text-gray-600">
                                Busco participar en proyectos reales y desarrollar mis habilidades profesionales.
                            </p>
                        </div>
                    </Link>

                    {/* Empresa */}
                    <Link to="/register/company">
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition">
                                <Building className="w-8 h-8 text-purple-600 group-hover:text-white transition" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Soy Empresa</h2>
                            <p className="text-gray-600">
                                Quiero proponer iniciativas y encontrar talento emergente para mis proyectos.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
