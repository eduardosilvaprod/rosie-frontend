import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth';

const API_URL = 'http://localhost:8000';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await axios.post(`${API_URL}/auth/token`, formData);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },
};