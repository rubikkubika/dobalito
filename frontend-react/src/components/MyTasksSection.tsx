import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';


interface MyTasksSectionProps {
  className?: string;
  onMyTasksClick?: () => void;
}

const MyTasksSection: React.FC<MyTasksSectionProps> = ({ 
  className, 
  onMyTasksClick
}) => {
  const { t } = useLanguage();


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
      <Typography 
        variant="h6" 
        onClick={onMyTasksClick}
        sx={{ 
          mb: 2, 
          fontWeight: 600, 
          color: '#000000',
          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
          cursor: 'pointer',
          '&:hover': {
            color: '#2196F3',
            textDecoration: 'underline'
          }
        }}
      >
        {t('home.my_tasks')}
      </Typography>
    </Box>
  );
};

export default MyTasksSection;
