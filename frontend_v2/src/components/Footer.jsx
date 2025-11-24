import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white py-16 px-4">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-2xl">
                                <GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold">SoftLink</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Plataforma institucional para conectar talento con proyectos tecnológicos reales.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            {['Inicio', 'Iniciativas', 'Proyectos', 'Estudiantes'].map((link) => (
                                <li key={link}>
                                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Información</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>Campus Principal</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+57 300 123 4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>contacto@softlink.edu</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Facebook, color: 'hover:text-blue-400' },
                                { Icon: Twitter, color: 'hover:text-cyan-400' },
                                { Icon: Instagram, color: 'hover:text-pink-400' },
                                { Icon: Linkedin, color: 'hover:text-blue-500' }
                            ].map(({ Icon, color }, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -4 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-3 bg-gray-800 rounded-2xl ${color} transition-all`}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 SoftLink. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
