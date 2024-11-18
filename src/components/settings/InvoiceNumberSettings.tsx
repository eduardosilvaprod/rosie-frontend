import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';

interface InvoiceNumberConfig {
  prefix: string;
  currentNumber: number;
  padding: number;
  format: string;
}

export const InvoiceNumberSettings: React.FC = () => {
  const [config, setConfig] = useState<InvoiceNumberConfig>({
    prefix: 'INV',
    currentNumber: 1,
    padding: 4,
    format: '{PREFIX}{NUMBER}',
  });

  const [previewNumber, setPreviewNumber] = useState('');

  const updatePreview = (newConfig: InvoiceNumberConfig) => {
    const paddedNumber = String(newConfig.currentNumber).padStart(newConfig.padding, '0');
    const preview = newConfig.format
      .replace('{PREFIX}', newConfig.prefix)
      .replace('{NUMBER}', paddedNumber);
    setPreviewNumber(preview);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfig = {
      ...config,
      [e.target.name]: e.target.value,
    };
    setConfig(newConfig);
    updatePreview(newConfig);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Invoice Number Configuration
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Prefix"
            name="prefix"
            value={config.prefix}
            onChange={handleChange}
            helperText="e.g., INV, INVOICE, etc."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Current Number"
            name="currentNumber"
            type="number"
            value={config.currentNumber}
            onChange={handleChange}
            helperText="Next invoice will use this number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Number Padding"
            name="padding"
            type="number"
            value={config.padding}
            onChange={handleChange}
            helperText="How many digits to show (e.g., 4 = 0001)"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Preview: {previewNumber}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            Save Number Settings
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};