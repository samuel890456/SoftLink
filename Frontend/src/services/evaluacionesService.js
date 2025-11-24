import api from './api';

const evaluacionesService = {
  getEvaluacionesByProject: async (projectId) => {
    const response = await api.get(`evaluaciones/project/${projectId}`);
    return response.data;
  },

  getEvaluacionesByUser: async (userId) => {
    // Esto requeriría un endpoint en el backend que obtenga evaluaciones por usuario
    // Por ahora, podemos obtener todos los proyectos del usuario y luego sus evaluaciones
    const response = await api.get(`evaluaciones/user/${userId}`);
    return response.data;
  },

  createEvaluacion: async (evaluacionData) => {
    const response = await api.post('evaluaciones/', evaluacionData);
    return response.data;
  },
};

export default evaluacionesService;

