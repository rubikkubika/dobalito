// Home page component
import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Work as WorkIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  PhoneAndroid as PhoneIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import FeatureCard from '../components/FeatureCard';
import CategoryList from '../components/CategoryList';
import { getResponsiveValue } from '../utils/helpers';
import { Category } from '../types';
import { useCategories } from '../hooks/useCategories';
import { useUserProfile } from '../hooks/useUserProfile';

const HomePage: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  
  // Мемоизируем язык для бэкенда, чтобы избежать лишних перерендеров
  const backendLanguage = React.useMemo(() => {
    return language === 'ru' ? 'ru' : 'en';
  }, [language]);
  
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories(true, backendLanguage);
  const { fetchUserProfile } = useUserProfile();

  const handleCategoryClick = (category: Category) => {
    // Проверяем токен перед навигацией
    fetchUserProfile();
    navigate(`/executors/${category.name}`);
  };

  const features = [
    {
      title: t('feature.create_tasks'),
      description: t('feature.create_tasks_desc'),
      icon: <WorkIcon />,
      color: '#2196F3', // Blue
      category: t('category.surfing'),
    },
    {
      title: t('feature.find_executors'),
      description: t('feature.find_executors_desc'),
      icon: <SearchIcon />,
      color: '#4CAF50', // Green
      category: t('category.surfing'),
    },
    {
      title: t('feature.profile_management'),
      description: t('feature.profile_management_desc'),
      icon: <PersonIcon />,
      color: '#FF9800', // Orange
      category: t('category.surfing'),
    },
    {
      title: t('feature.rating_system'),
      description: t('feature.rating_system_desc'),
      icon: <StarIcon />,
      color: '#9C27B0', // Purple
      category: t('category.surfing'),
    },
    {
      title: t('feature.secure_payments'),
      description: t('feature.secure_payments_desc'),
      icon: <SecurityIcon />,
      color: '#F44336', // Red
      category: t('category.surfing'),
    },
    {
      title: t('feature.mobile_apps'),
      description: t('feature.mobile_apps_desc'),
      icon: <PhoneIcon />,
      color: '#607D8B', // Blue Grey
      category: t('category.surfing'),
    },
  ];

  // Filter features based on selected category
  const filteredFeatures = features;

  if (state.isLoading) {
    return (
      <Container maxWidth="lg" sx={{ px: 0 }}>
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
    <Container maxWidth="lg" sx={{ px: 0, pt: 2 }}>
      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.error}
        </Alert>
      )}

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
          {/* Welcome Section - matching Flutter design */}
          <Box
            sx={{
              width: '100%',
              mb: getResponsiveValue(2, 3, 4),
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E0E0E0',
              textAlign: 'center',
              p: { xs: 2, sm: 3, md: 4 }
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: '#000000',
                fontSize: getResponsiveValue('1.2rem', '1.5rem', '2rem'),
                mb: getResponsiveValue(1, 2, 3),
                lineHeight: 1.2
              }}
            >
              {t('home.welcome')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#757575',
                fontSize: getResponsiveValue('0.8rem', '0.9rem', '1rem'),
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.5
              }}
            >
              {t('home.subtitle')}
            </Typography>
          </Box>

          {/* Features Grid */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: { xs: 1.5, sm: 2 }, 
            justifyContent: 'flex-start' 
          }}>
            {filteredFeatures.map((feature, index) => (
              <Box key={index} sx={{ 
                width: { 
                  xs: '100%', 
                  sm: '100%', 
                  md: 'calc(50% - 8px)', 
                  lg: 'calc(50% - 8px)', 
                  xl: 'calc(50% - 8px)' 
                } 
              }}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={feature.color}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

    </Container>
  );
};

export default HomePage;
