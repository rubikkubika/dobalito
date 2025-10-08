import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
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

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Здесь будет реальный API вызов
      // Пока что симулируем успешный вход
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Создаем тестового пользователя с категориями
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: email,
        avatar: 'https://via.placeholder.com/150',
        categories: [
          {
            id: 1,
            name: 'Серфинг',
            englishName: 'Surfing',
            description: 'Услуги и товары для серфинга',
            color: '#00B4DB'
          },
          {
            id: 2,
            name: 'Аренда байка',
            englishName: 'Bike Rental',
            description: 'Аренда велосипедов и мотоциклов',
            color: '#FF6B6B'
          }
        ]
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Ошибка входа. Проверьте данные.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Проверяем localStorage при инициализации
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
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
