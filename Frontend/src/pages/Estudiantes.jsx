import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Avatar from '../components/Avatar';
import estudiantesService from '../services/estudiantesService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GraduationCap, Plus, Filter, Mail, Code, Github, ExternalLink } from 'lucide-react';

const studentRegisterSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido'),
  email: yup.string().email('Debe ser un email válido').required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  technologies: yup.string().optional(),
  github: yup.string().url('Debe ser una URL válida').optional(),
  photo: yup.mixed().optional(), // For file input
});

function Estudiantes() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTechnology, setFilterTechnology] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // Define how many students per page

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(studentRegisterSchema),
  });

  const fetchEstudiantes = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };
      if (filterTechnology !== 'all') params.technologies = filterTechnology;
      const response = await estudiantesService.getEstudiantes(params);
      setStudents(response.data.data || []); // Assuming response.data contains { data: [], meta: {} }
      setTotalPages(Math.ceil(response.data.meta.total / itemsPerPage));
    } catch (err) {
      setError('Error al cargar los estudiantes.');
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, [filterTechnology, currentPage]);

  const onSubmitRegister = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('id_rol', 2); // Default to student role
      if (data.technologies) {
        formData.append('tecnologias', data.technologies); // Assuming backend expects 'tecnologias'
      }
      if (data.github) {
        formData.append('github', data.github);
      }
      if (data.photo && data.photo.length > 0) {
        formData.append('foto', data.photo[0]); // Assuming single photo upload
      }

      await estudiantesService.createEstudiante(formData); // Send FormData
      alert('Estudiante registrado con éxito!');
      setShowRegisterForm(false);
      reset();
      fetchEstudiantes();
    } catch (err) {
      setError('Error al registrar el estudiante.');
      console.error("Error creating student:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Cargando estudiantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-accent to-green-600 p-4 rounded-3xl">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-darkGray mb-4">
          Directorio de Estudiantes
        </h1>
        <p className="text-xl text-gray-600">
          Conecta con el talento de nuestra comunidad
        </p>
      </motion.div>

      {/* Register Button */}
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setShowRegisterForm(!showRegisterForm)}
          variant={showRegisterForm ? 'secondary' : 'primary'}
          aria-label={showRegisterForm ? 'Cancelar registro' : 'Registrar nuevo estudiante'}
        >
          {showRegisterForm ? (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Cancelar
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Estudiante
            </>
          )}
        </Button>
      </div>

      {/* Register Form */}
      {showRegisterForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-white to-lightGray">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-accent to-green-600 p-3 rounded-2xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-darkGray">
                Nuevo Estudiante
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-4">
              <FormInput
                label="Nombre Completo"
                name="nombre"
                type="text"
                placeholder="Ej: Ana García"
                register={register}
                error={errors.nombre}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Ej: ana.garcia@ejemplo.com"
                register={register}
                error={errors.email}
              />
              <FormInput
                label="Contraseña"
                name="password"
                type="password"
                placeholder="Contraseña"
                register={register}
                error={errors.password}
              />
              <FormInput
                label="Tecnologías (separadas por coma)"
                name="technologies"
                type="text"
                placeholder="Ej: React, Node.js, Python"
                register={register}
                error={errors.technologies}
              />
              <FormInput
                label="Enlace a GitHub/Portafolio"
                name="github"
                type="url"
                placeholder="Ej: https://github.com/tuusuario"
                register={register}
                error={errors.github}
              />
              <FormInput
                label="Foto de Perfil"
                name="photo"
                type="file"
                register={register}
                error={errors.photo}
              />
              <div className="flex items-center justify-between mt-6">
                <Button type="submit" variant="success" size="lg">
                  Registrar Estudiante
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <Card className="mb-8 bg-lightGray">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-darkGray">Filtrar por Tecnología</h3>
          </div>
          <select
            value={filterTechnology}
            onChange={(e) => setFilterTechnology(e.target.value)}
            className="shadow appearance-none border-2 border-gray-200 rounded-2xl py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 bg-white"
          >
            <option value="all">Todas</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="Django">Django</option>
            <option value="Vue.js">Vue.js</option>
            <option value="Firebase">Firebase</option>
          </select>
        </div>
      </Card>

      {/* Students Grid */}
      {students.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {students.map((student, index) => (
            <motion.div key={student.id_usuario} variants={itemVariants}>
              <Card className="hover:shadow-glow transition-all-300 h-full flex flex-col">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar src={student.foto} alt={student.nombre} initials={student.nombre} size="lg" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-darkGray mb-1">{student.nombre}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-1" />
                      <span className="truncate">{student.email}</span>
                    </div>
                  </div>
                </div>

                {student.tecnologias && (
                  <div className="flex items-start space-x-2 mb-4">
                    <Code className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {student.tecnologias.split(', ').slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link to={`/estudiantes/${student.id_usuario}`} className="mt-auto">
                  <Button variant="primary" className="w-full" aria-label={`Ver perfil de ${student.nombre}`}>
                    Ver Perfil
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No hay estudiantes disponibles</p>
        </motion.div>
      )}
    </div>
  );
}

export default Estudiantes;
