import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lock, User, Eye, EyeOff, ArrowRight, Phone, Globe, MapPin, FileText, Camera, Building2 } from 'lucide-react';
import FormInput from '../components/FormInput';

const schema = yup.object().shape({
  email: yup.string().email('Debe ser un email válido').required('El email es requerido'),
  nombre: yup.string().required('El nombre de la empresa es requerido'),
  password: yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
  telefono: yup.string().optional(),
  bio: yup.string().optional(),
  sitio_web: yup.string().url('Debe ser una URL válida').optional(),
  direccion: yup.string().optional(),
  identificador_fiscal: yup.string().optional(),
  foto: yup.mixed().optional(),
});

function RegisterCompany() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const photoFile = watch('foto');

  React.useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [photoFile]);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    try {
      const userData = {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        id_rol: 3, // Hardcode the id_rol to 3 for companies
        telefono: data.telefono || null,
        bio: data.bio || null,
        sitio_web: data.sitio_web || null,
        direccion: data.direccion || null,
        identificador_fiscal: data.identificador_fiscal || null,
      };

      // Si hay una foto, se debe enviar como FormData
      if (data.foto && data.foto.length > 0) {
        const formData = new FormData();
        for (const key in userData) {
          if (userData[key] !== null) {
            formData.append(key, userData[key]);
          }
        }
        formData.append('foto', data.foto[0]);
        await authRegister(formData);
      } else {
        await authRegister(userData);
      }

      setSuccess('Registro exitoso. Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error en el registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Logo de la empresa */}
          <div className="flex flex-col items-center mb-4">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover mb-2 border-4 border-purple-500" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <label className="cursor-pointer bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
              <Camera className="w-4 h-4 inline mr-2" />
              Subir Logo
              <input type="file" accept="image/*" {...register('foto')} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nombre de la empresa"
              name="nombre"
              type="text"
              register={register}
              error={errors.nombre}
              placeholder="Mi Empresa S.A.S"
              icon={<Briefcase className="w-5 h-5 text-gray-400" />}
            />
            <FormInput
              label="Email de contacto"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              placeholder="contacto@empresa.com"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FormInput
                label="Contraseña"
                name="password"
                type={showPassword ? 'text' : 'password'}
                register={register}
                error={errors.password}
                placeholder="Mínimo 6 caracteres"
                icon={<Lock className="w-5 h-5 text-gray-400" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 z-10"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="relative">
              <FormInput
                label="Confirmar contraseña"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                register={register}
                error={errors.confirmPassword}
                placeholder="Confirma tu contraseña"
                icon={<Lock className="w-5 h-5 text-gray-400" />}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 z-10"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <FormInput
            label="Teléfono de contacto (opcional)"
            name="telefono"
            type="text"
            register={register}
            error={errors.telefono}
            placeholder="+57 300 123 4567"
            icon={<Phone className="w-5 h-5 text-gray-400" />}
          />

          <FormInput
            label="Descripción de la empresa (opcional)"
            name="bio"
            type="textarea"
            register={register}
            error={errors.bio}
            placeholder="Cuéntanos sobre tu empresa, sus objetivos y áreas de trabajo..."
            icon={<FileText className="w-5 h-5 text-gray-400" />}
          />

          <FormInput
            label="Sitio web (opcional)"
            name="sitio_web"
            type="url"
            register={register}
            error={errors.sitio_web}
            placeholder="https://www.empresa.com"
            icon={<Globe className="w-5 h-5 text-gray-400" />}
          />

          <FormInput
            label="Dirección (opcional)"
            name="direccion"
            type="text"
            register={register}
            error={errors.direccion}
            placeholder="Calle 123 #45-67, Ciudad"
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
          />

          <FormInput
            label="Identificador Fiscal - NIT (opcional)"
            name="identificador_fiscal"
            type="text"
            register={register}
            error={errors.identificador_fiscal}
            placeholder="900123456-7"
            icon={<Building2 className="w-5 h-5 text-gray-400" />}
          />

          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            type="submit" 
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold text-lg flex items-center justify-center transition duration-200 ease-in-out hover:bg-purple-700"
          >
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
