import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Lock } from 'lucide-react';
import authService from '../services/authService'; // Assuming authService will have a forgotPassword method

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      // Assuming authService has a forgotPassword method
      await authService.forgotPassword(email);
      setMessage('Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.');
      // Optionally, navigate to a success page or back to login after a delay
      // setTimeout(() => navigate('/login'), 5000);
    } catch (err) {
      console.error("Forgot password failed:", err);
      setError(err.response?.data?.detail || 'Error al procesar la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lightGray via-white to-lightGray px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-3xl shadow-glow">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-poppins font-bold text-darkGray mb-2">
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-gray-600">
              Ingresa tu correo electrónico para restablecerla.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message/Error */}
            {message && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-2xl text-sm"
                role="alert"
              >
                {message}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm"
                role="alert"
              >
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-darkGray mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 outline-none"
                  placeholder="tu@ejemplo.com"
                  required
                  aria-required="true"
                  aria-label="Correo electrónico"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 hover:shadow-glow transition-all-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary/30"
              aria-label="Restablecer contraseña"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Restablecer contraseña
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              )}
            </motion.button>

            {/* Back to Login */}
            <p className="text-center text-gray-600 text-sm">
              <Link 
                to="/login" 
                className="text-primary font-semibold hover:text-indigo-700 transition-colors focus:outline-none focus:underline"
                aria-label="Volver a iniciar sesión"
              >
                Volver a Iniciar Sesión
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
