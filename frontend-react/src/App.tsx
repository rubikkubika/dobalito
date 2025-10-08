import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import DesignsPage from './pages/DesignsPage';
import ExecutorsPage from './pages/ExecutorsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Create theme with green colors matching doBalito design
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green primary
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#8BC34A', // Light green secondary
      light: '#AED581',
      dark: '#689F38',
    },
    error: {
      main: '#F44336',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E7D32', // Dark green text
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h5: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h6: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    body1: {
      color: '#757575',
    },
    body2: {
      color: '#757575',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '0 !important',
          paddingRight: '0 !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '12px 24px',
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#388E3C',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #E0E0E0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#4CAF50',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/executors/:category" element={<ExecutorsPage />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/designs" element={<DesignsPage />} />
                </Routes>
              </Layout>
            </Router>
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;