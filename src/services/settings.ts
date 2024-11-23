import axios from 'axios';
import { InvoiceSettings, InvoiceSettingsCreate } from '../types/settings';

const API_URL = 'http://localhost:8000/api/settings';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to api instance
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const settingsService = {
    getInvoiceSettings: async (): Promise<InvoiceSettings> => {
      const response = await api.get('/invoice');
      return response.data;
    },
  
    createInvoiceSettings: async (settings: InvoiceSettingsCreate): Promise<InvoiceSettings> => {
      const response = await api.post('/invoice', settings);
      return response.data;
    },
  
    updateInvoiceSettings: async (settings: InvoiceSettingsCreate): Promise<InvoiceSettings> => {
      const response = await api.put('/invoice', settings);
      return response.data;
    },
};