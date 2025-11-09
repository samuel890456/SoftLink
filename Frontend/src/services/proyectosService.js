import api from './api';

const API_URL = 'http://localhost:8000/api/v1/proyectos';  // cambiado de /api/proyectos

const proyectosService = {
  getProyectos: async (params) => {
    const response = await api.get('proyectos/', { params });
    
    return response.data;
  },

  createProyecto: async (projectData) => {
    const response = await api.post('proyectos/', projectData);
    return response.data;
  },

  getProyectoById: async (id) => {
    const response = await api.get(`proyectos/${id}/`);
    return response.data;
  },
};

export default proyectosService;
