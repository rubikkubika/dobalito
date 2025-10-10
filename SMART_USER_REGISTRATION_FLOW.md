# Улучшенная логика авторизации с проверкой новых пользователей

## 🎯 Цель

Реализовать логику, где поле для ввода имени пользователя показывается только для новых пользователей и только после успешной проверки кода верификации.

## 🔄 Новая логика авторизации

### Этапы процесса:

1. **Ввод номера телефона** → Отправка кода
2. **Ввод кода** → Проверка кода (без авторизации)
3. **Определение типа пользователя**:
   - **Новый пользователь** → Показать поле имени → Завершить регистрацию
   - **Существующий пользователь** → Сразу авторизовать

## 🛠️ Backend изменения

### Новый endpoint: `/api/v1/auth/check-code`

**Назначение:** Проверка кода без авторизации для определения типа пользователя

**Request:**
```json
{
  "phone": "+79001234567",
  "code": "123456"
}
```

**Response (новый пользователь):**
```json
{
  "success": true,
  "message": "Код верный",
  "isNewUser": true,
  "phone": "79001234567"
}
```

**Response (существующий пользователь):**
```json
{
  "success": true,
  "message": "Код верный",
  "isNewUser": false,
  "phone": "79001234567"
}
```

**Логика определения нового пользователя:**
```java
// Проверяем, существует ли пользователь
Optional<User> existingUser = userService.getUserByPhone(normalizedPhone);
boolean isNewUser = existingUser.isEmpty() || 
                   (existingUser.isPresent() && 
                    (existingUser.get().getName() == null || 
                     existingUser.get().getName().trim().isEmpty()));
```

## 🎨 Frontend изменения

### Новые состояния компонента:

```typescript
const [codeVerified, setCodeVerified] = useState(false); // Код проверен
const [isNewUser, setIsNewUser] = useState(false); // Новый пользователь
const [codeCheckLoading, setCodeCheckLoading] = useState(false); // Загрузка проверки кода
```

### Новая функция проверки кода:

```typescript
const handleCheckCode = async () => {
  if (!code.trim()) {
    setValidationErrors({ code: t('phone.code_required') });
    return;
  }

  setCodeCheckLoading(true);
  setValidationErrors({});

  try {
    const result = await apiService.checkCode(phone, code);
    
    if (result.success) {
      setCodeVerified(true);
      setIsNewUser(result.isNewUser);
      
      // Если пользователь не новый, сразу авторизуем
      if (!result.isNewUser) {
        await loginWithPhone(phone, code);
        const from = location.state?.from?.pathname || '/profile';
        navigate(from, { replace: true });
      }
    }
  } catch (err: any) {
    setValidationErrors({ code: err.message || 'Неверный код' });
  } finally {
    setCodeCheckLoading(false);
  }
};
```

### Обновленная валидация:

```typescript
const validatePhoneForm = () => {
  const errors: { phone?: string; code?: string; name?: string } = {};

  if (!phone.trim()) {
    errors.phone = t('phone.phone_required');
  } else if (!/^[+]?[0-9\s\-()]{10,15}$/.test(phone)) {
    errors.phone = t('phone.phone_invalid');
  }

  if (codeSent && !code.trim()) {
    errors.code = t('phone.code_required');
  }

  // Валидация имени только для новых пользователей после проверки кода
  if (codeVerified && isNewUser && !name.trim()) {
    errors.name = t('phone.name_required');
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
```

## 🎭 UI/UX изменения

### Три состояния интерфейса:

#### 1. Отправка кода
```jsx
{!codeSent ? (
  <Button onClick={handleSendCode}>
    Отправить код
  </Button>
) : ...}
```

#### 2. Проверка кода
```jsx
{!codeVerified ? (
  <>
    <TextField label="Код верификации" />
    <Button onClick={handleCheckCode}>
      Проверить код
    </Button>
  </>
) : ...}
```

#### 3. Завершение авторизации
```jsx
{codeVerified ? (
  <>
    <Alert severity="success">
      Код проверен успешно!
      {isNewUser ? ' Введите ваше имя для завершения регистрации.' : ' Добро пожаловать!'}
    </Alert>

    {isNewUser && (
      <TextField 
        label="Имя" 
        helperText="Имя обязательно для новых пользователей"
      />
    )}

    <Button type="submit">
      {isNewUser ? 'Завершить регистрацию' : 'Войти'}
    </Button>
  </>
) : null}
```

## 🌐 Новые переводы

### Русский:
```typescript
'phone.name_required': 'Имя обязательно для новых пользователей'
```

### English:
```typescript
'phone.name_required': 'Name is required for new users'
```

## 🔧 API Service изменения

### Новый метод:

```typescript
async checkCode(phone: string, code: string) {
  const response = await api.post('/auth/check-code', {
    phone,
    code
  });
  return response.data;
}
```

## 📋 Преимущества новой логики

### ✅ Для пользователей:
- **Упрощенный процесс** для существующих пользователей
- **Понятные подсказки** о необходимости ввода имени
- **Меньше полей** для заполнения при повторном входе

### ✅ Для разработчиков:
- **Четкое разделение** логики для новых и существующих пользователей
- **Лучший UX** с пошаговым процессом
- **Гибкость** в обработке разных сценариев

### ✅ Для безопасности:
- **Проверка кода** перед определением типа пользователя
- **Валидация** только необходимых полей
- **Защита** от некорректных данных

## 🧪 Тестирование

### Сценарий 1: Новый пользователь
1. Введите номер телефона → Отправьте код
2. Введите код → Нажмите "Проверить код"
3. Увидите сообщение "Введите ваше имя для завершения регистрации"
4. Введите имя → Нажмите "Завершить регистрацию"

### Сценарий 2: Существующий пользователь
1. Введите номер телефона → Отправьте код
2. Введите код → Нажмите "Проверить код"
3. Автоматически авторизуетесь и перейдете в профиль

## 📝 Примечания

- **Код проверяется дважды**: сначала для определения типа пользователя, затем для авторизации
- **Поле имени** показывается только для новых пользователей
- **Валидация имени** происходит только при необходимости
- **Автоматическая авторизация** для существующих пользователей
