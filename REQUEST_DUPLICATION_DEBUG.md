# Диагностика дублирования запросов на фронтенде

## 🔍 Проблема

Пользователь сообщает о дублировании запросов на фронтенде. Для диагностики добавлено подробное логирование.

## 🛠️ Добавленное логирование

### 1. Отключен React.StrictMode

**index.tsx:**
```typescript
// Временно отключен для диагностики
root.render(
  <App />
);

// Было:
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
```

### 2. Логирование в useCategories hook

**useCategories.ts:**
```typescript
const fetchCategories = async () => {
  console.log('🔄 useCategories: fetchCategories called', { activeOnly, language });
  setLoading(true);
  setError(null);
  
  try {
    const data = activeOnly 
      ? await apiService.getActiveCategories(language)
      : await apiService.getCategories(language);
    console.log('✅ useCategories: categories loaded', data.length);
    setCategories(data);
  } catch (err) {
    console.error('❌ useCategories: Error fetching categories:', err);
    setError('Ошибка загрузки категорий');
  } finally {
    setLoading(false);
  }
};
```

### 3. Логирование в AuthContext

**AuthContext.tsx:**
```typescript
const checkAuth = async () => {
  console.log('🔄 AuthContext: checkAuth called');
  try {
    const response = await apiService.getCurrentUser();
    if (response.success) {
      console.log('✅ AuthContext: user authenticated', response.user.name);
      // ... установка пользователя
    }
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED_SILENT') {
      console.log('🔒 AuthContext: Silent auth check - user not authenticated');
    } else {
      console.log('❌ AuthContext: Auth check failed:', err.message);
    }
    setUser(null);
  }
};
```

### 4. Логирование в apiService

**apiService.ts:**
```typescript
// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', response.status, response.config.url);
    return response;
  },
  // ... обработка ошибок
);
```

## 🧪 Как использовать логирование

### 1. Откройте DevTools
- **F12** или **Ctrl+Shift+I**
- Перейдите на вкладку **Console**

### 2. Перезагрузите страницу
- **F5** или **Ctrl+R**
- Наблюдайте за логами в консоли

### 3. Ожидаемые логи

**Нормальное поведение (без дублирования):**
```
🔄 AuthContext: checkAuth called
📤 API Request: GET /auth/me
📥 API Response: 401 /auth/me
🔒 AuthContext: Silent auth check - user not authenticated

🔄 useCategories: fetchCategories called {activeOnly: true, language: "ru"}
📤 API Request: GET /categories/active
📥 API Response: 200 /categories/active
✅ useCategories: categories loaded 3
```

**Проблемное поведение (с дублированием):**
```
🔄 AuthContext: checkAuth called
🔄 AuthContext: checkAuth called  // ДУБЛИРОВАНИЕ!
📤 API Request: GET /auth/me
📤 API Request: GET /auth/me      // ДУБЛИРОВАНИЕ!
📥 API Response: 401 /auth/me
📥 API Response: 401 /auth/me    // ДУБЛИРОВАНИЕ!
```

## 🔍 Возможные причины дублирования

### 1. React.StrictMode
- **Статус:** Отключен для диагностики
- **Решение:** Оставить отключенным в development

### 2. Множественные рендеры компонентов
- **Причина:** Изменения в зависимостях useEffect
- **Решение:** Проверить зависимости в useEffect

### 3. Hot Reload в development
- **Причина:** Webpack dev server перезагружает компоненты
- **Решение:** Нормальное поведение в development

### 4. Родительские компоненты перерендериваются
- **Причина:** Изменения в props или state
- **Решение:** Оптимизировать рендеринг

## 📋 Следующие шаги

1. **Проверить логи** в консоли браузера
2. **Определить источник** дублирования
3. **Применить соответствующее решение**
4. **Убрать логирование** после диагностики
5. **Вернуть React.StrictMode** если нужно

## ⚠️ Важно

- **Логирование временное** - только для диагностики
- **React.StrictMode отключен** - только для тестирования
- **В production** дублирования не должно быть
- **После диагностики** убрать все console.log
