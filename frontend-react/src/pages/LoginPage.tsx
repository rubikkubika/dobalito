import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import PhoneInput from '../components/PhoneInput';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { loginWithPhone, sendVerificationCode, loading, error } = useAuth();
  
  // Phone login state
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeSentTo, setCodeSentTo] = useState('');
  const [displayCode, setDisplayCode] = useState(''); // Код для отображения на экране
  const [codeVerified, setCodeVerified] = useState(false); // Код проверен
  const [isNewUser, setIsNewUser] = useState(false); // Новый пользователь
  const [codeCheckLoading, setCodeCheckLoading] = useState(false); // Загрузка проверки кода
  
  // Validation errors
  const [validationErrors, setValidationErrors] = useState<{
    phone?: string;
    code?: string;
    name?: string;
  }>({});

  const validatePhoneForm = () => {
    const errors: { phone?: string; code?: string; name?: string } = {};

    if (!phone.trim()) {
      errors.phone = t('phone.phone_required');
    } else if (!/^[+]?[0-9\s\-()]{10,15}$/.test(phone)) {
      errors.phone = t('phone.phone_invalid');
    }

    if (codeSent && !code.trim()) {
      errors.code = t('phone.code_required');
    }

    // Валидация имени только для новых пользователей после проверки кода
    if (codeVerified && isNewUser && !name.trim()) {
      errors.name = t('phone.name_required');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendCode = async () => {
    if (!validatePhoneForm()) {
      return;
    }

    try {
      const result = await sendVerificationCode(phone);
      setCodeSent(true);
      setCodeSentTo(phone);
      setDisplayCode(result.code); // Сохраняем код для отображения
      setValidationErrors({});
    } catch (err) {
      // Ошибка обрабатывается в AuthContext
    }
  };

  const handleCheckCode = async () => {
    if (!code.trim()) {
      setValidationErrors({ code: t('phone.code_required') });
      return;
    }

    setCodeCheckLoading(true);
    setValidationErrors({});

    try {
      const result = await apiService.checkCode(phone, code);
      
      if (result.success) {
        setCodeVerified(true);
        setIsNewUser(result.isNewUser);
        
        // Если пользователь не новый, сразу авторизуем
        if (!result.isNewUser) {
          await loginWithPhone(phone, code);
          const from = location.state?.from?.pathname || '/profile';
          navigate(from, { replace: true });
        }
      }
    } catch (err: any) {
      setValidationErrors({ code: err.message || 'Неверный код' });
    } finally {
      setCodeCheckLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneForm()) {
      return;
    }

    try {
      // Авторизуем только новых пользователей с именем
      if (codeVerified && isNewUser) {
        await loginWithPhone(phone, code, name);
        const from = location.state?.from?.pathname || '/profile';
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Ошибка обрабатывается в AuthContext
    }
  };

  const handleResendCode = async () => {
    try {
      const result = await sendVerificationCode(phone);
      setDisplayCode(result.code); // Обновляем отображаемый код
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
            {t('phone.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('phone.subtitle')}
          </Typography>
        </Box>

        {/* Phone Login Form */}
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
                {displayCode && (
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 'bold', 
                      color: '#2e7d32',
                      fontFamily: 'monospace',
                      letterSpacing: '0.2em'
                    }}>
                      {displayCode}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Код для тестирования
                    </Typography>
                  </Box>
                )}
              </Alert>
            )}

            <PhoneInput
              value={phone}
              onChange={setPhone}
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
              disabled={loading || codeSent}
              placeholder="900 123 45 67"
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
            ) : !codeVerified ? (
              <>
                <TextField
                  label={t('phone.code')}
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  error={!!validationErrors.code}
                  helperText={validationErrors.code || t('phone.code_expires')}
                  fullWidth
                  disabled={codeCheckLoading}
                  autoFocus
                  placeholder="123456"
                  inputProps={{ maxLength: 6 }}
                />

                <Button
                  onClick={handleCheckCode}
                  variant="contained"
                  disabled={codeCheckLoading}
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
                  {codeCheckLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Проверить код'
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
            ) : (
              <>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Код проверен успешно!
                  {isNewUser ? ' Введите ваше имя для завершения регистрации.' : ' Добро пожаловать!'}
                </Alert>

                {isNewUser && (
                  <TextField
                    label={t('phone.name')}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name || t('phone.name_required')}
                    fullWidth
                    disabled={loading}
                    autoFocus
                    placeholder="Введите ваше имя"
                  />
                )}

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || (isNewUser && !name.trim())}
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
                    isNewUser ? 'Завершить регистрацию' : 'Войти'
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

      </Paper>
    </Container>
  );
};

export default LoginPage;
