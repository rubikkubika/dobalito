// Designs page component
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { getResponsiveValue } from '../utils/helpers';

const DesignsPage: React.FC = () => {
  // Mock data for designs
  const designs = [
    {
      id: 1,
      title: 'Логотип для стартапа',
      description: 'Современный минималистичный логотип для IT-компании',
      image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Logo+Design',
      category: 'Логотипы',
      price: '$500',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Дизайн веб-сайта',
      description: 'Адаптивный дизайн для корпоративного сайта',
      image: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Web+Design',
      category: 'Веб-дизайн',
      price: '$1200',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Мобильное приложение',
      description: 'UI/UX дизайн для мобильного приложения',
      image: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=Mobile+App',
      category: 'Мобильные приложения',
      price: '$800',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Брендинг пакет',
      description: 'Полный пакет брендинга для ресторана',
      image: 'https://via.placeholder.com/300x200/4facfe/ffffff?text=Branding',
      category: 'Брендинг',
      price: '$2000',
      rating: 5.0,
    },
    {
      id: 5,
      title: 'Полиграфия',
      description: 'Дизайн визиток и буклетов',
      image: 'https://via.placeholder.com/300x200/00f2fe/ffffff?text=Print+Design',
      category: 'Полиграфия',
      price: '$300',
      rating: 4.6,
    },
    {
      id: 6,
      title: 'Иллюстрация',
      description: 'Кастомные иллюстрации для книги',
      image: 'https://via.placeholder.com/300x200/43e97b/ffffff?text=Illustration',
      category: 'Иллюстрации',
      price: '$600',
      rating: 4.8,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ px: 0 }}>
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
        Галерея дизайнов
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {designs.map((design) => (
          <Box key={design.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 8px)' } }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardMedia
                component="img"
                height={200}
                image={design.image}
                alt={design.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip
                    label={design.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="h6" color="primary">
                    {design.price}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontSize: getResponsiveValue('1rem', '1.1rem', '1.2rem'),
                    fontWeight: 600,
                  }}
                >
                  {design.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: getResponsiveValue('0.875rem', '0.9rem', '1rem'),
                    lineHeight: 1.5,
                  }}
                >
                  {design.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Рейтинг: {design.rating} ⭐
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  fullWidth
                  variant="outlined"
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default DesignsPage;
