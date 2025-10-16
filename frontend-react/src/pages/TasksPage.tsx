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
  Pagination,
  Button,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Category as CategoryIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { Task, Category } from '../types';
import CategoryList from '../components/CategoryList';
import MyTasksSection from '../components/MyTasksSection';
import { useCategories } from '../hooks/useCategories';

type TaskFilterType = 'open' | 'closed' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

const TasksPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskType = (searchParams.get('type') || 'open') as TaskFilterType;
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Мемоизируем язык для бэкенда
  const backendLanguage = React.useMemo(() => {
    return language === 'ru' ? 'ru' : 'en';
  }, [language]);
  
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories(true, backendLanguage);

  useEffect(() => {
    loadTasks();
  }, [page, taskType]);

  const handleCategoryClick = (category: Category) => {
    navigate(`/executors/${category.name}`);
  };

  const handleStatusClick = (status: TaskFilterType) => {
    setPage(0); // Reset page when switching status
    navigate(`/tasks?type=${status}`);
  };

  const handleCreateTaskClick = () => {
    navigate('/tasks/create');
  };

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      // Check if it's a specific status or grouped filter
      if (taskType === 'open') {
        response = await apiService.getMyOpenTasks(page, 10, 'createdAt', 'desc');
      } else if (taskType === 'closed') {
        response = await apiService.getMyClosedTasks(page, 10, 'createdAt', 'desc');
      } else {
        // For specific status (OPEN, IN_PROGRESS, COMPLETED, CANCELLED)
        response = await apiService.getMyTasksByStatus(taskType, page, 10, 'createdAt', 'desc');
      }
      
      if (response.success) {
        setTasks(response.tasks || []);
        setTotalPages(response.totalPages || 0);
        setTotalElements(response.totalElements || 0);
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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1); // MUI Pagination uses 1-based index
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'info';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    return t(`task.status.${status.toLowerCase()}`);
  };

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
          {/* My Tasks Section - Only for authenticated users */}
          {isAuthenticated && (
            <Box sx={{ mb: 2 }}>
              {/* Create Task Button */}
              <Button
                variant="contained"
                onClick={handleCreateTaskClick}
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
              
              <MyTasksSection 
                onTaskTypeClick={handleStatusClick}
                activeTaskType={taskType}
              />
            </Box>
          )}
          
          {/* Categories Sidebar */}
          <Box sx={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '16px', 
            border: '1px solid #E0E0E0',
            p: 2
          }}>
            <CategoryList
              categories={categories}
              loading={categoriesLoading}
              error={categoriesError}
              onCategoryClick={handleCategoryClick}
              title={t('home.categories')}
            />
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          width: { xs: '100%', md: 'auto' }
        }}>
          {/* Status Filter Buttons - For all screen sizes */}
          <Box sx={{ 
            mb: 3,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}>
            <Button
              variant={taskType === 'open' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleStatusClick('open')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 2,
                fontSize: '0.85rem',
              }}
            >
              {t('task.all_tasks')}
            </Button>
            <Button
              variant={taskType === 'OPEN' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleStatusClick('OPEN')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 2,
                fontSize: '0.85rem',
              }}
            >
              {t('task.status.open')}
            </Button>
            <Button
              variant={taskType === 'IN_PROGRESS' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleStatusClick('IN_PROGRESS')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 2,
                fontSize: '0.85rem',
              }}
            >
              {t('task.status.in_progress')}
            </Button>
            <Button
              variant={taskType === 'COMPLETED' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleStatusClick('COMPLETED')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 2,
                fontSize: '0.85rem',
              }}
            >
              {t('task.status.completed')}
            </Button>
            <Button
              variant={taskType === 'CANCELLED' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleStatusClick('CANCELLED')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 2,
                fontSize: '0.85rem',
              }}
            >
              {t('task.status.cancelled')}
            </Button>
          </Box>

          {/* Loading */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error */}
          {error && !loading && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Empty state */}
          {!loading && !error && tasks.length === 0 && (
            <Alert severity="info">
              {t('task.no_open_tasks')}
            </Alert>
          )}

          {/* Tasks list */}
          {!loading && !error && tasks.length > 0 && (
            <>
              <Box sx={{ mb: 3 }}>
                {tasks.map((task) => (
                  <Card 
                    key={task.id} 
                    sx={{ 
                      mb: 2,
                      '&:hover': {
                        boxShadow: 3,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      {/* Task header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {task.title}
                        </Typography>
                        <Chip 
                          label={getStatusText(task.status)} 
                          color={getStatusColor(task.status) as any}
                          size="small"
                        />
                      </Box>

                      {/* Task description */}
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 2 }}
                      >
                        {task.description}
                      </Typography>

                      {/* Task metadata */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        {/* Category */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CategoryIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {task.category.name}
                          </Typography>
                        </Box>

                        {/* Date */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(task.startDate)} - {formatDate(task.endDate)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Created date */}
                      <Typography variant="caption" color="text.secondary">
                        Создано: {formatDate(task.createdAt)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page + 1} 
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default TasksPage;

