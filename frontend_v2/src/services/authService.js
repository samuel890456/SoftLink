import api from '../api/axios';
import { jwtDecode } from "jwt-decode";

export const authService = {
    async login(email, password) {
        const response = await api.post('/auth/login', new URLSearchParams({
            username: email,
            password: password,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async register(userData) {
        // Ajustar datos para el backend
        const payload = {
            nombre: userData.nombre || userData.fullName,
            email: userData.email,
            password: userData.password,
            id_rol: userData.id_rol || (userData.role === 'student' ? 2 : 3),
            telefono: userData.telefono || userData.phone || "",
            bio: userData.bio || "",
            tecnologias: userData.tecnologias || userData.skills || "",
            sitio_web: userData.sitio_web || userData.website || "",
            github: userData.github || "",
            direccion: userData.direccion || userData.address || "",
            identificador_fiscal: userData.identificador_fiscal || userData.taxId || ""
        };

        const response = await api.post('/auth/register', payload);
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    }
};
