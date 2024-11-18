import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CompanySettings } from './CompanySettings';
import { InvoiceNumberSettings } from './InvoiceNumberSettings';
import { BillingDefaults } from './BillingDefaults';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      sx={{ py: 3 }}
    >
      {value === index && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </Box>
  );
};

export const InvoiceSettings: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Invoice Settings
      </Typography>
      <Paper sx={{ mt: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Company Profile" />
          <Tab label="Invoice Numbering" />
          <Tab label="Billing Defaults" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <CompanySettings />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <InvoiceNumberSettings />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <BillingDefaults />
        </TabPanel>
      </Paper>
    </Box>
  );
};