# Улучшенное решение для обнаружения истечения JWT токена

## 🎯 Проблема

Периодические запросы - не лучшая идея, они создают ненужную нагрузку. Проблема была в том, что мы убрали запросы к профилю из HomePage, поэтому истечение токена не обнаруживалось.

## ✅ Улучшенное решение

### 1. Убраны периодические запросы

**AuthContext.tsx:**
```typescript
// Убрана периодическая проверка каждые 10 секунд
// Оставлен только обработчик события истечения токена
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
```

### 2. Создан хук useUserProfile

**useUserProfile.ts:**
```typescript
export const useUserProfile = () => {
  const { dispatch } = useApp();
  const { isAuthenticated } = useAuth();

  const fetchUserProfile = async () => {
    if (!isAuthenticated) return;
    
    try {
      const userProfile = await apiService.getUserProfile();
      dispatch({ type: 'SET_USER', payload: userProfile });
    } catch (error: any) {
      // Не показываем ошибку для истекших токенов
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
```

### 3. Обновлен HomePage

**HomePage.tsx:**
```typescript
const { categories, loading: categoriesLoading, error: categoriesError } = useCategories(true, backendLanguage);
const { fetchUserProfile } = useUserProfile();

const handleCategoryClick = (category: Category) => {
  // Проверяем токен перед навигацией
  fetchUserProfile();
  navigate(`/executors/${category.name}`);
};
```

## 🎯 Как это работает

### Сценарий 1: Загрузка страницы
1. ✅ Пользователь авторизован
2. 🔍 `useUserProfile` автоматически загружает профиль
3. ⏰ Если токен истек, API возвращает 401/403
4. 🧹 Фронтенд автоматически очищает состояние
5. 🔄 Пользователь разлогинен

### Сценарий 2: Активность пользователя
1. ✅ Пользователь авторизован
2. 🖱️ Пользователь кликает на категорию
3. 🔍 `fetchUserProfile()` проверяет токен
4. ⏰ Если токен истек, API возвращает 401/403
5. 🧹 Фронтенд автоматически очищает состояние
6. 🔄 Пользователь разлогинен

### Сценарий 3: Навигация между страницами
1. ✅ Пользователь авторизован
2. 🔄 Переходит на другую страницу
3. 🔍 `useUserProfile` проверяет токен при загрузке
4. ⏰ Если токен истек, обнаруживается автоматически
5. 🧹 Пользователь разлогинен

## 📋 Преимущества решения

- ✅ **Нет периодических запросов** - экономия ресурсов
- ✅ **Проверка при активности** - естественное поведение
- ✅ **Переиспользуемый хук** - можно использовать на других страницах
- ✅ **Минимальная нагрузка** - запросы только при необходимости
- ✅ **Надежное обнаружение** - проверка при каждом действии пользователя

## 🔧 Где использовать useUserProfile

### Страницы, где нужна проверка токена:
- **HomePage** - при загрузке и клике на категории
- **ProfilePage** - при загрузке профиля
- **ExecutorsPage** - при загрузке исполнителей
- **SettingsPage** - при загрузке настроек

### Пример использования:
```typescript
import { useUserProfile } from '../hooks/useUserProfile';

const SomePage: React.FC = () => {
  const { fetchUserProfile } = useUserProfile();
  
  const handleSomeAction = () => {
    // Проверяем токен перед действием
    fetchUserProfile();
    // Выполняем действие
  };
  
  return (
    // JSX
  );
};
```

## 🧪 Тестирование

1. **Авторизуйтесь** через телефон
2. **Подождите 30 секунд** (время жизни токена)
3. **Кликните на категорию** или **перезагрузите страницу**
4. **Проверьте консоль** - должны появиться логи:
   ```
   🔒 JWT token expired or invalid - logging out user
   🔒 JWT token expired - clearing user state
   ```
5. **Убедитесь** что пользователь автоматически разлогинен

## ⚠️ Важно

- **Нет периодических запросов** - только при активности пользователя
- **Переиспользуемый хук** - можно использовать на любых страницах
- **Эффективное использование ресурсов** - запросы только при необходимости
- **Естественное поведение** - проверка токена при действиях пользователя
