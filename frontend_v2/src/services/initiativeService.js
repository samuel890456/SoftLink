import api from '../api/axios';

export const initiativeService = {
    async getAll() {
        const response = await api.get('/initiatives/');
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/initiatives/${id}`);
        return response.data;
    },

    async create(initiativeData) {
        const response = await api.post('/initiatives/', initiativeData);
        return response.data;
    },

    async update(id, initiativeData) {
        const response = await api.put(`/initiatives/${id}`, initiativeData);
        return response.data;
    },

    async delete(id) {
        const response = await api.delete(`/initiatives/${id}`);
        return response.data;
    }
};
