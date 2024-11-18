import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItem {
  id: string;
  description: string;
  defaultRate: number;
}

export const BillingDefaults: React.FC = () => {
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [success, setSuccess] = useState(false);

  const addServiceItem = () => {
    setServiceItems([
      ...serviceItems,
      { id: Date.now().toString(), description: '', defaultRate: 0 },
    ]);
  };

  const removeServiceItem = (id: string) => {
    setServiceItems(serviceItems.filter(item => item.id !== id));
  };

  const updateServiceItem = (id: string, field: keyof ServiceItem, value: string | number) => {
    setServiceItems(serviceItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save billing defaults
      setSuccess(true);
    } catch (error) {
      console.error('Failed to save billing defaults:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Default Service Items
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Billing defaults saved successfully!
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <AnimatePresence>
          {serviceItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    label="Service Description"
                    value={item.description}
                    onChange={(e) => updateServiceItem(item.id, 'description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Default Rate"
                    type="number"
                    value={item.defaultRate}
                    onChange={(e) => updateServiceItem(item.id, 'defaultRate', parseFloat(e.target.value))}
                    InputProps={{
                      startAdornment: <Typography>$</Typography>,
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton 
                    color="error"
                    onClick={() => removeServiceItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          startIcon={<AddIcon />}
          onClick={addServiceItem}
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Service Item
        </Button>
      </Paper>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
      >
        Save Billing Defaults
      </Button>
    </Box>
  );
};