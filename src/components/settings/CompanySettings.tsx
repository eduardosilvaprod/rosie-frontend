import React, { useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Alert,
    InputAdornment,
  } from '@mui/material';
import { motion } from 'framer-motion';
import { formatCNPJ, validateCNPJ } from '../../utils/validators';
import { CheckCircle, Error } from '@mui/icons-material';

interface CompanyData {
  name: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
}

export const CompanySettings: React.FC = () => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    cnpj: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [cnpjValid, setCnpjValid] = useState<boolean | null>(null);

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setCompanyData({
      ...companyData,
      cnpj: formatted,
    });
    
    if (formatted.length === 18) { // Full CNPJ length with formatting
      setCnpjValid(validateCNPJ(formatted));
    } else {
      setCnpjValid(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save company data
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to save company settings');
      setSuccess(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Company Information
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Company settings saved successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Company Name"
            name="name"
            value={companyData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="CNPJ"
            name="cnpj"
            value={companyData.cnpj}
            onChange={handleCNPJChange}
            error={cnpjValid === false}
            helperText={cnpjValid === false ? "Invalid CNPJ" : ""}
            InputProps={{
                endAdornment: cnpjValid !== null && (
                    <InputAdornment position="end">
                        {cnpjValid ? (
                            <CheckCircle color="success" />
                        ) : (
                            <Error color="error" />
                        )}
                    </InputAdornment>
                ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Address"
            name="address"
            value={companyData.address}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            name="city"
            value={companyData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            fullWidth
            label="State"
            name="state"
            value={companyData.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            fullWidth
            label="ZIP Code"
            name="zipCode"
            value={companyData.zipCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={companyData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone"
            name="phone"
            value={companyData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Save Company Settings
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};