# Phone-Only Authentication System

## Обзор

Фронтенд обновлен для работы **только с авторизацией по номеру телефона**. Убрана вся функциональность авторизации по email/password. Система использует Spring Security с JWT токенами и компонент выбора кода страны.

## Изменения

### ✅ Удалено из фронтенда:

1. **LoginPage:**
   - Убраны tabs для переключения между email и телефоном
   - Удалена форма авторизации по email/password
   - Убраны все связанные с email поля и валидация
   - Упрощен интерфейс - только телефон

2. **AuthContext:**
   - Удалена функция `login(email, password)`
   - Упрощен интерфейс `AuthContextType`
   - Оставлена только `loginWithPhone()` функция

3. **apiService:**
   - Удалена функция `login(email, password)`
   - Убраны все email-related API вызовы
   - Оставлены только phone authentication методы

4. **Переводы:**
   - Удалены все `login.*` переводы
   - Убраны `phone.switch_to_email` и `phone.switch_to_phone`
   - Очищены от email-related текстов

## Текущая функциональность

### 🔐 Авторизация по телефону

**Процесс авторизации:**
1. Пользователь выбирает страну из выпадающего списка
2. Вводит номер телефона
3. Нажимает "Отправить код"
4. Получает SMS с кодом верификации
5. Вводит код и опционально имя
6. Получает JWT токен и авторизуется

**Компоненты:**
- `PhoneInput` - выбор страны + ввод номера
- `LoginPage` - упрощенная форма только с телефоном
- `AuthContext` - только phone authentication
- `apiService` - только phone API методы

### 🌍 Поддерживаемые страны

Компонент поддерживает 30+ стран с флагами:
- 🇷🇺 Россия (+7)
- 🇰🇿 Казахстан (+7) 
- 🇧🇾 Беларусь (+375)
- 🇺🇦 Украина (+380)
- 🇺🇸 США (+1)
- 🇩🇪 Германия (+49)
- И другие...

### 🔑 JWT Token Management

- Автоматическое сохранение токена в localStorage
- Добавление Bearer токена в заголовки запросов
- Очистка токена при 401 ошибке
- Восстановление сессии при загрузке

## API Endpoints

### Используемые:
- `POST /api/v1/auth/send-verification-code` - отправка кода
- `POST /api/v1/auth/verify-code` - верификация кода + получение JWT
- `GET /api/v1/auth/me` - получение текущего пользователя (с JWT)
- `GET /api/v1/auth/check-code-status` - проверка статуса кода

### Удаленные:
- `POST /api/v1/auth/login-form` - авторизация по email
- `POST /api/v1/auth/register` - регистрация по email
- `GET /api/v1/auth/me-by-email` - получение пользователя по email

## Интерфейс

### LoginPage
```tsx
// Упрощенный интерфейс
<Container>
  <Paper>
    <Typography>Вход по номеру телефона</Typography>
    
    <PhoneInput
      value={phone}
      onChange={setPhone}
      error={!!validationErrors.phone}
      helperText={validationErrors.phone}
    />
    
    {!codeSent ? (
      <Button onClick={handleSendCode}>
        Отправить код
      </Button>
    ) : (
      <>
        <TextField label="Код верификации" />
        <TextField label="Имя (опционально)" />
        <Button onClick={handleVerifyCode}>
          Подтвердить код
        </Button>
      </>
    )}
  </Paper>
</Container>
```

### AuthContext
```tsx
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loginWithPhone: (phone: string, code: string, name?: string) => Promise<void>;
  sendVerificationCode: (phone: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}
```

## Переводы

### Русский
```tsx
'phone.title': 'Вход по номеру телефона',
'phone.subtitle': 'Введите номер телефона для получения кода',
'phone.phone': 'Номер телефона',
'phone.code': 'Код верификации',
'phone.name': 'Имя (опционально)',
'phone.send_code': 'Отправить код',
'phone.verify_code': 'Подтвердить код',
'phone.resend_code': 'Отправить код повторно',
'phone.country_code': 'Код страны',
'phone.phone_number': 'Номер телефона',
'phone.name_optional': 'Только для новых пользователей',
```

### English
```tsx
'phone.title': 'Login with phone number',
'phone.subtitle': 'Enter your phone number to receive verification code',
'phone.phone': 'Phone number',
'phone.code': 'Verification code',
'phone.name': 'Name (optional)',
'phone.send_code': 'Send code',
'phone.verify_code': 'Verify code',
'phone.resend_code': 'Resend code',
'phone.country_code': 'Country code',
'phone.phone_number': 'Phone number',
'phone.name_optional': 'For new users only',
```

## Безопасность

### JWT Tokens
- Токены содержат информацию о пользователе
- Настраиваемое время жизни (24 часа по умолчанию)
- Автоматическая очистка при истечении

### Phone Verification
- Коды верификации действуют 10 минут
- Лимит 5 попыток отправки в час
- Автоматическая деактивация предыдущих кодов

## Пример использования

```tsx
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
      // Пользователь авторизован с JWT токеном
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

## Миграция

### Что изменилось:
1. **Убрана авторизация по email** - только телефон
2. **Упрощен интерфейс** - нет tabs, только одна форма
3. **Очищены переводы** - убраны email-related тексты
4. **Упрощен AuthContext** - только phone методы
5. **Очищен apiService** - только phone API

### Обратная совместимость:
- Backend endpoints остались (для админки)
- JWT система работает как прежде
- Все phone authentication функции сохранены

## Заключение

Фронтенд теперь работает **исключительно с авторизацией по номеру телефона**. Система упрощена, очищена от email функциональности и готова к использованию. Пользователи могут авторизоваться только через SMS коды с удобным выбором кода страны.
