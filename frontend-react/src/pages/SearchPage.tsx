import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Button,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Star as StarIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../hooks/useCategories';
import { Category, Executor } from '../types';
import { apiService } from '../services/apiService';
import CategoryList from '../components/CategoryList';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories(true, t('lang.russian'));
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [executors, setExecutors] = useState<Executor[]>([]);
  const [executorsLoading, setExecutorsLoading] = useState(false);
  const [executorsError, setExecutorsError] = useState<string | null>(null);

  const handleCategoryClick = (category: Category) => {
    if (isMobile) {
      setSelectedCategory(category);
      loadExecutors(category);
    } else {
      navigate(`/executors/${category.name}`);
    }
  };

  const loadExecutors = async (category: Category) => {
    setExecutorsLoading(true);
    setExecutorsError(null);
    try {
      const data = await apiService.getExecutorsByCategory(category.id);
      setExecutors(data);
    } catch (error) {
      console.error('Error loading executors:', error);
      setExecutorsError('Ошибка загрузки исполнителей');
    } finally {
      setExecutorsLoading(false);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (categoriesLoading) {
    return (
      <Container maxWidth="lg" sx={{ px: 0, pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (categoriesError) {
    return (
      <Container maxWidth="lg" sx={{ px: 0, pt: 2 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {categoriesError}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ px: 0, pt: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          {t('nav.search')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isMobile && selectedCategory 
            ? `Исполнители в категории "${selectedCategory.name}"`
            : 'Выберите категорию для поиска исполнителей'
          }
        </Typography>
      </Box>

      {/* Mobile Layout */}
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Selected Category or Categories List */}
          {selectedCategory ? (
            <Box sx={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              border: '1px solid #E0E0E0',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBackToCategories}
                sx={{ flexShrink: 0 }}
              >
                Назад
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ fontSize: '1.5em' }}>{selectedCategory.icon}</span>
                <Typography variant="h6" sx={{ color: selectedCategory.color }}>
                  {selectedCategory.name}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              border: '1px solid #E0E0E0',
              p: 3
            }}>
              <CategoryList
                categories={categories}
                loading={categoriesLoading}
                error={categoriesError}
                onCategoryClick={handleCategoryClick}
                title="Выберите категорию"
              />
            </Box>
          )}

          {/* Executors List */}
          {selectedCategory && (
            <Box sx={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              border: '1px solid #E0E0E0',
              p: 2
            }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Исполнители
              </Typography>
              
              {executorsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                  <CircularProgress />
                </Box>
              ) : executorsError ? (
                <Alert severity="error">{executorsError}</Alert>
              ) : executors.length === 0 ? (
                <Box sx={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '16px', 
                  border: '1px solid #E0E0E0',
                  p: 4,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6" sx={{ color: '#757575', mb: 1 }}>
                    В этой категории пока нет исполнителей
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999999' }}>
                    Попробуйте выбрать другую категорию
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
          )}
        </Box>
      ) : (
        /* Desktop Layout */
        <Box sx={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: '16px', 
          border: '1px solid #E0E0E0',
          p: 3
        }}>
          <CategoryList
            categories={categories}
            loading={categoriesLoading}
            error={categoriesError}
            onCategoryClick={handleCategoryClick}
            title="Выберите категорию"
          />
        </Box>
      )}
    </Container>
  );
};

export default SearchPage;
