import api from '../api/axios';

export const postulacionService = {
    async create(postulacionData) {
        const response = await api.post('/postulaciones/', postulacionData);
        return response.data;
    },

    async getMyPostulations() {
        const response = await api.get('/postulaciones/me');
        return response.data;
    },

    async checkStatus(initiativeId) {
        const response = await api.get('/postulaciones/me');
        return response.data.find(p => p.id_iniciativa === parseInt(initiativeId));
    },

    async getPending() {
        const response = await api.get('/postulaciones/pending');
        return response.data;
    },

    async updateStatus(id, status) {
        const response = await api.put(`/postulaciones/${id}`, { estado: status });
        return response.data;
    }
};
