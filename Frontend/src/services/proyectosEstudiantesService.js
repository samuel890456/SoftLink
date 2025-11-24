import api from './api';

const proyectosEstudiantesService = {
  getProyectosForStudent: async (studentId) => {
    const response = await api.get(`proyectos-estudiantes/student/${studentId}`);
    return response.data;
  },

  getStudentsForProject: async (projectId) => {
    const response = await api.get(`proyectos-estudiantes/project/${projectId}`);
    return response.data;
  },

  createProjectStudent: async (projectStudentData) => {
    const response = await api.post('proyectos-estudiantes/', projectStudentData);
    return response.data;
  },
};

export default proyectosEstudiantesService;

