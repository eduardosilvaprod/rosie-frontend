import axios from 'axios';
import { InvoiceData, Invoice } from '../types/invoice';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
  createInvoice: async (data: InvoiceData): Promise<Invoice> => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/invoices/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};