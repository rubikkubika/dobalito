import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Divider,
  IconButton,
  Paper,
  Grid,
  Container,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Task as TaskIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  MarkEmailRead as MarkEmailReadIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Category } from '../types';

interface Notification {
  id: string;
  type: 'new_task' | 'task_assigned' | 'task_completed' | 'task_cancelled' | 'executor_responded' | 'payment_received' | 'rating_received';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  taskId?: string;
  executorId?: string;
}

const NotificationsPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  
  // Mock data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'new_task',
      title: 'Новое задание в категории "Серфинг"',
      message: 'Доступно новое задание "Урок серфинга для начинающих"',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      taskId: 'task-1'
    },
    {
      id: '2',
      type: 'executor_responded',
      title: 'Исполнитель откликнулся на ваше задание',
      message: 'Анна Петрова откликнулась на задание "Аренда велосипеда"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      taskId: 'task-2',
      executorId: 'executor-1'
    },
    {
      id: '3',
      type: 'task_completed',
      title: 'Задание завершено',
      message: 'Задание "Экскурсия по городу" успешно выполнено',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      taskId: 'task-3'
    },
    {
      id: '4',
      type: 'payment_received',
      title: 'Платеж получен',
      message: 'Получен платеж 5000 руб. за задание "Фотосессия"',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      taskId: 'task-4'
    },
    {
      id: '5',
      type: 'rating_received',
      title: 'Получен рейтинг',
      message: 'Вы получили оценку 5 звезд за выполнение задания',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: true,
      taskId: 'task-5'
    }
  ]);

  // Mock categories data
  useEffect(() => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Серфинг', color: '#4CAF50' },
      { id: 2, name: 'Аренда байка', color: '#2196F3' },
      { id: 3, name: 'Туризм', color: '#FF9800' },
    ];
    setAllCategories(mockCategories);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_task':
        return <TaskIcon sx={{ color: '#4CAF50' }} />;
      case 'task_assigned':
        return <AssignmentIcon sx={{ color: '#2196F3' }} />;
      case 'task_completed':
        return <CheckCircleIcon sx={{ color: '#4CAF50' }} />;
      case 'task_cancelled':
        return <CancelIcon sx={{ color: '#f44336' }} />;
      case 'executor_responded':
        return <PersonIcon sx={{ color: '#FF9800' }} />;
      case 'payment_received':
        return <PaymentIcon sx={{ color: '#4CAF50' }} />;
      case 'rating_received':
        return <StarIcon sx={{ color: '#FFC107' }} />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getNotificationTypeText = (type: Notification['type']) => {
    switch (type) {
      case 'new_task':
        return t('notifications.new_task');
      case 'task_assigned':
        return t('notifications.task_assigned');
      case 'task_completed':
        return t('notifications.task_completed');
      case 'task_cancelled':
        return t('notifications.task_cancelled');
      case 'executor_responded':
        return t('notifications.executor_responded');
      case 'payment_received':
        return t('notifications.payment_received');
      case 'rating_received':
        return t('notifications.rating_received');
      default:
        return '';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t('notifications.minutes')} ${t('notifications.time_ago')}`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${t('notifications.hours')} ${t('notifications.time_ago')}`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} ${t('notifications.days')} ${t('notifications.time_ago')}`;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMyTasksClick = () => {
    navigate('/tasks');
  };

  const handleExecutionsClick = () => {
    navigate('/executions');
  };

  const handleCategoryClick = (category: Category) => {
    navigate(`/executors/${category.name}`);
  };

  const handleCreateTask = () => {
    navigate('/tasks/create');
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
          {/* Create Task Button */}
          <Button
            variant="contained"
            onClick={handleCreateTask}
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
          
          {/* Unified Sidebar */}
          <Sidebar
            userCategories={user?.categories}
            allCategories={allCategories}
            onMyTasksClick={handleMyTasksClick}
            onExecutionsClick={handleExecutionsClick}
            onCategoryClick={handleCategoryClick}
            activeItem="notifications"
          />
        </Box>

        {/* Main Content - Notifications */}
        <Box sx={{ 
          flex: 1,
          width: { xs: '100%', md: 'auto' }
        }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #E0E0E0',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
                pb: 2,
                borderBottom: '1px solid #E0E0E0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <NotificationsIcon sx={{ color: '#4CAF50', fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {t('notifications.title')}
                </Typography>
                {unreadCount > 0 && (
                  <Chip 
                    label={unreadCount} 
                    color="error" 
                    size="small"
                  />
                )}
              </Box>
              {unreadCount > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<MarkEmailReadIcon />}
                  onClick={markAllAsRead}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      borderColor: '#4CAF50',
                    },
                  }}
                >
                  {t('notifications.mark_all_read')}
                </Button>
              )}
            </Box>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                textAlign: 'center',
              }}
            >
              <NotificationsIcon sx={{ fontSize: 64, color: '#E0E0E0', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                {t('notifications.empty')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Здесь будут отображаться ваши уведомления
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => markAsRead(notification.id)}
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        mb: 1,
                        backgroundColor: notification.isRead ? 'transparent' : '#F3F9FF',
                        borderLeft: notification.isRead ? 'none' : '4px solid #4CAF50',
                        '&:hover': {
                          backgroundColor: notification.isRead ? '#F5F5F5' : '#E8F5E8',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 48 }}>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: notification.isRead ? 500 : 600,
                                color: notification.isRead ? '#666' : '#000',
                              }}
                            >
                              {notification.title}
                            </Typography>
                            {!notification.isRead && (
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: '#4CAF50',
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Chip
                                label={getNotificationTypeText(notification.type)}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: '0.75rem',
                                  height: 24,
                                  '& .MuiChip-label': {
                                    px: 1,
                                  },
                                }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: '0.75rem' }}
                              >
                                {formatTimeAgo(notification.timestamp)}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < notifications.length - 1 && <Divider sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default NotificationsPage;
