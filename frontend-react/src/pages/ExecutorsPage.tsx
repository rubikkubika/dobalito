// Executors page component
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Star as StarIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../services/apiService';
import { getResponsiveValue } from '../utils/helpers';
import { useCategories } from '../hooks/useCategories';

const ExecutorsPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { category } = useParams<{ category: string }>();
  const [executors, setExecutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getBackendLanguage = () => {
    return language === 'ru' ? 'ru' : 'en';
  };
  
  const { categories, loading: categoriesLoading } = useCategories(true, getBackendLanguage());

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/executors/${categoryName}`);
  };

  useEffect(() => {
    const fetchExecutors = async () => {
      setLoading(true);
      try {
        // Здесь будет API вызов для получения исполнителей по категории
        // const data = await apiService.getExecutorsByCategory(category);
        // setExecutors(data);
        
        // Пока что пустой массив
        setExecutors([]);
      } catch (error) {
        console.error('Error fetching executors:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchExecutors();
    }
  }, [category]);

  const handleBackClick = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: getResponsiveValue(2, 3, 4) }}>
        {/* Two-column layout */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Categories Sidebar */}
          <Box sx={{ width: 250, flexShrink: 0 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                mb: 2,
                fontSize: getResponsiveValue('1rem', '1.2rem', '1.4rem'),
                fontWeight: 600,
                color: '#000000',
              }}
            >
              {t('home.categories')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {categoriesLoading ? (
                <Typography>Загрузка категорий...</Typography>
              ) : (
                categories.map((categoryItem) => (
                  <Box
                    key={categoryItem.id}
                    onClick={() => handleCategoryClick(categoryItem.name)}
                    sx={{
                      p: 2,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: category === categoryItem.name ? '#E3F2FD' : 'transparent',
                      color: category === categoryItem.name ? '#1976D2' : '#000000',
                      fontWeight: category === categoryItem.name ? 600 : 400,
                      border: category === categoryItem.name ? '1px solid #1976D2' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#F5F5F5',
                      },
                    }}
                  >
                    {categoryItem.name}
                  </Box>
                ))
              )}
            </Box>
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Button
                variant="outlined"
                onClick={handleBackClick}
                startIcon={<ArrowBackIcon />}
                sx={{
                  mr: 2,
                  borderColor: '#E0E0E0',
                  color: '#757575',
                  '&:hover': {
                    borderColor: '#2196F3',
                    color: '#2196F3',
                  },
                }}
              >
                {t('executors.back')}
              </Button>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontSize: getResponsiveValue('1.5rem', '2rem', '2.5rem'),
                  fontWeight: 600,
                  color: '#000000',
                }}
              >
                {t('executors.title')} "{category}"
              </Typography>
            </Box>

            {/* Executors List */}
            {executors.length === 0 ? (
              <Box sx={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '16px', 
                border: '1px solid #E0E0E0',
                p: 4,
                textAlign: 'center'
              }}>
                <Typography variant="h6" sx={{ color: '#757575', mb: 1 }}>
                  {t('executors.empty')}
                </Typography>
                <Typography variant="body2" sx={{ color: '#999999' }}>
                  {t('executors.empty_desc')}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {executors.map((executor, index) => (
                  <Card key={index} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 8px)' } }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 2, bgcolor: '#2196F3' }}>
                          {executor.name?.charAt(0) || 'E'}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" component="h3">
                            {executor.name || 'Исполнитель'}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ fontSize: 16, color: '#FFC107', mr: 0.5 }} />
                            <Typography variant="body2" sx={{ color: '#757575' }}>
                              {executor.rating || 'Нет рейтинга'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 2 }}>
                        {executor.description || 'Описание отсутствует'}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {executor.skills?.map((skill: string, skillIndex: number) => (
                          <Chip key={skillIndex} label={skill} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ExecutorsPage;
