import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiService } from '../services/apiService';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  categories?: Array<{
    id: number;
    name: string;
    englishName: string;
    description?: string;
    icon?: string;
    color?: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithPhone: (phone: string, code: string, name?: string) => Promise<void>;
  sendVerificationCode: (phone: string) => Promise<{ code: string }>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Проверяем аутентификацию при загрузке через API
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiService.getCurrentUser();
        if (response.success) {
          const userData: User = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            phone: response.user.phone || undefined,
            avatar: response.user.avatar || undefined,
            categories: []
          };
          setUser(userData);
        }
      } catch (err: any) {
        // Пользователь не аутентифицирован или токен истек
        if (err.message === 'UNAUTHORIZED_SILENT') {
          console.log('Silent auth check - user not authenticated');
        } else {
          console.log('Auth check failed:', err.message);
        }
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  // Слушаем событие истечения токена
  useEffect(() => {
    const handleAuthExpired = () => {
      console.log('🔒 JWT token expired - clearing user state');
      setUser(null);
      setError(null);
    };

    window.addEventListener('auth-expired', handleAuthExpired);
    
    return () => {
      window.removeEventListener('auth-expired', handleAuthExpired);
    };
  }, []);

  const sendVerificationCode = async (phone: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.sendVerificationCode(phone);
      
      if (!response.success) {
        throw new Error(response.message || 'Ошибка отправки кода');
      }
      
      return { code: response.code }; // Возвращаем код для отображения
    } catch (err: any) {
      const errorMessage = err.message || 'Ошибка отправки кода верификации';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginWithPhone = async (phone: string, code: string, name?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.verifyCode(phone, code, name);
      
      if (response.success) {
        const userData: User = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          phone: response.user.phone || undefined,
          avatar: response.user.avatar || undefined,
          categories: []
        };
        
        setUser(userData);
        // Токен теперь автоматически в HttpOnly cookies
      } else {
        throw new Error(response.message || 'Ошибка авторизации');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Ошибка верификации кода';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Вызываем logout API для очистки cookies на сервере
      await apiService.logout();
    } catch (err) {
      // Игнорируем ошибки logout API
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loginWithPhone,
    sendVerificationCode,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
