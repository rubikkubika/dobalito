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
import CategoryList from '../components/CategoryList';

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

  const handleCategoryClick = (category: any) => {
    navigate(`/executors/${category.name}`);
  };

  useEffect(() => {
    const fetchExecutors = async () => {
      setLoading(true);
      try {
        if (category) {
          // Найти ID категории по имени
          const selectedCategory = categories.find(cat => cat.name === category);
          if (selectedCategory) {
            const data = await apiService.getExecutorsByCategory(selectedCategory.id);
            setExecutors(data);
          } else {
            // Если категория не найдена, показываем пустой список
            setExecutors([]);
          }
        } else {
          // Если категория не указана, получаем всех исполнителей
          const data = await apiService.getExecutors();
          setExecutors(data);
        }
      } catch (error) {
        console.error('Error fetching executors:', error);
        // При ошибке показываем пустой список
        setExecutors([]);
      } finally {
        setLoading(false);
      }
    };

    if (!categoriesLoading) {
      fetchExecutors();
    }
  }, [category, categories, categoriesLoading]);

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
    <Container maxWidth="lg" sx={{ px: 0, pt: 2 }}>
      {/* Two-column layout */}
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 2, sm: 3 }, 
        alignItems: 'flex-start',
        flexDirection: 'row' // Всегда горизонтально
      }}>
        {/* Categories Sidebar */}
        <Box sx={{ 
          minWidth: { xs: 180, sm: 200, md: 250 }, 
          width: { xs: 180, sm: 200, md: 250 },
          backgroundColor: '#FFFFFF', 
          borderRadius: '16px', 
          border: '1px solid #E0E0E0',
          p: 2,
          flexShrink: 0
        }}>
            <CategoryList
              categories={categories}
              loading={categoriesLoading}
              error={null}
              onCategoryClick={handleCategoryClick}
              title={t('home.categories')}
              activeCategory={category}
            />
          </Box>

          {/* Main Content */}
          <Box sx={{ 
            flex: 1,
            minWidth: 0 // Позволяет контенту сжиматься
          }}>
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
                variant="h5"
                component="h1"
                sx={{
                  fontSize: getResponsiveValue('1.2rem', '1.5rem', '1.8rem'),
                  fontWeight: 600,
                  color: '#000000',
                }}
              >
                {category ? `${t('executors.title')} "${category}"` : t('executors.title')}
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
                        <Avatar 
                          src={executor.avatar ? (executor.avatar.startsWith('http') ? executor.avatar : `${apiService.getApiBaseUrl()}${executor.avatar}`) : undefined}
                          sx={{ 
                            mr: 2, 
                            bgcolor: '#2196F3',
                            width: 48,
                            height: 48
                          }}
                        >
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
    </Container>
  );
};

export default ExecutorsPage;
