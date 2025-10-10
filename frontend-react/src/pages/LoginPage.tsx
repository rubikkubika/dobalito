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
  Link,
  Tabs,
  Tab,
  InputAdornment
} from '@mui/material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login, loginWithPhone, sendVerificationCode, loading, error } = useAuth();
  
  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  
  // Email login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Phone login state
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeSentTo, setCodeSentTo] = useState('');
  
  // Validation errors
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    phone?: string;
    code?: string;
  }>({});

  const validateEmailForm = () => {
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

  const validatePhoneForm = () => {
    const errors: { phone?: string; code?: string } = {};

    if (!phone.trim()) {
      errors.phone = t('phone.phone_required');
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(phone)) {
      errors.phone = t('phone.phone_invalid');
    }

    if (codeSent && !code.trim()) {
      errors.code = t('phone.code_required');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmailForm()) {
      return;
    }

    try {
      await login(email, password);
      const from = location.state?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    } catch (err) {
      // Ошибка обрабатывается в AuthContext
    }
  };

  const handleSendCode = async () => {
    if (!validatePhoneForm()) {
      return;
    }

    try {
      await sendVerificationCode(phone);
      setCodeSent(true);
      setCodeSentTo(phone);
      setValidationErrors({});
    } catch (err) {
      // Ошибка обрабатывается в AuthContext
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneForm()) {
      return;
    }

    try {
      await loginWithPhone(phone, code, name || undefined);
      const from = location.state?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    } catch (err) {
      // Ошибка обрабатывается в AuthContext
    }
  };

  const handleResendCode = async () => {
    try {
      await sendVerificationCode(phone);
    } catch (err) {
      // Ошибка обрабатывается в AuthContext
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setValidationErrors({});
    setCodeSent(false);
    setCode('');
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
            {activeTab === 0 ? t('login.title') : t('phone.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {activeTab === 0 ? t('login.subtitle') : t('phone.subtitle')}
          </Typography>
        </Box>

        <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab 
            icon={<EmailIcon />} 
            label={t('phone.switch_to_email')} 
            iconPosition="start"
          />
          <Tab 
            icon={<PhoneIcon />} 
            label={t('phone.switch_to_phone')} 
            iconPosition="start"
          />
        </Tabs>

        {activeTab === 0 ? (
          // Email Login Form
          <form onSubmit={handleEmailSubmit}>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SecurityIcon />
                    </InputAdornment>
                  ),
                }}
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
        ) : (
          // Phone Login Form
          <form onSubmit={handlePhoneSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 1 }}>
                  {error}
                </Alert>
              )}

              {codeSent && (
                <Alert severity="success" sx={{ mb: 1 }}>
                  {t('phone.code_sent')} {codeSentTo}
                </Alert>
              )}

              <TextField
                label={t('phone.phone')}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!validationErrors.phone}
                helperText={validationErrors.phone}
                fullWidth
                disabled={loading || codeSent}
                autoComplete="tel"
                autoFocus={!codeSent}
                placeholder="+7 900 123 45 67"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {!codeSent ? (
                <Button
                  onClick={handleSendCode}
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
                    t('phone.send_code')
                  )}
                </Button>
              ) : (
                <>
                  <TextField
                    label={t('phone.code')}
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    error={!!validationErrors.code}
                    helperText={validationErrors.code || t('phone.code_expires')}
                    fullWidth
                    disabled={loading}
                    autoFocus
                    placeholder="123456"
                    inputProps={{ maxLength: 6 }}
                  />

                  <TextField
                    label={t('phone.name')}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    disabled={loading}
                    helperText="Только для новых пользователей"
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
                      t('phone.verify_code')
                    )}
                  </Button>

                  <Button
                    onClick={handleResendCode}
                    variant="outlined"
                    disabled={loading}
                    fullWidth
                    sx={{
                      mt: 1,
                      py: 1,
                      fontSize: '14px',
                      color: '#4CAF50',
                      borderColor: '#4CAF50',
                      '&:hover': {
                        borderColor: '#45a049',
                        backgroundColor: 'rgba(76, 175, 80, 0.04)'
                      }
                    }}
                  >
                    {t('phone.resend_code')}
                  </Button>
                </>
              )}
            </Box>
          </form>
        )}

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
