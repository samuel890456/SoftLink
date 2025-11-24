import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/postulaciones';

// Configurar interceptor para incluir el token
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

const createPostulacion = async (postulacionData) => {
    const response = await axios.post(API_URL + '/', postulacionData, {
        headers: getAuthHeader(),
    });
    return response.data;
};

const getPostulaciones = async (params = {}) => {
    const response = await axios.get(API_URL + '/', {
        headers: getAuthHeader(),
        params,
    });
    return response.data;
};

const updatePostulacion = async (id, postulacionData) => {
    const response = await axios.put(`${API_URL}/${id}`, postulacionData, {
        headers: getAuthHeader(),
    });
    return response.data;
};

const postulacionesService = {
    createPostulacion,
    getPostulaciones,
    updatePostulacion,
};

export default postulacionesService;
