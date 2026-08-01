import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authAPI = {
  register: (username, email, password) =>
    api.post('/api/auth/register', { username, email, password }),
  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),
  refresh: (refreshToken) =>
    api.post('/api/auth/refresh', { refreshToken }),
};

const deviceAPI = {
  getAll: () => api.get('/api/devices'),
  getById: (id) => api.get(`/api/devices/${id}`),
  register: (data) => api.post('/api/devices/register', data),
  delete: (id) => api.delete(`/api/devices/${id}`),
  disconnect: (id) => api.post(`/api/devices/${id}/disconnect`),
};

const fileAPI = {
  upload: (formData) => api.post('/api/files/upload', formData),
  download: (id) => api.get(`/api/files/download/${id}`),
};

export { authAPI, deviceAPI, fileAPI, api };
