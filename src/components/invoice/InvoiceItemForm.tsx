import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { InvoiceItem } from '../../types/invoice';

interface Props {
  onAdd: (item: InvoiceItem) => void;
}

export const InvoiceItemForm: React.FC<Props> = ({ onAdd }) => {
  const [item, setItem] = useState<InvoiceItem>({
    description: '',
    quantity: 1,
    unit_price: 0,
  });

  const handleSubmit = (e: React.MouseEvent) => {  // Changed from FormEvent to MouseEvent
    e.preventDefault();
    onAdd(item);
    setItem({
      description: '',
      quantity: 1,
      unit_price: 0,
    });
  };

  return (
    <Box sx={{ mt: 2 }}>  {/* Changed from form to Box */}
      <Stack direction="row" spacing={2}>
        <TextField
          label="Description"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          required
        />
        <TextField
          label="Quantity"
          type="number"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) })}
          required
          inputProps={{ min: 1 }}
        />
        <TextField
          label="Unit Price"
          type="number"
          value={item.unit_price}
          onChange={(e) => setItem({ ...item, unit_price: parseFloat(e.target.value) })}
          required
          inputProps={{ min: 0, step: 0.01 }}
        />
        <Button 
          onClick={handleSubmit}  // Changed from type="submit"
          variant="outlined"
        >
          Add Item
        </Button>
      </Stack>
    </Box>
  );
};