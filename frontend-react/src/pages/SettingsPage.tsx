// Settings page component
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import { getResponsiveValue } from '../utils/helpers';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(16);
  const [language, setLanguage] = React.useState('ru');

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', {
      darkMode,
      notifications,
      fontSize,
      language,
    });
  };

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontSize: getResponsiveValue('1.5rem', '1.8rem', '2rem'),
          fontWeight: 600,
          textAlign: 'center',
          mb: 4,
        }}
      >
        Настройки
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper elevation={2} sx={{ p: getResponsiveValue(3, 4, 5) }}>
            <Typography variant="h6" gutterBottom>
              Внешний вид
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              }
              label="Темная тема"
            />
            
            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>
                Размер шрифта: {fontSize}px
              </Typography>
              <Slider
                value={fontSize}
                onChange={(_, value) => setFontSize(value as number)}
                min={12}
                max={24}
                step={1}
                marks={[
                  { value: 12, label: '12px' },
                  { value: 16, label: '16px' },
                  { value: 20, label: '20px' },
                  { value: 24, label: '24px' },
                ]}
              />
            </Box>
          </Paper>

        <Paper elevation={2} sx={{ p: getResponsiveValue(3, 4, 5) }}>
          <Typography variant="h6" gutterBottom>
            Уведомления
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            }
            label="Включить уведомления"
          />
        </Paper>

        <Paper elevation={2} sx={{ p: getResponsiveValue(3, 4, 5) }}>
          <Typography variant="h6" gutterBottom>
            Язык
          </Typography>
          
          <FormControl fullWidth>
            <InputLabel>Язык интерфейса</InputLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              label="Язык интерфейса"
            >
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: getResponsiveValue('1rem', '1.1rem', '1.2rem'),
              }}
            >
              Сохранить настройки
            </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SettingsPage;
