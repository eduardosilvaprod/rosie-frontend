export interface InvoiceData {
  client_name: string;
  client_email: string;
  items: InvoiceItem[];
  notes?: string;
  due_date?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
}

export interface Invoice extends InvoiceData {
  id: number;
  invoice_number: string;
  created_at: string;
  status: string;
  total_amount: number;
}