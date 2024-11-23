import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create a single axios instance with all configurations
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Single interceptor for authentication
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Test function
export const testApi = {
    testConnection: async () => {
        try {
            const response = await api.get('/company');
            console.log('Test response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Test error:', error);
            throw error;
        }
    }
};