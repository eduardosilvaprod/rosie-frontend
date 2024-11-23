export interface InvoiceSettings {
  id: number;
  company_name: string;
  company_cnpj: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  billing_company_name: string;
  billing_company_address: string;
  current_invoice_number: number;
}
  
export interface InvoiceSettingsCreate {
    company_name: string;
    company_cnpj: string;
    current_invoice_number: number;
}