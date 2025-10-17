// Layout component with Airbnb-style navigation
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Badge,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import DobalitoLogo from './DobalitoLogo';
import LanguageSelector from './LanguageSelector';
import BottomNavigation from './BottomNavigation';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideSidebar = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };





  return (
    <>
      {/* Top Bar - Desktop */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#000000',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: { xs: 120, sm: 70, md: 80 },
          zIndex: 9999, // Increased z-index
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '100vw',
          position: 'fixed', // Explicitly set position
          display: { xs: 'none', sm: 'block' }, // Hide on mobile
        }}
      >
        <Toolbar sx={{ 
          height: { xs: 120, sm: 70, md: 80 }, 
          px: { xs: 1, sm: 2, md: 3 }, 
          justifyContent: 'center',
          minHeight: { xs: 120, sm: 70, md: 80 },
          maxWidth: '100vw',
          overflow: 'hidden'
        }}>
          {/* Centered Content - Airbnb style */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 2, md: 3 }, 
            maxWidth: '1200px', 
            width: '100%',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            overflow: 'hidden',
            justifyContent: 'space-between'
          }}>
            {/* Left side - Logo */}
            <Box 
              onClick={handleLogoClick}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 0.5, sm: 1, md: 1.5 },
                minWidth: { xs: 'auto', sm: 'auto' },
                flexShrink: 0,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                }
              }}
            >
              <DobalitoLogo />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#4CAF50',
                  fontSize: { xs: '14px', sm: '18px', md: '22px' },
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                doBalito
              </Typography>
            </Box>

            {/* Right side - Actions */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1 },
              order: { xs: 2, sm: 3 },
              flexShrink: 0,
              marginLeft: 'auto'
            }}>
              {/* Language Selector */}
              <LanguageSelector />

              {/* Login/Register Button */}
              {!isAuthenticated ? (
                <Button
                  variant="outlined"
                  onClick={handleLoginClick}
                  sx={{
                    borderRadius: '20px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: { xs: '12px', sm: '14px' },
                    px: { xs: 1.5, sm: 2 },
                    py: 0.5,
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    '&:hover': {
                      backgroundColor: '#4CAF50',
                      color: '#FFFFFF',
                      borderColor: '#4CAF50',
                    },
                  }}
                >
                  {t('nav.login_register')}
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {/* Notifications Bell */}
                  <IconButton
                    sx={{
                      color: '#757575',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                    onClick={handleNotificationsClick}
                  >
                    <Badge badgeContent={3} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#4CAF50', 
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => navigate('/profile')}
                  >
                    {user?.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: { xs: '12px', sm: '14px' },
                      px: { xs: 1.5, sm: 2 },
                      py: 0.5,
                      borderColor: '#f44336',
                      color: '#f44336',
                      '&:hover': {
                        backgroundColor: '#f44336',
                        color: '#FFFFFF',
                        borderColor: '#f44336',
                      },
                    }}
                  >
                    {t('nav.logout')}
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#000000',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: 60,
          zIndex: 9999,
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '100vw',
          position: 'fixed',
          display: { xs: 'block', sm: 'none' }, // Show only on mobile
        }}
      >
        <Toolbar sx={{ 
          height: 60, 
          px: 2, 
          justifyContent: 'space-between',
          minHeight: 60,
        }}>
          {/* Mobile Logo */}
          <Box 
            onClick={handleLogoClick}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              }
            }}
          >
            <DobalitoLogo />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#4CAF50',
                fontSize: '18px',
                letterSpacing: '0.5px',
              }}
            >
              doBalito
            </Typography>
          </Box>

          {/* Mobile Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageSelector />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#FAFAFA',
          overflow: 'auto',
          paddingTop: { xs: '70px', sm: '90px' }, // Возвращаем оригинальный паддинг
          paddingBottom: { xs: '70px', sm: 0 }, // Оставляем только нижний паддинг для мобильных
        }}
      >
        {children}
      </Box>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </>
  );
};

export default Layout;
