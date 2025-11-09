import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/', // Mocked API URL for testing
  withCredentials: true,
});

export default instance;
