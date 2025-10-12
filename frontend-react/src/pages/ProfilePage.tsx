// Profile page component
import React, { useState, useRef } from 'react';
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
  Divider,
  Chip,
  Grid,
  IconButton,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Email as EmailIcon, 
  Person as PersonIcon,
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../hooks/useCategories';
import { apiService } from '../services/apiService';
import CategoryList from '../components/CategoryList';
import { getResponsiveValue } from '../utils/helpers';
import { Category } from '../types';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getBackendLanguage = () => {
    return language === 'ru' ? 'ru' : 'en';
  };
  
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories(true, getBackendLanguage());

  const handleCategoryClick = (category: Category) => {
    navigate(`/executors/${category.name}`);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (user?.id) {
        await apiService.updateProfile(user.id, formData);
        // Обновляем данные пользователя в контексте
        updateUser({ name: formData.name, email: formData.email });
        setIsEditing(false);
      }
    } catch (err) {
      setError('Ошибка при сохранении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Размер файла не должен превышать 5MB');
      return;
    }

    setAvatarLoading(true);
    setError(null);

    try {
      const response = await apiService.uploadAvatar(user.id, file);
      // Обновляем данные пользователя в контексте
      updateUser({ avatar: response.avatarUrl });
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке аватара');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleAvatarDelete = async () => {
    if (!user?.id) return;

    setAvatarLoading(true);
    setError(null);

    try {
      await apiService.deleteAvatar(user.id);
      // Обновляем данные пользователя в контексте
      updateUser({ avatar: undefined });
    } catch (err: any) {
      setError(err.message || 'Ошибка при удалении аватара');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
    setError(null);
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">Пользователь не найден</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ px: 0, pt: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 2, sm: 3 }, 
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Categories Sidebar */}
        <Box sx={{ 
          minWidth: { xs: '100%', md: 250 }, 
          width: { xs: '100%', md: 'auto' },
          backgroundColor: '#FFFFFF', 
          borderRadius: '16px', 
          border: '1px solid #E0E0E0',
          p: 2,
          order: { xs: 2, md: 1 }
        }}>
          <CategoryList
            categories={categories}
            loading={categoriesLoading}
            error={categoriesError}
            onCategoryClick={handleCategoryClick}
            title={t('home.categories')}
          />
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1, 
          order: { xs: 1, md: 2 },
          width: { xs: '100%', md: 'auto' }
        }}>
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              borderRadius: 2,
              backgroundColor: '#ffffff',
            }}
          >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative', mr: 3 }}>
            <Avatar
              src={user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `${apiService.getApiBaseUrl()}${user.avatar}`) : undefined}
              sx={{
                width: 80,
                height: 80,
                fontSize: '2rem',
                backgroundColor: '#4CAF50',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            
            {/* Кнопки для управления аватаром */}
            <Box sx={{ 
              position: 'absolute', 
              bottom: -5, 
              right: -5,
              display: 'flex',
              gap: 0.5
            }}>
              <IconButton
                size="small"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarLoading}
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  width: 24,
                  height: 24,
                  '&:hover': {
                    backgroundColor: '#45a049',
                  }
                }}
              >
                {avatarLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <PhotoCameraIcon sx={{ fontSize: 14 }} />
                )}
              </IconButton>
              
              {user.avatar && (
                <IconButton
                  size="small"
                  onClick={handleAvatarDelete}
                  disabled={avatarLoading}
                  sx={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    width: 24,
                    height: 24,
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    }
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            </Box>
            
            {/* Скрытый input для выбора файла */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Box>
          
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                fontSize: getResponsiveValue('1.5rem', '2rem', '2.5rem'),
                color: '#2E7D32',
                mb: 1,
              }}
            >
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ID: {user.id}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Информация о профиле
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PersonIcon color="primary" />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Имя
                </Typography>
                {isEditing ? (
                  <TextField
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    fullWidth
                    size="small"
                  />
                ) : (
                  <Typography variant="body1">{user.name}</Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EmailIcon color="primary" />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Email
                </Typography>
                {isEditing ? (
                  <TextField
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    fullWidth
                    size="small"
                    type="email"
                  />
                ) : (
                  <Typography variant="body1">{user.email}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Категории пользователя */}
        {user.categories && user.categories.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Мои категории
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {user.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  sx={{
                    backgroundColor: category.color || '#4CAF50',
                    color: '#ffffff',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: category.color || '#45a049',
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
              >
                Отмена
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={loading}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Сохранить'
                )}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
              sx={{
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#45a049'
                }
              }}
            >
              Редактировать профиль
            </Button>
          )}
        </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;