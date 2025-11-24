import api from '../api/axios';

export const projectService = {
    async getMyProjects() {
        const response = await api.get('/projects/me');
        return response.data;
    },

    async getPublicProjects() {
        const response = await api.get('/projects/public');
        return response.data;
    },

    async getById(id) {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    async getMilestones(projectId) {
        const response = await api.get(`/projects/${projectId}/milestones`);
        return response.data;
    },

    async createMilestone(projectId, milestoneData) {
        const response = await api.post(`/projects/${projectId}/milestones`, milestoneData);
        return response.data;
    },

    async submitDelivery(projectId, milestoneId, deliveryData) {
        const response = await api.post(`/projects/${projectId}/milestones/${milestoneId}/deliveries`, deliveryData);
        return response.data;
    },

    async getDeliveries(projectId, milestoneId) {
        const response = await api.get(`/projects/${projectId}/milestones/${milestoneId}/deliveries`);
        return response.data;
    }
};
