import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/auth/Login';
import { Dashboard } from './components/dashboard/Dashboard';
import { InvoiceForm } from './components/invoice/InvoiceForm';
import { InvoiceSettings } from './components/settings/InvoiceSettings';
import { Layout } from './components/layout/Layout';
import { darkTheme } from './theme/darkTheme';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <InvoiceForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="/settings" element={<Navigate to="/settings/invoice" />} /> 
              <Route
                path="/settings/invoice"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <InvoiceSettings />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;