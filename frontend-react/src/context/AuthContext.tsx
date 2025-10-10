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
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, code: string, name?: string) => Promise<void>;
  sendVerificationCode: (phone: string) => Promise<void>;
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

  // Восстанавливаем пользователя из localStorage при загрузке (неблокирующе)
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Реальный API вызов
      const response = await apiService.login(email, password);
      
      if (response.success) {
        const userData: User = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          phone: response.user.phone || undefined,
          avatar: response.user.avatar || undefined,
          categories: [] // Пока без категорий, можно добавить позже
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error(response.message || 'Ошибка авторизации');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Ошибка входа. Проверьте данные.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationCode = async (phone: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.sendVerificationCode(phone);
      
      if (!response.success) {
        throw new Error(response.message || 'Ошибка отправки кода');
      }
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
          categories: [] // Пока без категорий, можно добавить позже
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
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
