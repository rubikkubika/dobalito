// Language selector component
import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Language as LanguageIcon, Check as CheckIcon } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: 'ru' | 'en' | 'id') => {
    setLanguage(lang);
    handleClose();
  };

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case 'ru': return '🇷🇺';
      case 'en': return '🇺🇸';
      case 'id': return '🇮🇩';
      default: return '🇷🇺';
    }
  };

  const getCurrentLanguageName = () => {
    switch (language) {
      case 'ru': return t('lang.russian');
      case 'en': return t('lang.english');
      case 'id': return t('lang.indonesian');
      default: return t('lang.russian');
    }
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{
          color: '#FFFFFF',
          textTransform: 'none',
          fontWeight: 600,
          backgroundColor: '#2196F3',
          borderRadius: '8px',
          width: 40,
          height: 40,
          minWidth: 'auto',
          fontSize: '16px',
          border: '2px solid #FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor: '#1976D2',
            transform: 'scale(1.05)',
          },
        }}
      >
        {getLanguageFlag(language)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 10000, // Higher than AppBar z-index
        }}
      >
        <MenuItem onClick={() => handleLanguageChange('ru')}>
          <ListItemIcon>
            {language === 'ru' ? <CheckIcon /> : null}
          </ListItemIcon>
          <ListItemText>
            🇷🇺 {t('lang.russian')}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <ListItemIcon>
            {language === 'en' ? <CheckIcon /> : null}
          </ListItemIcon>
          <ListItemText>
            🇺🇸 {t('lang.english')}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('id')}>
          <ListItemIcon>
            {language === 'id' ? <CheckIcon /> : null}
          </ListItemIcon>
          <ListItemText>
            🇮🇩 {t('lang.indonesian')}
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
