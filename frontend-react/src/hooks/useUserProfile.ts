import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';

/**
 * Хук для загрузки профиля пользователя
 * Используется для обнаружения истечения JWT токена
 */
export const useUserProfile = () => {
  const { dispatch } = useApp();
  const { isAuthenticated } = useAuth();

  const fetchUserProfile = async () => {
    if (!isAuthenticated) return;
    
    try {
      const userProfile = await apiService.getUserProfile();
      dispatch({ type: 'SET_USER', payload: userProfile });
    } catch (error: any) {
      // Не показываем ошибку для истекших токенов - это нормальное поведение
      if (error.message !== 'UNAUTHORIZED_SILENT') {
        console.error('Error fetching user profile:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки профиля' });
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [isAuthenticated]);

  return { fetchUserProfile };
};

export default useUserProfile;
