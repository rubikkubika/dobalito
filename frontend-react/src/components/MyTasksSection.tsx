import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

type TaskFilterType = 'open' | 'closed' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

interface MyTasksSectionProps {
  className?: string;
  onTaskTypeClick?: (type: TaskFilterType) => void;
  activeTaskType?: TaskFilterType;
}

const MyTasksSection: React.FC<MyTasksSectionProps> = ({ 
  className, 
  onTaskTypeClick,
  activeTaskType 
}) => {
  const { t } = useLanguage();

  const taskTypes = [
    { id: 'OPEN', name: t('task.status.open'), color: '#4CAF50', icon: '📋' },
    { id: 'IN_PROGRESS', name: t('task.status.in_progress'), color: '#FF9800', icon: '⏳' },
    { id: 'COMPLETED', name: t('task.status.completed'), color: '#2196F3', icon: '✅' },
    { id: 'CANCELLED', name: t('task.status.cancelled'), color: '#F44336', icon: '❌' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF', 
        borderRadius: '16px', 
        border: '1px solid #E0E0E0',
        p: 2,
        ...className,
      }}
    >
      <Typography variant="h6" sx={{ 
        mb: 2, 
        fontWeight: 600, 
        color: '#000000',
        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' }
      }}>
        {t('home.my_tasks')}
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'row', sm: 'column' }, 
        gap: 1, 
        flexWrap: { xs: 'wrap', sm: 'nowrap' } 
      }}>
        {taskTypes.map((taskType) => {
          const isActive = activeTaskType === taskType.id;
          return (
            <Box
              key={taskType.id}
              onClick={() => onTaskTypeClick?.(taskType.id as TaskFilterType)}
              sx={{
                p: { xs: 1, sm: 1.5 },
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: isActive ? `${taskType.color}20` : 'transparent',
                color: isActive ? taskType.color : '#000000',
                fontWeight: isActive ? 600 : 400,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                textAlign: { xs: 'center', sm: 'left' },
                minWidth: { xs: 'calc(50% - 4px)', sm: 'auto' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: isActive ? `2px solid ${taskType.color}` : `1px solid ${taskType.color}20`,
                '&:hover': {
                  backgroundColor: `${taskType.color}10`,
                  borderColor: taskType.color,
                  transform: 'translateY(-1px)',
                }
              }}
            >
              <span style={{ fontSize: '1.2em' }}>{taskType.icon}</span>
              <span>{taskType.name}</span>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MyTasksSection;
