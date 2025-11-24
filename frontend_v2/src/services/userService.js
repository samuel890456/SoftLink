import api from '../api/axios';

export const userService = {
    async getCurrentUser() {
        const response = await api.get('/users/me');
        return response.data;
    },

    async updateProfile(userData) {
        const response = await api.put('/users/me', userData);
        return response.data;
    }
};
