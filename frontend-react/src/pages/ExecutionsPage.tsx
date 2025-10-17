import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Button,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { Task, Category } from '../types';
import { useCategories } from '../hooks/useCategories';
import Sidebar from '../components/Sidebar';

const ExecutionsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const backendLanguage = React.useMemo(() => {
    return language === 'ru' ? 'ru' : 'en';
  }, [language]);

  const { categories, loading: categoriesLoading } = useCategories(true, backendLanguage);

  useEffect(() => {
    if (user?.categories && user.categories.length > 0) {
      // Выбираем первую категорию по умолчанию
      setSelectedCategory(user.categories[0]);
    }
  }, [user]);

  useEffect(() => {
    if (selectedCategory && user) {
      loadAvailableTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, user?.id]);

  const loadAvailableTasks = async () => {
    if (!selectedCategory) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Загружаем ВСЕ задания данной категории
      const response = await apiService.getTasksByCategory(selectedCategory.id);
      
      if (response.success) {
        // Фильтруем задания: только OPEN и не свои
        const filteredTasks = (response.tasks || []).filter(
          (task: Task) => 
            task.status === 'OPEN' &&
            task.creator.id !== user?.id  // Не показываем свои задания
        );
        setTasks(filteredTasks);
      } else {
        setError(response.message || 'Ошибка при загрузке заданий');
      }
    } catch (err: any) {
      console.error('Error loading tasks:', err);
      setError('Не удалось загрузить задания');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCategoryClick = (category: Category) => {
    navigate(`/tasks?category=${encodeURIComponent(category.name)}`);
  };

  if (!user?.categories || user.categories.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="info">
            {t('executor.no_categories')}
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 2, sm: 3 }, 
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Left Sidebar */}
        <Box sx={{ 
          minWidth: { md: 250 }, 
          width: { md: 'auto' },
          display: { xs: 'none', md: 'block' }
        }}>
          {/* Create Task Button */}
          {isAuthenticated && (
            <Button
              variant="contained"
              onClick={() => navigate('/tasks/create')}
              startIcon={<WorkIcon />}
              sx={{
                width: '100%',
                mb: 2,
                backgroundColor: '#2196F3',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1976D2',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {t('home.create_task')}
            </Button>
          )}
          
          {/* Unified Sidebar */}
          <Sidebar
            userCategories={user?.categories}
            allCategories={categories}
            onMyTasksClick={() => navigate('/tasks')}
            onExecutionsClick={() => navigate('/executions')}
            onCategoryClick={handleCategoryClick}
          />
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          width: { xs: '100%', md: 'auto' }
        }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
          {t('executor.available_tasks')}
        </Typography>

        {/* Category Filters */}
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {user.categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory?.id === category.id ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setSelectedCategory(category)}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 2,
                fontSize: '0.85rem',
              }}
            >
              {category.name}
            </Button>
          ))}
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : tasks.length === 0 ? (
          <Alert severity="info">
            {t('executor.no_tasks')} "{selectedCategory?.name}"
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tasks.map((task) => (
              <Card key={task.id} sx={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {task.title}
                    </Typography>
                    <Chip
                      label={t('task.status.open')}
                      color="success"
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {task.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={`${formatDate(task.startDate)} - ${formatDate(task.endDate)}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={task.category.name}
                      size="small"
                      sx={{ backgroundColor: `${task.category.color}20`, color: task.category.color }}
                    />
                  </Box>

                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {t('executor.customer')}: {task.creator.name}
                    </Typography>
                    <Button variant="contained" size="small">
                      {t('executor.respond')}
                    </Button>
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

export default ExecutionsPage;

