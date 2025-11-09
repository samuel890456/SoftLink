import api from './api';

const API_URL = 'http://localhost:8000/api/v1/iniciativas';  // cambiado de /api/iniciativas

const iniciativasService = {
  getIniciativas: async (params) => {
    const response = await api.get('iniciativas/', { params });
    return response.data;
  },

  createIniciativa: async (iniciativaData) => {
    // Si iniciativaData es una instancia de FormData, Axios automáticamente establece el Content-Type a multipart/form-data
    const response = await api.post('iniciativas/', iniciativaData, {
      headers: {
        'Content-Type': iniciativaData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  },

  getIniciativaById: async (id) => {
    const response = await api.get(`iniciativas/${id}/`);
    return response.data;
  },
};

export default iniciativasService;
