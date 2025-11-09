import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const loginResponse = await login(email, password);
    if (loginResponse) {
      // Redirigir según el rol
      switch (loginResponse.id_rol) {
        case 1: // Coordinador
          navigate('/panel');
          break;
        case 2: // Estudiante
          navigate('/proyectos'); // O una ruta específica para estudiantes
          break;
        case 3: // Empresa
          navigate('/iniciativas'); // O una ruta específica para empresas
          break;
        default:
          navigate('/'); // Redirección por defecto
          break;
      }
    } else {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-lightGray via-white to-lightGray px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft border border-gray-100">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-3xl shadow-glow">
                <LogIn className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-poppins font-bold text-darkGray mb-2">
              Bienvenido de vuelta
            </h2>
            <p className="text-gray-600">
              Inicia sesión para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-darkGray mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 outline-none"
                  placeholder="••••••••"
                  required
                  aria-required="true"
                  aria-label="Contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-darkGray transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-indigo-700 transition-colors focus:outline-none focus:underline"
                aria-label="Recuperar contraseña"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 hover:shadow-glow transition-all-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary/30"
              aria-label="Iniciar sesión"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Iniciando sesión...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Iniciar sesión
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              )}
            </motion.button>

            {/* Register Link */}
            <p className="text-center text-gray-600 text-sm">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/register" 
                className="text-primary font-semibold hover:text-indigo-700 transition-colors focus:outline-none focus:underline"
                aria-label="Ir a registro"
              >
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Al continuar, aceptas nuestros términos y condiciones
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
