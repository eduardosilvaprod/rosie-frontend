import { InvoiceSettings as IInvoiceSettings } from '../../types/settings';
import { settingsService } from '../../services/settings';
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';

interface FormData {
  company_name: string;
  company_cnpj: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  billing_company_name: string;
  billing_company_address: string;
  current_invoice_number: number;
}

export const InvoiceSettings: React.FC = () => {
  const [settings, setSettings] = useState<IInvoiceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    company_name: '',
    company_cnpj: '',
    company_address: '',
    company_email: '',
    company_phone: '',
    billing_company_name: '',
    billing_company_address: '',
    current_invoice_number: 1
  });
  
  useEffect(() => {
    loadSettings();
  }, []);
  
  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getInvoiceSettings();
      setSettings(data);
      setFormData(data);
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setSettings(null);
      } else {
        setError('Failed to load settings');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'current_invoice_number' ? parseInt(value) || 0 : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form data being sent:', formData);
    
    const requiredFields: (keyof FormData)[] = [
      'company_name',
      'company_cnpj',
      'company_address',
      'company_email',
      'company_phone',
      'billing_company_name',
      'billing_company_address',
      'current_invoice_number'
    ];
      
    const missingFields = requiredFields.filter(field => !formData[field]);
      
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      setSaving(true);
      const updatedSettings = settings 
        ? await settingsService.updateInvoiceSettings(formData)
        : await settingsService.createInvoiceSettings(formData);
      setSettings(updatedSettings);
      setError(null);
      setSuccessMessage(settings 
        ? 'Settings updated successfully!' 
        : 'Settings created successfully!');
    } catch (err) {
      setError('Failed to save settings');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
      setSuccessMessage(null);
      setError(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
            Invoice Settings
          </Typography>
          {!settings && (
            <Typography variant="subtitle1" color="text.secondary">
              No settings configured yet
            </Typography>
          )}
        </Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Company Information</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Company Name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              disabled={saving}
              fullWidth
            />
            <TextField
              label="CNPJ"
              name="company_cnpj"
              value={formData.company_cnpj}
              onChange={handleChange}
              disabled={saving}
              fullWidth
            />
          </Box>
          <TextField
            label="Address"
            name="company_address"
            value={formData.company_address}
            onChange={handleChange}
            disabled={saving}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
            <TextField
              label="Email"
              name="company_email"
              type="email"
              value={formData.company_email}
              onChange={handleChange}
              disabled={saving}
              fullWidth
            />
            <TextField
              label="Phone"
              name="company_phone"
              value={formData.company_phone}
              onChange={handleChange}
              disabled={saving}
              fullWidth
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>Billing Company Information</Typography>
          <TextField
            label="Billing Company Name"
            name="billing_company_name"
            value={formData.billing_company_name}
            onChange={handleChange}
            disabled={saving}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Billing Company Address"
            name="billing_company_address"
            value={formData.billing_company_address}
            onChange={handleChange}
            disabled={saving}
            fullWidth
          />
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>Invoice Control</Typography>
          <TextField
            label="Current Invoice Number"
            name="current_invoice_number"
            type="number"
            value={formData.current_invoice_number}
            onChange={handleChange}
            disabled={saving}
            fullWidth
          />
          <Box sx={{ mt: 3, position: 'relative' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={saving}
              fullWidth
              sx={{ 
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem'
              }}
              >
                {saving ? 'Saving...' : (settings ? 'Update Settings' : 'Create Settings')}
            </Button>
            {saving && (
              <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
              />
            )}
          </Box>
        </form>
      </Paper>
      <Snackbar 
          open={!!successMessage || !!error} 
          autoHideDuration={6000} 
          onClose={() => {
            setSuccessMessage(null);
            setError(null);
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? "error" : "success"} 
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
            {error || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};