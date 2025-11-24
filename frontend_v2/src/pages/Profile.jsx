import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import api from '../api/axios';
import {
    User, Mail, Phone, Edit2, Save, X, Code, Github,
    Calendar, Briefcase, Globe, MapPin, Shield, Activity,
    Camera, CheckCircle, FileText, Upload, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('info'); // info, security, activity
    const [notification, setNotification] = useState({ type: '', message: '' });

    const fileInputRef = useRef(null);
    const cvInputRef = useRef(null);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        github: '',
        tecnologias: '',
        bio: '',
        sitio_web: '',
        direccion: '',
        identificador_fiscal: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                email: user.email || '',
                telefono: user.telefono || '',
                github: user.github || '',
                tecnologias: user.tecnologias || '',
                bio: user.bio || '',
                sitio_web: user.sitio_web || '',
                direccion: user.direccion || '',
                identificador_fiscal: user.identificador_fiscal || ''
            });
        }
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setNotification({ type: '', message: '' });

        try {
            const updatedUser = await userService.updateProfile(formData);
            updateUser(updatedUser);
            setNotification({ type: 'success', message: 'Perfil actualizado correctamente' });
            setIsEditing(false);
            setTimeout(() => setNotification({ type: '', message: '' }), 3000);
        } catch (err) {
            setNotification({ type: 'error', message: err.response?.data?.detail || 'Error al actualizar' });
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await api.post('/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Update local user state with new photo URL
            updateUser({ ...user, foto: response.data.url });
            setNotification({ type: 'success', message: 'Foto de perfil actualizada' });
        } catch (error) {
            console.error('Error uploading image:', error);
            setNotification({ type: 'error', message: 'Error al subir la imagen' });
        } finally {
            setUploading(false);
        }
    };

    const handleCVUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await api.post('/upload/document', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            updateUser({ ...user, hoja_vida: response.data.url });
            setNotification({ type: 'success', message: 'Hoja de vida actualizada' });
        } catch (error) {
            console.error('Error uploading CV:', error);
            setNotification({ type: 'error', message: 'Error al subir la hoja de vida' });
        } finally {
            setUploading(false);
        }
    };

    if (!user) return null;

    const getRoleBadge = (roleId) => {
        const styles = {
            1: 'bg-purple-100 text-purple-700 border-purple-200', // Coordinador
            2: 'bg-blue-100 text-blue-700 border-blue-200',       // Estudiante
            3: 'bg-emerald-100 text-emerald-700 border-emerald-200', // Empresa
        };
        const labels = { 1: 'Coordinador', 2: 'Estudiante', 3: 'Empresa' };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[roleId] || 'bg-gray-100 text-gray-700'}`}>
                {labels[roleId] || 'Usuario'}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header Cover */}
            <div className="h-60 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white overflow-hidden">
                                    {user.foto ? (
                                        <img src={`http://localhost:8000${user.foto}`} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user.nombre?.charAt(0).toUpperCase()
                                    )}
                                </div>

                                {/* Upload Button for Company/Coordinator */}
                                {(user.id_rol === 1 || user.id_rol === 3) && (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            disabled={uploading}
                                            className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition text-gray-600 group-hover:scale-110"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.nombre}</h1>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                            {getRoleBadge(user.id_rol)}
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" /> {user.email}
                                            </span>
                                            {user.telefono && (
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" /> {user.telefono}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className={`px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 ${isEditing
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                                            }`}
                                    >
                                        {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                        {isEditing ? 'Cancelar' : 'Editar Perfil'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex items-center gap-6 border-b border-gray-100 mb-8 overflow-x-auto">
                            {[
                                { id: 'info', label: 'Información Personal', icon: User },
                                { id: 'activity', label: 'Actividad', icon: Activity },
                                { id: 'security', label: 'Seguridad', icon: Shield },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-4 text-sm font-medium flex items-center gap-2 transition relative whitespace-nowrap ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Notifications */}
                        <AnimatePresence>
                            {notification.message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success'
                                        ? 'bg-green-50 text-green-700 border border-green-100'
                                        : 'bg-red-50 text-red-700 border border-red-100'
                                        }`}
                                >
                                    {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                                    {notification.message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Content Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Form/Info */}
                            <div className="lg:col-span-2">
                                {isEditing ? (
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                                                <input
                                                    type="text"
                                                    value={formData.nombre}
                                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                                                <input
                                                    type="text"
                                                    value={formData.telefono}
                                                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                />
                                            </div>

                                            {user.id_rol === 2 && (
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">GitHub URL</label>
                                                    <input
                                                        type="url"
                                                        value={formData.github}
                                                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                    />
                                                </div>
                                            )}

                                            {user.id_rol === 3 && (
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Sitio Web</label>
                                                    <input
                                                        type="url"
                                                        value={formData.sitio_web}
                                                        onChange={(e) => setFormData({ ...formData, sitio_web: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Biografía</label>
                                            <textarea
                                                rows="4"
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white resize-none"
                                            />
                                        </div>

                                        {user.id_rol === 2 && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Tecnologías (separadas por comas)</label>
                                                <input
                                                    type="text"
                                                    value={formData.tecnologias}
                                                    onChange={(e) => setFormData({ ...formData, tecnologias: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                    placeholder="React, Node.js, Python..."
                                                />
                                            </div>
                                        )}

                                        {user.id_rol === 3 && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Dirección</label>
                                                    <input
                                                        type="text"
                                                        value={formData.direccion}
                                                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700">Identificador Fiscal</label>
                                                    <input
                                                        type="text"
                                                        value={formData.identificador_fiscal}
                                                        onChange={(e) => setFormData({ ...formData, identificador_fiscal: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-end pt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 font-medium disabled:opacity-50 flex items-center gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Guardando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-5 h-5" />
                                                        Guardar Cambios
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-8">
                                        {/* About Section */}
                                        <section>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <User className="w-5 h-5 text-blue-600" />
                                                Sobre mí
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {user.bio || 'No hay biografía disponible.'}
                                            </p>
                                        </section>

                                        {/* Skills/Details Section */}
                                        {user.id_rol === 2 && user.tecnologias && (
                                            <section>
                                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Code className="w-5 h-5 text-blue-600" />
                                                    Habilidades
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.tecnologias.split(',').map((tech, i) => (
                                                        <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                                            {tech.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Company Details */}
                                        {user.id_rol === 3 && (
                                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {user.sitio_web && (
                                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Sitio Web</h4>
                                                        <a href={user.sitio_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                                            <Globe className="w-4 h-4" /> {user.sitio_web}
                                                        </a>
                                                    </div>
                                                )}
                                                {user.direccion && (
                                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Dirección</h4>
                                                        <p className="text-gray-900 flex items-center gap-1">
                                                            <MapPin className="w-4 h-4 text-gray-400" /> {user.direccion}
                                                        </p>
                                                    </div>
                                                )}
                                            </section>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                {/* CV Upload Section for Students */}
                                {user.id_rol === 2 && (
                                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            Hoja de Vida
                                        </h3>
                                        <div className="space-y-4">
                                            {user.hoja_vida ? (
                                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-green-800">CV Subido</span>
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <a
                                                        href={`http://localhost:8000${user.hoja_vida}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-green-700 hover:underline flex items-center gap-1"
                                                    >
                                                        <Eye className="w-4 h-4" /> Ver Documento
                                                    </a>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500">No has subido tu hoja de vida aún.</p>
                                            )}

                                            <input
                                                type="file"
                                                ref={cvInputRef}
                                                className="hidden"
                                                accept="application/pdf"
                                                onChange={handleCVUpload}
                                            />
                                            <button
                                                onClick={() => cvInputRef.current.click()}
                                                disabled={uploading}
                                                className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition text-sm font-medium flex items-center justify-center gap-2"
                                            >
                                                {uploading ? (
                                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Upload className="w-4 h-4" />
                                                )}
                                                {user.hoja_vida ? 'Actualizar CV' : 'Subir CV (PDF)'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-4">Detalles de la Cuenta</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Estado</span>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Activo</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Miembro desde</span>
                                            <span className="text-gray-900 font-medium">
                                                {new Date(user.fecha_registro || Date.now()).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {user.github && (
                                            <div className="pt-4 border-t border-gray-200">
                                                <a
                                                    href={user.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 w-full py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition text-sm font-medium"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    Ver en GitHub
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
