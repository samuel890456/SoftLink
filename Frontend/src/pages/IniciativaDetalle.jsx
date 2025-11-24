import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import iniciativasService from '../services/iniciativasService';
import postulacionesService from '../services/postulacionesService';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { Lightbulb, Calendar, Users, TrendingUp, FileText, ArrowLeft, CheckCircle, Award, AlertCircle } from 'lucide-react';

function IniciativaDetalle() {
  const { id } = useParams();
  const { user } = useAuth();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [postulation, setPostulation] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState(null);
  const [applySuccess, setApplySuccess] = useState(null);

  useEffect(() => {
    const fetchInitiativeAndPostulation = async () => {
      try {
        setLoading(true);
        const response = await iniciativasService.getIniciativaById(id);
        setInitiative(response);

        if (user && user.id_rol === 2) { // Estudiante
          try {
            const myPostulations = await postulacionesService.getPostulaciones();
            const existing = myPostulations.find(p => p.id_iniciativa === parseInt(id));
            setPostulation(existing);
          } catch (err) {
            console.error("Error checking postulations", err);
          }
        }
      } catch (err) {
        console.error("Error fetching initiative details:", err);
        setError("Error al cargar los detalles de la iniciativa.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitiativeAndPostulation();
  }, [id, user]);

  const handlePostular = async () => {
    if (!user) return;
    setApplying(true);
    setApplyError(null);
    try {
      const newPostulation = await postulacionesService.createPostulacion({
        id_iniciativa: parseInt(id),
        mensaje: "Me gustaría participar en esta iniciativa."
      });
      setPostulation(newPostulation);
      setApplySuccess("¡Te has postulado exitosamente!");
    } catch (err) {
      console.error("Error applying:", err);
      setApplyError(err.response?.data?.detail || "Error al postularse. Inténtalo de nuevo.");
    } finally {
      setApplying(false);
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
          <p className="text-gray-600">Cargando detalles de la iniciativa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Error: {error}</p>
          <Link to="/iniciativas" className="text-primary hover:underline mt-4 block">Volver a Iniciativas</Link>
        </div>
      </div>
    );
  }

  if (!initiative) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-700 px-6 py-4 rounded-2xl max-w-md mx-auto">
          <p>Iniciativa no encontrada.</p>
          <Link to="/iniciativas" className="text-primary hover:underline mt-4 block">Volver a Iniciativas</Link>
        </div>
      </div>
    );
  }

  // Check if user is coordinator (assuming id_rol 1 for coordinator)
  const isCoordinator = user && user.id_rol === 1; // Adjust role ID as per backend
  const isStudent = user && user.id_rol === 2;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to="/iniciativas" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver a Iniciativas
        </Link>

        <Card className="bg-gradient-to-br from-white to-lightGray p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-primary to-indigo-700 p-4 rounded-2xl">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-poppins font-bold text-darkGray">{initiative.name}</h1>
                <p className="text-gray-600 text-lg capitalize">{initiative.category}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${initiative.status === 'completada' ? 'bg-green-100 text-accent' :
                initiative.status === 'en desarrollo' ? 'bg-blue-100 text-primary' :
                  'bg-yellow-100 text-yellow-700'
              }`}>
              {initiative.status}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{initiative.description}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-5 h-5" />
              <span>Impacto Esperado: {initiative.impact}</span>
            </div>
            {/* Assuming initiative has a creation date */}
            {initiative.fecha_creacion && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Fecha de Creación: {new Date(initiative.fecha_creacion).toLocaleDateString()}</span>
              </div>
            )}
            {/* Assuming initiative has a creator */}
            {initiative.creador && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Creador: {initiative.creador.nombre}</span>
              </div>
            )}
          </div>

          {/* Documentos Opcionales */}
          {initiative.documentos && initiative.documentos.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-darkGray mb-3">Documentos Adjuntos</h3>
              <div className="space-y-2">
                {initiative.documentos.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url} // Assuming doc has a url property
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary hover:underline bg-gray-100 p-3 rounded-lg"
                  >
                    <FileText className="w-5 h-5" />
                    <span>{doc.nombre || `Documento ${index + 1}`}</span> {/* Assuming doc has a name property */}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Mensajes de Estado de Postulación */}
          {applySuccess && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {applySuccess}
            </div>
          )}
          {applyError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {applyError}
            </div>
          )}

          {/* Acciones */}
          <div className="flex justify-end space-x-4 mt-8">
            {isCoordinator ? (
              <Button variant="success" className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Convertir en Proyecto</span>
              </Button>
            ) : isStudent ? (
              postulation ? (
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    {postulation.estado === 'pendiente' ? 'Postulación Pendiente' :
                      postulation.estado === 'aceptada' ? 'Postulación Aceptada' : 'Postulación Rechazada'}
                  </span>
                </div>
              ) : (
                <Button
                  variant="primary"
                  className="flex items-center space-x-2"
                  onClick={handlePostular}
                  disabled={applying}
                >
                  {applying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  <span>{applying ? 'Postulando...' : 'Postularme a esta Iniciativa'}</span>
                </Button>
              )
            ) : null}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default IniciativaDetalle;
