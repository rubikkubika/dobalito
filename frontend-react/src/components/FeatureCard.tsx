// Feature card component
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { getResponsiveValue } from '../utils/helpers';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ 
        flexGrow: 1, 
        padding: '0 !important',
        '&.MuiCardContent-root': {
          padding: '0 !important'
        }
      }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              width: getResponsiveValue(48, 60, 72),
              height: getResponsiveValue(48, 60, 72),
              backgroundColor: `${color}20`, // 20% opacity
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Box sx={{ color: color, fontSize: getResponsiveValue('1.2rem', '1.5rem', '1.8rem') }}>
              {icon}
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontSize: getResponsiveValue('1rem', '1.1rem', '1.2rem'),
                fontWeight: 600,
                color: '#000000',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: getResponsiveValue('0.8rem', '0.9rem', '1rem'),
                color: '#757575',
                lineHeight: 1.4,
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
