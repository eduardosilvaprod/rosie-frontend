import React from 'react';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import { motion } from 'framer-motion';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ mb: 3 }}>
        <MuiBreadcrumbs
          separator={
            <NavigateNext 
              fontSize="small" 
              sx={{ color: theme.palette.text.secondary }}
            />
          }
        >
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            Home
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return last ? (
              <Typography
                color="primary"
                key={to}
                sx={{ fontWeight: 'medium' }}
              >
                {capitalizeFirstLetter(value)}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={to}
                key={to}
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {capitalizeFirstLetter(value)}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    </motion.div>
  );
};