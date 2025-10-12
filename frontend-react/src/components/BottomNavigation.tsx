import React from 'react';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Home, Search, Person } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const getCurrentValue = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 0;
    if (path.startsWith('/search')) return 1;
    if (path.startsWith('/profile')) return 2;
    return 0;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/search');
        break;
      case 2:
        navigate('/profile');
        break;
    }
  };

  return (
    <Box
      sx={{
        display: { xs: 'block', sm: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E0E0E0',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <MuiBottomNavigation
        value={getCurrentValue()}
        onChange={handleChange}
        showLabels
        sx={{
          '& .MuiBottomNavigationAction-root': {
            color: '#757575',
            '&.Mui-selected': {
              color: '#4CAF50',
            },
          },
        }}
      >
        <BottomNavigationAction
          label={t('nav.home')}
          icon={<Home />}
        />
        <BottomNavigationAction
          label={t('nav.search')}
          icon={<Search />}
        />
        <BottomNavigationAction
          label={t('nav.profile')}
          icon={<Person />}
        />
      </MuiBottomNavigation>
    </Box>
  );
};

export default BottomNavigation;
