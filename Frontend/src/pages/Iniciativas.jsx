import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import iniciativasService from '../services/iniciativasService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Plus, Filter, Search, Lightbulb, Calendar, Users, TrendingUp, FileText } from 'lucide-react';

const initiativeSchema = yup.object().shape({
  name: yup.string().required('El nombre de la iniciativa es requerido'),
  description: yup.string().required('La descripción es requerida'),
  category: yup.string().required('La categoría es requerida'),
  impact: yup.string().required('El impacto esperado es requerido'),
});

function Iniciativas() {
  const [showForm, setShowForm] = useState(false);
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // Definir cuántas iniciativas por página

  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(initiativeSchema),
  });

  const fetchIniciativas = async () => {
    setLoading(true);
    try {
      const params = {
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      };
      const response = await iniciativasService.getIniciativas(params);
      // La API devuelve directamente un array
      const initiativesData = Array.isArray(response) ? response : (response?.data || []);
      
      // Filtrar por categoría y estado si es necesario (ya que la API no lo hace)
      let filteredInitiatives = initiativesData;
      if (filterCategory !== 'all') {
        filteredInitiatives = filteredInitiatives.filter(init => init.categoria === filterCategory);
      }
      if (filterStatus !== 'all') {
        filteredInitiatives = filteredInitiatives.filter(init => init.estado === filterStatus);
      }
      
      setInitiatives(filteredInitiatives);
      setTotalPages(Math.ceil(filteredInitiatives.length / itemsPerPage) || 1);
    } catch (err) {
      setError('Error al cargar las iniciativas.');
      console.error("Error fetching initiatives:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIniciativas();
  }, [filterCategory, filterStatus, currentPage]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.name);
      formData.append('descripcion', data.description);
      formData.append('categoria', data.category);
      formData.append('impacto', data.impact);

      if (data.documents && data.documents.length > 0) {
        for (let i = 0; i < data.documents.length; i++) {
          formData.append('documents', data.documents[i]);
        }
      }

      await iniciativasService.createIniciativa(formData); // Send FormData
      alert('Iniciativa registrada con éxito!');
      setShowForm(false);
      reset();
      fetchIniciativas();
    } catch (err) {
      setError('Error al registrar la iniciativa.');
      console.error("Error creating initiative:", err);
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
          <p className="text-gray-600">Cargando iniciativas...</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-darkGray mb-4 text-center">
          Gestión de Iniciativas
        </h1>
        <p className="text-center text-gray-600 text-lg">
          Descubre y crea iniciativas que generan impacto
        </p>
      </motion.div>

      {/* Create Initiative Button */}
      <div className="mb-6 flex justify-end">
        {!user ? (
          <Button
            onClick={() => navigate('/register')}
            aria-label="Registrarse para crear una iniciativa"
          >
            <Plus className="w-5 h-5 mr-2" />
            Registrarse para Crear
          </Button>
        ) : (
          <Button
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? 'danger' : 'primary'}
            aria-label={showForm ? "Cancelar creación" : "Crear nueva iniciativa"}
          >
            {showForm ? (
              'Cancelar'
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Nueva Iniciativa
              </>
            )}
          </Button>
        )}
      </div>

      {/* Create Initiative Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-white to-lightGray">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary p-3 rounded-2xl">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-darkGray">
                Nueva Iniciativa
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Nombre de la Iniciativa"
                name="name"
                type="text"
                placeholder="Ej: App de Gestión de Residuos"
                register={register}
                error={errors.name}
              />
              <FormInput
                label="Descripción Detallada"
                name="description"
                type="textarea"
                placeholder="Describe la problemática y la solución propuesta..."
                register={register}
                error={errors.description}
              />
              <FormInput
                label="Categoría"
                name="category"
                type="select"
                register={register}
                error={errors.category}
              >
                <option value="">Selecciona una categoría</option>
                <option value="social">Social</option>
                <option value="empresarial">Empresarial</option>
                <option value="educativo">Educativo</option>
                <option value="otro">Otro</option>
              </FormInput>
              <FormInput
                label="Impacto Esperado"
                name="impact"
                type="textarea"
                placeholder="Ej: Mejora la calidad de vida de X personas"
                register={register}
                error={errors.impact}
              />
              <FormInput
                label="Documentos Opcionales"
                name="documents"
                type="file"
                register={register}
                error={errors.documents}
                multiple // Allow multiple files
              />
              <div className="flex items-center justify-between mt-6">
                <Button type="submit" variant="success" size="lg">
                  Registrar Iniciativa
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
            <h3 className="text-lg font-semibold text-darkGray">Filtros</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="filterCategory" className="block text-sm font-semibold text-darkGray mb-2">
                Categoría
              </label>
              <select
                id="filterCategory"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="shadow appearance-none border-2 border-gray-200 rounded-2xl py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 bg-white"
              >
                <option value="all">Todas</option>
                <option value="social">Social</option>
                <option value="empresarial">Empresarial</option>
                <option value="educativo">Educativo</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label htmlFor="filterStatus" className="block text-sm font-semibold text-darkGray mb-2">
                Estado
              </label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="shadow appearance-none border-2 border-gray-200 rounded-2xl py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all-300 bg-white"
              >
                <option value="all">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="en desarrollo">En Desarrollo</option>
                <option value="completada">Completada</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.length > 0 ? (
          initiatives.filter(Boolean).map((initiative, index) => (
            <motion.div
              key={initiative.id_iniciativa}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-glow transition-all-300 group cursor-pointer h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-primary to-indigo-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    initiative.estado === 'completada' ? 'bg-green-100 text-accent' :
                    initiative.estado === 'en desarrollo' ? 'bg-blue-100 text-primary' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {initiative.estado || 'pendiente'}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-darkGray mb-3 group-hover:text-primary transition-colors">
                  {initiative.nombre}
                </h3>

                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                  {initiative.descripcion}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span className="capitalize">{initiative.categoria || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>{initiative.impacto || 'N/A'}</span>
                  </div>
                </div>

                <Link to={`/iniciativas/${initiative.id_iniciativa}`}>
                  <Button variant="primary" className="w-full group-hover:shadow-glow">
                    Ver Detalles
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No hay iniciativas disponibles</p>
            <p className="text-gray-500 text-sm">Intenta con otros filtros o crea una nueva iniciativa</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Iniciativas;
