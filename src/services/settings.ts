import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface CompanySettings {
  name: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
}

export interface InvoiceNumberSettings {
  prefix: string;
  currentNumber: number;
  padding: number;
  format: string;
}

export interface ServiceItem {
  id: string;
  description: string;
  defaultRate: number;
}

export const settingsApi = {
  // Company Settings
  getCompanySettings: async (): Promise<CompanySettings> => {
    const response = await axios.get(`${API_BASE_URL}/settings/company`);
    return response.data;
  },

  saveCompanySettings: async (settings: CompanySettings): Promise<CompanySettings> => {
    const response = await axios.post(`${API_BASE_URL}/settings/company`, settings);
    return response.data;
  },

  // Invoice Number Settings
  getInvoiceNumberSettings: async (): Promise<InvoiceNumberSettings> => {
    const response = await axios.get(`${API_BASE_URL}/settings/invoice-number`);
    return response.data;
  },

  saveInvoiceNumberSettings: async (settings: InvoiceNumberSettings): Promise<InvoiceNumberSettings> => {
    const response = await axios.post(`${API_BASE_URL}/settings/invoice-number`, settings);
    return response.data;
  },

  // Billing Defaults
  getBillingDefaults: async (): Promise<ServiceItem[]> => {
    const response = await axios.get(`${API_BASE_URL}/settings/billing-defaults`);
    return response.data;
  },

  saveBillingDefaults: async (items: ServiceItem[]): Promise<ServiceItem[]> => {
    const response = await axios.post(`${API_BASE_URL}/settings/billing-defaults`, { items });
    return response.data;
  },
};