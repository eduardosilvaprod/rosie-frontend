import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { InvoiceData, InvoiceItem } from '../../types/invoice';
import { InvoiceItemForm } from './InvoiceItemForm';
import { api } from '../../services/api';
import { Dayjs } from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../common/PageTransition';
import { AnimatedAlert } from '../common/AnimatedAlert';
import { AnimatedButton } from '../common/AnimatedButton';

export const InvoiceForm: React.FC = () => {
  const [formData, setFormData] = useState<InvoiceData>({
    client_name: '',
    client_email: '',
    items: [],
    notes: '',
    due_date: undefined,
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = (item: InvoiceItem) => {
    setFormData({
      ...formData,
      items: [...formData.items, item],
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData({
      ...formData,
      due_date: date ? date.toISOString() : undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.createInvoice(formData);
      setSuccess('Invoice created successfully!');
      setError('');
      setFormData({
        client_name: '',
        client_email: '',
        items: [],
        notes: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create invoice');
      setSuccess('');
    }
  };

  return (
    <PageTransition>
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <AnimatedAlert 
          show={!!error} 
          severity="error" 
          sx={{ mb: 2 }}
        >
          {error}
        </AnimatedAlert>
        <Typography variant="h5" gutterBottom>
          Create New Invoice
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>  {/* Changed from form to Box with component="form" */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client Name"
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client Email"
                name="client_email"
                type="email"
                value={formData.client_email}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Invoice Items
              </Typography>
              <AnimatePresence>
                {formData.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Typography variant="body1">
                          {item.description} - {item.quantity} x ${item.unit_price}
                        </Typography>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem(index)}
                          sx={{ mt: 1 }}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
              <InvoiceItemForm onAdd={handleAddItem} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <DatePicker
                label="Due Date"
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12}>
              <AnimatedButton
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={formData.items.length === 0}
                fullWidth
              >
                Generate Invoice
              </AnimatedButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </PageTransition>
  );
};