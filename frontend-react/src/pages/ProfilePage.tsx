// Profile page component
import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { getResponsiveValue } from '../utils/helpers';

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const userProfile = await apiService.getUserProfile();
        dispatch({ type: 'SET_USER', payload: userProfile });
        setFormData({
          name: userProfile.name,
          email: userProfile.email,
        });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки профиля' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleSave = async () => {
    try {
      await apiService.updateUserProfile(formData);
      dispatch({ type: 'SET_USER', payload: { ...state.user!, ...formData } });
      setIsEditing(false);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Ошибка обновления профиля' });
    }
  };

  const handleCancel = () => {
    if (state.user) {
      setFormData({
        name: state.user.name,
        email: state.user.email,
      });
    }
    setIsEditing(false);
  };

  if (state.isLoading) {
    return (
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.error}
        </Alert>
      )}

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontSize: getResponsiveValue('1.5rem', '1.8rem', '2rem'),
          fontWeight: 600,
          textAlign: 'center',
          mb: 4,
        }}
      >
        Профиль пользователя
      </Typography>

      <Paper elevation={3} sx={{ p: getResponsiveValue(3, 4, 5) }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center', flex: { xs: 'none', sm: '0 0 300px' } }}>
            <Avatar
              src={state.user?.avatar}
              sx={{
                width: getResponsiveValue(100, 120, 150),
                height: getResponsiveValue(100, 120, 150),
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              {state.user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Участник с {state.user?.memberSince}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            {isEditing ? (
              <Box>
                <TextField
                  fullWidth
                  label="Имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  margin="normal"
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button variant="contained" onClick={handleSave}>
                    Сохранить
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Отмена
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Информация о профиле
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Имя:</strong> {state.user?.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Email:</strong> {state.user?.email}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>ID:</strong> {state.user?.id}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{ mt: 2 }}
                >
                  Редактировать профиль
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
