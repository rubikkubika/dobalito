# Диагностика отсутствия запросов в DevTools

## 🐛 Проблема

Пользователь сообщает, что в панели разработчика не видно запросов, но приложение работает. Это может указывать на несколько проблем.

## 🔍 Возможные причины

### 1. Кэширование браузера
- **Проблема:** Браузер кэширует запросы
- **Решение:** Добавлены timestamp параметры к запросам

### 2. Service Worker
- **Проблема:** Service Worker перехватывает запросы
- **Решение:** Проверить наличие Service Worker в DevTools

### 3. Проблемы с CORS
- **Проблема:** Запросы блокируются браузером
- **Решение:** Проверить CORS настройки

### 4. Логирование отключено
- **Проблема:** Запросы не логируются
- **Решение:** Добавлено детальное логирование

## 🛠️ Добавленные инструменты диагностики

### 1. Детальное логирование запросов

**apiService.ts:**
```typescript
// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    console.log('📤 Request config:', {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    console.error('📤 Request error:', error);
    return Promise.reject(error);
  }
);
```

### 2. Timestamp параметры для предотвращения кэширования

```typescript
async getActiveCategories(language: string = 'ru') {
  const timestamp = Date.now();
  const response = await api.get(`/categories/active?lang=${language}&t=${timestamp}`);
  return response.data;
},

async getCurrentUser() {
  const timestamp = Date.now();
  const response = await api.get(`/auth/me?t=${timestamp}`);
  return response.data;
},
```

### 3. Кнопка для ручного тестирования API

**HomePage.tsx:**
```typescript
const testApiRequests = async () => {
  console.log('🧪 Testing API requests...');
  try {
    console.log('1. Testing categories...');
    const categories = await apiService.getActiveCategories('ru');
    console.log('✅ Categories loaded:', categories.length);
    
    console.log('2. Testing auth...');
    const auth = await apiService.getCurrentUser();
    console.log('✅ Auth response:', auth);
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};
```

### 4. Логирование в useCategories

```typescript
useEffect(() => {
  console.log('🔄 useCategories: useEffect triggered', { activeOnly, language });
  fetchCategories();
}, [activeOnly, language]);
```

## 🧪 Инструкции по диагностике

### 1. Откройте DevTools
- **F12** или **Ctrl+Shift+I**
- Перейдите на вкладку **Console**

### 2. Перезагрузите страницу
- **F5** или **Ctrl+R**
- Наблюдайте за логами в консоли

### 3. Нажмите кнопку "🧪 Test API Requests"
- Это запустит ручные тесты API
- Проверьте логи в консоли

### 4. Проверьте Network tab
- Перейдите на вкладку **Network**
- Перезагрузите страницу
- Проверьте, есть ли запросы

### 5. Проверьте Service Workers
- Перейдите на вкладку **Application**
- Проверьте раздел **Service Workers**
- Убедитесь, что нет активных Service Workers

## 📋 Ожидаемые результаты

### В консоли должно быть:
```
🔄 AuthContext: checkAuth called
📤 API Request: GET /auth/me?t=1696934567890
📤 Request config: {baseURL: "http://localhost:8080/api/v1", url: "/auth/me?t=1696934567890", ...}
📥 API Response: 401 /auth/me?t=1696934567890
🔒 AuthContext: Silent auth check - user not authenticated

🔄 useCategories: useEffect triggered {activeOnly: true, language: "ru"}
🔄 useCategories: fetchCategories called {activeOnly: true, language: "ru"}
📤 API Request: GET /categories/active?lang=ru&t=1696934567891
📥 API Response: 200 /categories/active?lang=ru&t=1696934567891
✅ useCategories: categories loaded 3
```

### В Network tab должно быть:
- `GET /auth/me?t=...` - запрос авторизации
- `GET /categories/active?lang=ru&t=...` - запрос категорий

## 🔧 Возможные решения

### Если запросы не видны в Network tab:
1. **Очистите кэш браузера** (Ctrl+Shift+Delete)
2. **Отключите Service Workers** в DevTools
3. **Проверьте CORS настройки** на бэкенде
4. **Попробуйте другой браузер**

### Если логи не появляются в консоли:
1. **Проверьте фильтры консоли** (убедитесь, что показываются все типы логов)
2. **Проверьте, что JavaScript включен**
3. **Попробуйте жесткую перезагрузку** (Ctrl+Shift+R)

## ⚠️ Важно

- **Логирование временное** - только для диагностики
- **Timestamp параметры** предотвращают кэширование
- **Кнопка тестирования** поможет изолировать проблему
- **После диагностики** убрать все debug код
