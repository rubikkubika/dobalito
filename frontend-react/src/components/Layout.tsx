// Layout component with Airbnb-style navigation
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  Divider,
} from '@mui/material';
import {
  NotificationsOutlined as NotificationsIcon,
  HelpOutline as HelpIcon,
  PersonOutline as PersonIcon,
  DesignServices as DesignIcon,
  SettingsOutlined as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import DobalitoLogo from './DobalitoLogo';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../hooks/useCategories';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [burgerAnchorEl, setBurgerAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const getBackendLanguage = () => {
    return language === 'ru' ? 'ru' : 'en';
  };
  
  const { categories, loading: categoriesLoading } = useCategories(true, getBackendLanguage());

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleBurgerClick = (event: React.MouseEvent<HTMLElement>) => {
    setBurgerAnchorEl(event.currentTarget);
  };

  const handleBurgerClose = () => {
    setBurgerAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
      // You can navigate to search results or implement search functionality
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };


  const handleMenuAction = (action: string) => {
    handleProfileClose();
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'designs':
        navigate('/designs');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        // Handle logout
        break;
    }
  };



  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Top Bar - Airbnb style */}
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
            {/* Burger Menu Button */}
            <IconButton
              onClick={handleBurgerClick}
              sx={{
                width: { xs: 35, sm: 40 },
                height: { xs: 35, sm: 40 },
                backgroundColor: '#F5F5F5',
                borderRadius: '8px',
                marginRight: 1,
                '&:hover': {
                  backgroundColor: '#EEEEEE',
                },
              }}
            >
              <MenuIcon sx={{ fontSize: { xs: 16, sm: 20 }, color: '#757575' }} />
            </IconButton>

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

            {/* Center - Search Bar */}
            <Box sx={{ 
              flexGrow: 1, 
              order: { xs: 3, sm: 2 },
              width: '100%',
              minWidth: 0
            }}>
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  fullWidth
                  placeholder="Поиск заданий, исполнителей..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F5F5F5',
                      borderRadius: '25px',
                      height: '48px',
                      '& fieldset': {
                        border: '2px solid #E0E0E0',
                      },
                      '&:hover fieldset': {
                        border: '2px solid #BDBDBD',
                      },
                      '&.Mui-focused fieldset': {
                        border: '2px solid #4CAF50',
                      },
                    },
                    '& .MuiInputBase-input': {
                      padding: '12px 16px',
                      fontSize: '16px',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          type="submit"
                          sx={{
                            backgroundColor: '#4CAF50',
                            color: '#FFFFFF',
                            borderRadius: '50%',
                            minWidth: '40px',
                            height: '40px',
                            width: '40px',
                            '&:hover': {
                              backgroundColor: '#388E3C',
                            },
                          }}
                        >
                          <SearchIcon sx={{ fontSize: 20 }} />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
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

              {/* Notifications - Hidden on mobile */}
              <IconButton
                sx={{
                  width: { xs: 35, sm: 40 },
                  height: { xs: 35, sm: 40 },
                  backgroundColor: '#F5F5F5',
                  borderRadius: '20px',
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': {
                    backgroundColor: '#EEEEEE',
                  },
                }}
              >
                <NotificationsIcon sx={{ fontSize: { xs: 16, sm: 20 }, color: '#757575' }} />
              </IconButton>

              {/* Help - Hidden on mobile */}
              <IconButton
                sx={{
                  width: { xs: 35, sm: 40 },
                  height: { xs: 35, sm: 40 },
                  backgroundColor: '#F5F5F5',
                  borderRadius: '20px',
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': {
                    backgroundColor: '#EEEEEE',
                  },
                }}
              >
                <HelpIcon sx={{ fontSize: { xs: 16, sm: 20 }, color: '#757575' }} />
              </IconButton>

              {/* Profile Circle */}
              <IconButton
                onClick={handleProfileClick}
                sx={{
                  width: { xs: 35, sm: 40 },
                  height: { xs: 35, sm: 40 },
                  backgroundColor: '#4CAF50',
                  borderRadius: '20px',
                  '&:hover': {
                    backgroundColor: '#388E3C',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: { xs: '14px', sm: '16px' },
                  }}
                >
                  A
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>


      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          zIndex: 10000, // Higher than AppBar z-index
        }}
        disableAutoFocusItem
        disableEnforceFocus
        disableRestoreFocus
      >
        <MenuItem onClick={() => handleMenuAction('profile')}>
          <ListItemIcon>
            <PersonIcon sx={{ fontSize: 20, color: '#757575' }} />
          </ListItemIcon>
          <ListItemText>{t('nav.profile')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('designs')}>
          <ListItemIcon>
            <DesignIcon sx={{ fontSize: 20, color: '#757575' }} />
          </ListItemIcon>
          <ListItemText>{t('nav.designs')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('settings')}>
          <ListItemIcon>
            <SettingsIcon sx={{ fontSize: 20, color: '#757575' }} />
          </ListItemIcon>
          <ListItemText>{t('nav.settings')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('logout')}>
          <ListItemIcon>
            <LogoutIcon sx={{ fontSize: 20, color: '#F44336' }} />
          </ListItemIcon>
          <ListItemText sx={{ color: '#F44336' }}>Выйти</ListItemText>
        </MenuItem>
      </Menu>

      {/* Sidebar with Categories */}
      <Drawer
        anchor="left"
        open={Boolean(burgerAnchorEl)}
        onClose={handleBurgerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            paddingTop: 2,
            paddingBottom: 2,
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
            {t('home.categories')}
          </Typography>
          
          {categoriesLoading ? (
            <Typography>Загрузка...</Typography>
          ) : (
            <List>
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => {
                    handleBurgerClose();
                    // TODO: Navigate to category page or filter by category
                    console.log('Selected category:', category.name);
                  }}
                  sx={{
                    borderRadius: 1,
                    marginBottom: 0.5,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#FAFAFA',
          overflow: 'auto',
          paddingTop: '90px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
