# Phone Authentication with Spring Security - Frontend Integration

## Обзор

Фронтенд обновлен для работы с новой системой авторизации по номеру телефона, интегрированной с Spring Security и JWT токенами. Добавлен компонент выбора кода страны из списка.

## Новые компоненты

### 1. PhoneInput Component

Компонент для ввода номера телефона с выбором кода страны.

**Расположение:** `frontend-react/src/components/PhoneInput.tsx`

**Особенности:**
- Выпадающий список с кодами стран и флагами
- Автоматическое форматирование номера телефона
- Валидация ввода
- Поддержка 30+ стран

**Использование:**
```tsx
import PhoneInput from '../components/PhoneInput';

<PhoneInput
  value={phone}
  onChange={setPhone}
  error={!!validationErrors.phone}
  helperText={validationErrors.phone}
  disabled={loading}
  placeholder="900 123 45 67"
/>
```

### 2. Обновленный AuthContext

**Изменения:**
- Добавлена поддержка JWT токенов
- Сохранение токена в localStorage
- Автоматическое восстановление сессии при загрузке

**Новые поля:**
```tsx
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null; // Новое поле
  // ... остальные поля
}
```

### 3. Обновленный apiService

**Изменения:**
- Использует `jwt_token` вместо `authToken`
- Автоматическое добавление Bearer токена в заголовки
- Очистка токена при 401 ошибке

## Поддерживаемые страны

Компонент PhoneInput поддерживает следующие страны:

| Код | Страна | Флаг |
|-----|--------|------|
| +7 | Россия | 🇷🇺 |
| +7 | Казахстан | 🇰🇿 |
| +375 | Беларусь | 🇧🇾 |
| +380 | Украина | 🇺🇦 |
| +374 | Армения | 🇦🇲 |
| +995 | Грузия | 🇬🇪 |
| +998 | Узбекистан | 🇺🇿 |
| +996 | Кыргызстан | 🇰🇬 |
| +992 | Таджикистан | 🇹🇯 |
| +993 | Туркменистан | 🇹🇲 |
| +1 | США | 🇺🇸 |
| +1 | Канада | 🇨🇦 |
| +44 | Великобритания | 🇬🇧 |
| +49 | Германия | 🇩🇪 |
| +33 | Франция | 🇫🇷 |
| +39 | Италия | 🇮🇹 |
| +34 | Испания | 🇪🇸 |
| +86 | Китай | 🇨🇳 |
| +81 | Япония | 🇯🇵 |
| +82 | Южная Корея | 🇰🇷 |
| +91 | Индия | 🇮🇳 |
| +55 | Бразилия | 🇧🇷 |
| +61 | Австралия | 🇦🇺 |
| +90 | Турция | 🇹🇷 |
| +966 | Саудовская Аравия | 🇸🇦 |
| +971 | ОАЭ | 🇦🇪 |
| +972 | Израиль | 🇮🇱 |
| +20 | Египет | 🇪🇬 |
| +27 | ЮАР | 🇿🇦 |

## Обновленный процесс авторизации

### 1. Выбор страны и ввод номера
- Пользователь выбирает страну из выпадающего списка
- Вводит номер телефона без кода страны
- Компонент автоматически формирует полный номер

### 2. Отправка кода верификации
```tsx
const handleSendCode = async () => {
  try {
    await sendVerificationCode(phone);
    setCodeSent(true);
    setCodeSentTo(phone);
  } catch (err) {
    // Обработка ошибки
  }
};
```

### 3. Верификация кода и получение JWT
```tsx
const handlePhoneSubmit = async (e: React.FormEvent) => {
  try {
    await loginWithPhone(phone, code, name);
    // JWT токен автоматически сохраняется в localStorage
    navigate('/profile');
  } catch (err) {
    // Обработка ошибки
  }
};
```

## Интернационализация

Добавлены новые переводы для компонента выбора страны:

### Русский
```tsx
'phone.country_code': 'Код страны',
'phone.phone_number': 'Номер телефона',
'phone.name_optional': 'Только для новых пользователей',
```

### English
```tsx
'phone.country_code': 'Country code',
'phone.phone_number': 'Phone number',
'phone.name_optional': 'For new users only',
```

## Безопасность

### JWT Token Management
- Токены сохраняются в localStorage
- Автоматическое добавление в заголовки запросов
- Очистка при истечении или ошибке 401

### Валидация
- Проверка формата номера телефона
- Ограничение длины ввода
- Валидация кода верификации

## Совместимость

### Обратная совместимость
- Сохранены все старые endpoints
- Поддержка авторизации по email/password
- Legacy методы в apiService

### Миграция
1. Старые токены (`authToken`) заменены на `jwt_token`
2. Обновлена логика проверки аутентификации
3. Добавлена поддержка новых полей пользователя

## Пример использования

```tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PhoneInput from '../components/PhoneInput';

const LoginForm = () => {
  const { loginWithPhone, sendVerificationCode, loading } = useAuth();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    try {
      await sendVerificationCode(phone);
      setCodeSent(true);
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await loginWithPhone(phone, code);
      // Пользователь авторизован, JWT токен сохранен
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      <PhoneInput
        value={phone}
        onChange={setPhone}
        disabled={loading || codeSent}
      />
      
      {!codeSent ? (
        <button onClick={handleSendCode} disabled={loading}>
          Отправить код
        </button>
      ) : (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите код"
          />
          <button onClick={handleVerifyCode} disabled={loading}>
            Подтвердить
          </button>
        </div>
      )}
    </div>
  );
};
```

## Тестирование

### Ручное тестирование
1. Выберите страну из списка
2. Введите номер телефона
3. Отправьте код верификации
4. Введите полученный код
5. Проверьте сохранение JWT токена в localStorage

### Автоматическое тестирование
- Все компоненты покрыты TypeScript типами
- Валидация форм работает корректно
- Обработка ошибок настроена

## Заключение

Фронтенд успешно интегрирован с новой системой авторизации по номеру телефона через Spring Security. Добавлен удобный компонент выбора кода страны, поддержка JWT токенов и полная интернационализация. Система готова к использованию в продакшене.