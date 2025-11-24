import api from './api';

const authService = {
  login: async (email, password) => {
    // OAuth2PasswordRequestForm expects URL-encoded data, not FormData
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    const response = await api.post('/auth/login', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData) => {
    // Si userData es una instancia de FormData, Axios automáticamente establece el Content-Type a multipart/form-data
    const response = await api.post('/auth/register', userData, {
      headers: {
        'Content-Type': userData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
};

export default authService;
