import React, { useState } from 'react'; // Ensure useState is imported
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import contactService from '../services/contactService'; // Import contactService
import { Send, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Clock } from 'lucide-react';

function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setSubmitError(null);

    try {
      await contactService.sendMessage(formData);
      setSubmitMessage('¡Mensaje enviado con éxito! Te responderemos pronto.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("Error sending message:", err);
      setSubmitError(err.response?.data?.detail || 'Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      content: 'Universidad Tecnológica\nCampus Principal\nCiudad, País'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+57 (300) 123-4567'
    },
    {
      icon: Mail,
      title: 'Correo',
      content: 'contacto@softlink.edu.co'
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun - Vie: 8:00 AM - 6:00 PM\nSáb: 9:00 AM - 1:00 PM'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600', label: 'Facebook' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400', label: 'Twitter' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600', label: 'Instagram' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700', label: 'LinkedIn' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-3xl inline-block mb-6">
          <Mail className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-darkGray mb-4">
          Contáctanos
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-gradient-to-br from-white to-lightGray">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-primary to-indigo-700 p-3 rounded-2xl">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-darkGray">
                Envíanos un Mensaje
              </h2>
            </div>

            {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-2xl text-sm"
                role="alert"
              >
                {submitMessage}
              </motion.div>
            )}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm"
                role="alert"
              >
                {submitError}
              </motion.div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-darkGray mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 outline-none"
                placeholder="Tu Nombre"
                required
              />
            </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-darkGray mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 outline-none"
                  placeholder="tu@ejemplo.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-darkGray mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 outline-none resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-gradient-to-br from-white to-lightGray">
            <h2 className="text-2xl font-poppins font-bold text-darkGray mb-6">
              Información de Contacto
            </h2>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-lightGray hover:shadow-soft transition-all-300"
                >
                  <div className="bg-gradient-to-br from-primary to-indigo-700 p-3 rounded-2xl">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-darkGray mb-1">{info.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-darkGray mb-4">Síguenos en Redes Sociales</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-lightGray rounded-2xl text-gray-600 ${social.color} transition-all-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Contacto;
