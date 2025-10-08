import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Link
} from '@mui/material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = t('login.email_required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = t('login.email_invalid');
    }

    if (!password.trim()) {
      errors.password = t('login.password_required');
    } else if (password.length < 6) {
      errors.password = t('login.password_min_length');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      // Перенаправляем на страницу, с которой пришел пользователь, или на профиль
      const from = location.state?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    } catch (err) {
      // Ошибка обрабатывается в AuthContext
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            {t('login.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('login.subtitle')}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            )}

            <TextField
              label={t('login.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              fullWidth
              disabled={loading}
              autoComplete="email"
              autoFocus
            />

            <TextField
              label={t('login.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              fullWidth
              disabled={loading}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#45a049'
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t('login.submit')
              )}
            </Button>
          </Box>
        </form>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Нет аккаунта?{' '}
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                color: '#4CAF50',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Зарегистрироваться
            </Link>
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link
            component={RouterLink}
            to="/home"
            sx={{
              color: '#757575',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            ← Вернуться на главную
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
