import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { Category } from '../types';

interface ExecutorSectionProps {
  className?: string;
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
  activeCategory?: string;
}

const ExecutorSection: React.FC<ExecutorSectionProps> = ({ 
  className, 
  categories,
  onCategoryClick,
  activeCategory
}) => {
  const { t } = useLanguage();

  if (!categories || categories.length === 0) {
    return null;
  }

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
        sx={{ 
          mb: 2, 
          fontWeight: 600, 
          color: '#000000',
          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
        }}
      >
        {t('executor.executions')}
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1,
      }}>
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <Box
              key={category.id}
              onClick={() => onCategoryClick?.(category)}
              sx={{
                p: 1.5,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: isActive ? `${category.color}20` : 'transparent',
                color: isActive ? category.color : '#000000',
                fontWeight: isActive ? 600 : 400,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: isActive ? `2px solid ${category.color}` : `1px solid ${category.color}20`,
                '&:hover': {
                  backgroundColor: `${category.color}10`,
                  borderColor: category.color,
                  transform: 'translateY(-1px)',
                }
              }}
            >
              <span>{category.name}</span>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ExecutorSection;

