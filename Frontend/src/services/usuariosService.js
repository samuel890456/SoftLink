import api from './api';

const API_URL = 'http://localhost:8000/api/v1/users';  // cambiado de /api/usuarios

const usuariosService = {
  getUsuarioById: async (id) => {
    const response = await api.get(`users/${id}/`);
    return response.data;
  },

  updateUsuario: async (id, userData) => {
    const response = await api.put(`users/${id}`, userData);
    
    return response.data;
  },

  getUsuarios: async (params) => {
    const response = await api.get('users/', { params });
    return response.data;
  },
};

export default usuariosService;
