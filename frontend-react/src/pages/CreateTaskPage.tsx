import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  MenuItem,
  Container,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../hooks/useCategories';
import { apiService } from '../services/apiService';
import { Category } from '../types';

const CreateTaskPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: null as Date | null,
    startTime: null as Date | null,
    endDate: null as Date | null,
    endTime: null as Date | null,
    categoryId: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const getBackendLanguage = () => {
    return language === 'ru' ? 'ru' : 'en';
  };
  
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories(true, getBackendLanguage());

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Название задания обязательно');
      }
      if (!formData.startDate || !formData.startTime) {
        throw new Error('Дата и время начала обязательны');
      }
      if (!formData.endDate || !formData.endTime) {
        throw new Error('Дата и время окончания обязательны');
      }
      if (!formData.categoryId) {
        throw new Error('Категория обязательна');
      }

      // Combine date and time
      const startDateTime = new Date(formData.startDate);
      startDateTime.setHours(formData.startTime.getHours());
      startDateTime.setMinutes(formData.startTime.getMinutes());

      const endDateTime = new Date(formData.endDate);
      endDateTime.setHours(formData.endTime.getHours());
      endDateTime.setMinutes(formData.endTime.getMinutes());

      // Validate dates
      if (endDateTime <= startDateTime) {
        throw new Error('Дата окончания должна быть позже даты начала');
      }

      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        categoryId: parseInt(formData.categoryId),
      };

      const response = await apiService.createTask(taskData);
      
      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: '',
          description: '',
          startDate: null,
          startTime: null,
          endDate: null,
          endTime: null,
          categoryId: '',
        });
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/tasks/my');
        }, 2000);
      } else {
        throw new Error(response.message || 'Ошибка при создании задания');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании задания');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <LocalizationProvider 
      dateAdapter={AdapterDateFns} 
      adapterLocale={language === 'ru' ? ru : enUS}
    >
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#2E7D32',
              mb: 3,
              textAlign: 'left',
            }}
          >
            {t('task.create_title')}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('task.create_success')}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Title */}
            <TextField
              fullWidth
              label={t('task.title')}
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              disabled={loading}
            />

            {/* Description */}
            <TextField
              fullWidth
              label={t('task.description')}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              multiline
              rows={4}
              disabled={loading}
            />

            {/* Category */}
            <TextField
              fullWidth
              select
              label={t('task.category')}
              value={formData.categoryId}
              onChange={(e) => handleInputChange('categoryId', e.target.value)}
              required
              disabled={loading || categoriesLoading}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            {categoriesError && (
              <Typography variant="caption" color="error">
                {categoriesError}
              </Typography>
            )}

            {/* Start Date and Time */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <DatePicker
                label={t('task.start_date')}
                value={formData.startDate}
                onChange={(date) => handleInputChange('startDate', date)}
                disabled={loading}
                sx={{ flex: 1 }}
              />
              <TimePicker
                label={t('task.start_time')}
                value={formData.startTime}
                onChange={(time) => handleInputChange('startTime', time)}
                disabled={loading}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* End Date and Time */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <DatePicker
                label={t('task.end_date')}
                value={formData.endDate}
                onChange={(date) => handleInputChange('endDate', date)}
                disabled={loading}
                sx={{ flex: 1 }}
              />
              <TimePicker
                label={t('task.end_time')}
                value={formData.endTime}
                onChange={(time) => handleInputChange('endTime', time)}
                disabled={loading}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: '#4CAF50',
                  minWidth: 120,
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  t('task.create_button')
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default CreateTaskPage;
