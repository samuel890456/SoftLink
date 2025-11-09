import api from './api';

const rolesService = {
  getRoles: async () => {
    const response = await api.get('/roles');
    console.log("API Response for roles:", response);
    return response.data;
  },
};

export default rolesService;
