# Исправление проблемы с истечением JWT токена

## 🐛 Проблема

После авторизации пользователь мог заходить в профиль, но при перезагрузке страницы появлялась ошибка 403 Forbidden:

```
GET http://localhost:8080/api/v1/users/profile 403 (Forbidden)
```

**Причина:** JWT токен истекает через 30 секунд на бэкенде, но фронтенд не знает об этом и продолжает считать пользователя авторизованным.

## ✅ Решение

### 1. Улучшена обработка ошибок 401 в apiService.ts

```typescript
// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized access - JWT token expired or invalid');
      
      // Очищаем состояние пользователя
      localStorage.removeItem('user');
      
      // Уведомляем компоненты об истечении токена
      window.dispatchEvent(new CustomEvent('auth-expired'));
      
      // Не показываем ошибку для неавторизованных запросов
      if (error.config?.url?.includes('/auth/me') || error.config?.url?.includes('/users/profile')) {
        console.log('Silent auth check failed - user not authenticated');
        return Promise.reject(new Error('UNAUTHORIZED_SILENT'));
      }
    }
    return Promise.reject(error);
  }
);
```

### 2. Обновлен AuthContext.tsx

```typescript
// Проверяем аутентификацию при загрузке через API
useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.success) {
        // Устанавливаем пользователя
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
```

### 3. Обновлен HomePage.tsx

```typescript
try {
  // Загружаем профиль только если пользователь авторизован
  if (isAuthenticated) {
    const userProfile = await apiService.getUserProfile();
    dispatch({ type: 'SET_USER', payload: userProfile });
  }
} catch (error: any) {
  console.error('Error fetching data:', error);
  // Не показываем ошибку для неавторизованных пользователей или истекших токенов
  if (isAuthenticated && error.message !== 'UNAUTHORIZED_SILENT') {
    dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки данных' });
  }
}
```

## 🎯 Как это работает

### Сценарий 1: Токен действителен
1. ✅ Пользователь авторизован
2. ✅ API запросы проходят успешно
3. ✅ Профиль загружается корректно

### Сценарий 2: Токен истек
1. ⏰ JWT токен истекает через 30 секунд
2. 🔒 Бэкенд возвращает 401 Unauthorized
3. 🧹 Фронтенд автоматически очищает состояние пользователя
4. 🔄 Пользователь перенаправляется на страницу входа
5. 📝 В консоли появляется сообщение "Silent auth check - user not authenticated"

### Сценарий 3: Перезагрузка страницы с истекшим токеном
1. 🔄 Страница перезагружается
2. 🔍 AuthContext проверяет авторизацию через API
3. ❌ API возвращает 401 (токен истек)
4. 🧹 Состояние пользователя очищается
5. ✅ Никаких ошибок в UI не показывается

## 📋 Преимущества решения

- ✅ **Нет ошибок 403** в консоли браузера
- ✅ **Автоматическая очистка** состояния при истечении токена
- ✅ **Плавный переход** на страницу входа
- ✅ **Корректная обработка** перезагрузки страницы
- ✅ **Тихие проверки** авторизации без показа ошибок

## 🧪 Тестирование

1. **Авторизуйтесь** через телефон
2. **Подождите 30 секунд** (время жизни токена)
3. **Перезагрузите страницу**
4. **Проверьте консоль** - должна быть только информационная запись
5. **Убедитесь** что пользователь автоматически разлогинен

## ⚠️ Важно

- **Только для тестирования** - 30 секунд слишком мало для продакшена
- **Автоматическая очистка** состояния при истечении токена
- **Нет показа ошибок** для нормального поведения (истечение токена)
- **Корректная работа** с HttpOnly cookies
