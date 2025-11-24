import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-blue-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Contáctanos
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        ¿Tienes preguntas sobre SoftLink? Estamos aquí para ayudarte a conectar con el mejor talento o encontrar tu próximo proyecto.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                            <p className="text-gray-600 mb-8">
                                Puedes visitarnos en nuestras oficinas, llamarnos o enviarnos un correo electrónico. Responderemos lo antes posible.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Nuestra Oficina</h3>
                                    <p className="text-gray-600">Calle Universitaria 123<br />Ciudad Tecnológica, CP 12345</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600">contacto@softlink.edu</p>
                                    <p className="text-gray-600">soporte@softlink.edu</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Teléfono</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                    <p className="text-gray-600">Lunes - Viernes, 9am - 6pm</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
                    >
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                                <p className="text-gray-600">
                                    Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-blue-600 font-medium hover:underline"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.asunto}
                                        onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                                        placeholder="¿En qué podemos ayudarte?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={formData.mensaje}
                                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white resize-none"
                                        placeholder="Escribe tu mensaje aquí..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 font-bold flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Enviar Mensaje
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
