import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Menu, X, GraduationCap, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { to: '/iniciativas', label: 'Iniciativas' },
        { to: '/estudiantes', label: 'Estudiantes' },
        { to: '/proyectos', label: 'Proyectos' },
        { to: '/contacto', label: 'Contacto' },
    ];

    return (
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-2xl shadow-lg"
                        >
                            <GraduationCap className="w-8 h-8 text-white" />
                        </motion.div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                            SoftLink
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-all rounded-xl hover:bg-blue-50"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 focus:outline-none">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
                                        {user.nombre?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left hidden xl:block">
                                        <p className="text-sm font-semibold text-gray-700">{user.nombre}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role?.nombre || 'Usuario'}</p>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                                    </div>

                                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                        Dashboard
                                    </Link>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                        Mi Perfil
                                    </Link>

                                    <div className="border-t border-gray-50 mt-2 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/register">
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-md hover:shadow-lg">
                                        Registro
                                    </button>
                                </Link>
                                <Link to="/login">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg">
                                        Iniciar Sesión
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden py-4 space-y-2"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2 border-t-2 border-gray-100">
                            {user ? (
                                <>
                                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
                                            Perfil
                                        </button>
                                    </Link>
                                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                                            Dashboard
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Cerrar Sesión</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                                            Registro
                                        </button>
                                    </Link>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                                            Iniciar Sesión
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
