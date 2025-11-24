import api from './api';

const API_URL = 'http://localhost:8000/api/v1/users';  // cambiado de /api/usuarios

const usuariosService = {
  getUsuarioById: async (id) => {
    const response = await api.get(`users/${id}`);
    return response.data;
  },

  updateUsuario: async (id, userData) => {
    // Check if userData is FormData (for file uploads)
    if (userData instanceof FormData) {
      const response = await api.put(`users/${id}`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } else {
      // For regular JSON updates, we need to send as FormData for consistency with backend
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
        }
      });
      const response = await api.put(`users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    }
  },

  getUsuarios: async (params) => {
    const response = await api.get('users/', { params });
    return response.data;
  },
};

export default usuariosService;
