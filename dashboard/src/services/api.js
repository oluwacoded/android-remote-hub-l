import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  refresh: (refreshToken) =>
    api.post('/auth/refresh', { refreshToken }),
};

// Device API
export const deviceAPI = {
  register: (deviceName, deviceModel, androidVersion, deviceId) =>
    api.post('/devices/register', { deviceName, deviceModel, androidVersion, deviceId }),
  getAll: () => api.get('/devices'),
  getOne: (deviceId) => api.get(`/devices/${deviceId}`),
  disconnect: (deviceId) => api.post(`/devices/${deviceId}/disconnect`),
  delete: (deviceId) => api.delete(`/devices/${deviceId}`),
};

// File API
export const fileAPI = {
  upload: (deviceId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('deviceId', deviceId);
    return api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getTransfers: (deviceId) => api.get(`/files/transfers/${deviceId}`),
};

export default api;
