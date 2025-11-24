import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Building, FileText, Plus } from 'lucide-react';
import iniciativasService from '../services/iniciativasService';
import { useAuth } from '../context/AuthContext';

function PanelEmpresa() {
  const { user } = useAuth();
  const [myInitiatives, setMyInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyInitiatives = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const response = await iniciativasService.getIniciativas({ limit: 1000 });
        const allInitiatives = Array.isArray(response) ? response : [];
        // Filtrar por el id_usuario del usuario actual (la empresa)
        const filtered = allInitiatives.filter(init => init.id_usuario === user.id_usuario);
        setMyInitiatives(filtered);
      } catch (err) {
        setError('Error al cargar tus iniciativas.');
        console.error("Error fetching initiatives for company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInitiatives();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-3xl">
            <Building className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-poppins font-bold text-darkGray">
              Panel de Empresa
            </h1>
            <p className="text-gray-600 mt-1">Gestiona tus iniciativas y proyectos.</p>
          </div>
        </div>
      </motion.div>

      {/* My Initiatives Section */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-accent to-green-600 p-3 rounded-2xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-darkGray">
              Mis Iniciativas
            </h2>
          </div>
          <Link to="/iniciativas">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Crear Nueva
            </Button>
          </Link>
        </div>

        {loading && <p className="text-gray-600">Cargando iniciativas...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          myInitiatives.length > 0 ? (
            <div className="space-y-3">
              {myInitiatives.map(initiative => (
                <motion.div
                  key={initiative.id_iniciativa}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center bg-lightGray p-4 rounded-2xl hover:shadow-soft transition-all-300"
                >
                  <div>
                    <Link to={`/iniciativas/${initiative.id_iniciativa}`} className="font-semibold text-darkGray hover:text-primary transition-colors">
                      {initiative.nombre}
                    </Link>
                    <p className="text-sm text-gray-500 capitalize">{initiative.categoria}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    initiative.estado === 'completada' ? 'bg-green-100 text-accent' :
                    initiative.estado === 'en desarrollo' ? 'bg-blue-100 text-primary' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {initiative.estado || 'pendiente'}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aún no has creado ninguna iniciativa.</p>
            </div>
          )
        )}
      </Card>
    </div>
  );
}

export default PanelEmpresa;
