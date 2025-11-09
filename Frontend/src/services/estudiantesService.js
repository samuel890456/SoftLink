import api from './api';
import authService from './authService'; // Para el registro de estudiantes

const estudiantesService = {
  getEstudiantes: async (params) => {
    // Asumiendo que /api/usuarios devuelve todos los usuarios y podemos filtrar por rol si es necesario
    // O que hay un endpoint específico para estudiantes
    const response = await api.get('users/', { params });
    // Filtrar por rol de estudiante si la API devuelve todos los usuarios
    // const estudiantes = response.data.filter(user => user.id_rol === ID_ROL_ESTUDIANTE);
    return response.data; // Devolver todos los usuarios por ahora
  },

  createEstudiante: async (userData) => {
    // El registro de estudiantes se hace a través del servicio de autenticación
    // Asumiendo que el backend asigna el rol de estudiante por defecto o se envía en userData
    const response = await authService.register(userData);
    return response;
  },

  getEstudianteById: async (id) => {
    const response = await api.get(`/users/${id}/`); // Asumiendo que se obtiene por ID de usuario
    return response.data;
  },
};

export default estudiantesService;
