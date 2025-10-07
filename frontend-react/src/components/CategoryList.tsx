import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  onCategoryClick: (category: Category) => void;
  title?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  loading,
  error,
  onCategoryClick,
  title = 'Категории'
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ fontSize: '0.8rem' }}>
        {error}
      </Alert>
    );
  }

  if (categories.length === 0) {
    return (
      <Alert severity="info" sx={{ fontSize: '0.8rem' }}>
        Категории не найдены
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ 
        mb: 2, 
        fontWeight: 600, 
        color: '#000000',
        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' }
      }}>
        {title}
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'row', sm: 'column' }, 
        gap: 1, 
        flexWrap: { xs: 'wrap', sm: 'nowrap' } 
      }}>
        {categories.map((category) => (
          <Box
            key={category.id}
            onClick={() => onCategoryClick(category)}
            sx={{
              p: { xs: 1, sm: 1.5 },
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: 'transparent',
              color: '#000000',
              fontWeight: 400,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: { xs: 'center', sm: 'left' },
              minWidth: { xs: 'calc(50% - 4px)', sm: 'auto' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              border: `1px solid ${category.color}20`,
              '&:hover': {
                backgroundColor: `${category.color}10`,
                borderColor: category.color,
                transform: 'translateY(-1px)',
              }
            }}
          >
            <span style={{ fontSize: '1.2em' }}>{category.icon}</span>
            <span>{category.name}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryList;
