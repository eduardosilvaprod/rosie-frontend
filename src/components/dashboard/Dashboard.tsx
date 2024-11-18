import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Receipt as ReceiptIcon,
  Timeline as TimelineIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}> = ({ title, value, icon, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <Paper
        sx={{
          p: 2,
          height: '100%',
          background: `linear-gradient(45deg, ${color}88, ${color}44)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${color}22`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ p: 1, borderRadius: 1, mr: 2 }}>
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const QuickAction: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  delay: number;
}> = ({ title, description, icon, action, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={action}>
            Get Started
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Invoices',
      value: '24',
      icon: <ReceiptIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Pending Amount',
      value: '$3,450',
      icon: <MoneyIcon sx={{ fontSize: 32, color: theme.palette.warning.main }} />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Due This Week',
      value: '5',
      icon: <ScheduleIcon sx={{ fontSize: 32, color: theme.palette.error.main }} />,
      color: theme.palette.error.main,
    },
    {
      title: 'Monthly Growth',
      value: '+12%',
      icon: <TimelineIcon sx={{ fontSize: 32, color: theme.palette.success.main }} />,
      color: theme.palette.success.main,
    },
  ];

  const quickActions = [
    {
      title: 'Create New Invoice',
      description: 'Generate and send a new invoice to your clients',
      icon: <AddIcon color="primary" />,
      action: () => navigate('/invoices/new'),
    },
    {
      title: 'View Recent Invoices',
      description: 'Check and manage your recent invoices',
      icon: <ReceiptIcon color="primary" />,
      action: () => navigate('/invoices'),
    },
    {
      title: 'Schedule Payments',
      description: 'Set up and manage payment schedules',
      icon: <ScheduleIcon color="primary" />,
      action: () => navigate('/schedule'),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Back!
        </Typography>
      </motion.div>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              delay={index * 0.1}
            />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={4} key={action.title}>
            <QuickAction
              title={action.title}
              description={action.description}
              icon={action.icon}
              action={action.action}
              delay={0.5 + index * 0.1}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};