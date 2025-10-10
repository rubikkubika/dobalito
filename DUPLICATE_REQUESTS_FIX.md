# Исправление дублирования запросов к бэкенду

## 🐛 Проблема

Обнаружено дублирование запросов к бэкенду при загрузке главной страницы:

1. **AuthContext** делает запрос к `/api/v1/auth/me` при загрузке
2. **HomePage** делает запрос к `/api/v1/users/profile` если пользователь авторизован
3. **React.StrictMode** дублирует useEffect в development режиме
4. **useCategories** может перерендериваться из-за функции `getBackendLanguage()`

## ✅ Решение

### 1. Убрано дублирование запросов профиля

**HomePage.tsx:**
```typescript
// Убираем дублирование запросов - AuthContext уже загружает данные пользователя
// useEffect(() => {
//   const fetchData = async () => {
//     dispatch({ type: 'SET_LOADING', payload: true });
//     
//     try {
//       // Загружаем профиль только если пользователь авторизован
//       if (isAuthenticated) {
//         const userProfile = await apiService.getUserProfile();
//         dispatch({ type: 'SET_USER', payload: userProfile });
//       }
//     } catch (error: any) {
//       console.error('Error fetching data:', error);
//       // Не показываем ошибку для неавторизованных пользователей или истекших токенов
//       if (isAuthenticated && error.message !== 'UNAUTHORIZED_SILENT') {
//         dispatch({ type: 'SET_ERROR', payload: 'Ошибка загрузки данных' });
//       }
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   fetchData();
// }, [dispatch, isAuthenticated]);
```

### 2. Мемоизация языка для бэкенда

**HomePage.tsx:**
```typescript
// Мемоизируем язык для бэкенда, чтобы избежать лишних перерендеров
const backendLanguage = React.useMemo(() => {
  return language === 'ru' ? 'ru' : 'en';
}, [language]);

const { categories, loading: categoriesLoading, error: categoriesError } = useCategories(true, backendLanguage);
```

## 🔍 Источники дублирования

### 1. React.StrictMode (Development только)
```typescript
// index.tsx
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Поведение:** В development режиме React.StrictMode намеренно дублирует useEffect для обнаружения побочных эффектов.

**Решение:** Это нормальное поведение в development, в production этого не будет.

### 2. Дублирование запросов профиля
- **AuthContext** загружает данные пользователя через `/api/v1/auth/me`
- **HomePage** дублировал запрос через `/api/v1/users/profile`

**Решение:** Убрали дублирование в HomePage, оставили только AuthContext.

### 3. Перерендеры из-за функций
```typescript
// ПЛОХО - функция создается при каждом рендере
const getBackendLanguage = () => {
  return language === 'ru' ? 'ru' : 'en';
};

// ХОРОШО - мемоизированное значение
const backendLanguage = React.useMemo(() => {
  return language === 'ru' ? 'ru' : 'en';
}, [language]);
```

## 📋 Результат оптимизации

### До исправления:
- ❌ **2 запроса** к профилю пользователя (AuthContext + HomePage)
- ❌ **Лишние перерендеры** из-за функций
- ❌ **Дублирование** в React.StrictMode

### После исправления:
- ✅ **1 запрос** к профилю пользователя (только AuthContext)
- ✅ **Мемоизированные значения** для стабильности
- ✅ **Оптимизированные перерендеры**

## 🧪 Тестирование

1. **Откройте DevTools** → Network tab
2. **Перезагрузите страницу**
3. **Проверьте количество запросов:**
   - `/api/v1/auth/me` - 1 запрос (AuthContext)
   - `/api/v1/categories/active` - 1 запрос (useCategories)
   - `/api/v1/users/profile` - 0 запросов (убрано дублирование)

## ⚠️ Важно

- **React.StrictMode** дублирует useEffect только в development
- **В production** дублирования не будет
- **Мемоизация** предотвращает лишние перерендеры
- **AuthContext** единственный источник данных пользователя
