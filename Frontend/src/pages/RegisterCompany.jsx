import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

// Validation schema without the username
const schema = yup.object().shape({
  email: yup.string().email('Debe ser un email válido').required('El email es requerido'),
  nombre: yup.string().required('El nombre de la empresa es requerido'),
  password: yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
});

function RegisterCompany() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    try {
      const userData = {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        id_rol: 3 // Hardcode the id_rol to 3 for companies
      };
      await authRegister(userData);
      setSuccess('Registro exitoso. Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      // The error thrown from AuthContext will be caught here
      setError(err.message);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const inputClasses = "w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Briefcase className="text-purple-600" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Registro de Empresa</h2>
        <p className="text-center text-gray-500 mb-8">Publica tus iniciativas y encuentra talento.</p>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error:</strong> {error}
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Éxito:</strong> {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nombre de la Empresa */}
          <div>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Nombre de la empresa" {...register('nombre')} className={inputClasses} />
            </div>
            {errors.nombre && <p className={errorClasses}>{errors.nombre.message}</p>}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="email" placeholder="Email de contacto" {...register('email')} className={inputClasses} />
            </div>
            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" {...register('password')} className={inputClasses} />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmar contraseña" {...register('confirmPassword')} className={inputClasses} />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword.message}</p>}
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold text-lg flex items-center justify-center transition duration-200 ease-in-out hover:bg-purple-700">
            Crear Cuenta de Empresa <ArrowRight className="ml-2" size={20} />
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Eres un estudiante?{' '}
          <Link to="/register/student" className="text-purple-600 hover:underline font-medium">
            Regístrate aquí
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterCompany;
