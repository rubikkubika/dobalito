import React, { useState } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { apiService } from '../services/apiService';

interface SafeAvatarProps extends Omit<AvatarProps, 'src'> {
  src?: string;
  fallbackText?: string;
}

const SafeAvatar: React.FC<SafeAvatarProps> = ({ 
  src, 
  fallbackText = 'U', 
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  // Если изображение загрузилось с ошибкой или не загрузилось, показываем fallback
  const shouldShowFallback = !src || imageError || !imageLoaded;

  const avatarSrc = src && !imageError ? 
    (src.startsWith('http') ? src : `${apiService.getApiBaseUrl()}${src}`) : 
    undefined;

  return (
    <Avatar
      {...props}
      src={avatarSrc}
      onError={handleImageError}
      onLoad={handleImageLoad}
    >
      {shouldShowFallback && fallbackText}
    </Avatar>
  );
};

export default SafeAvatar;
