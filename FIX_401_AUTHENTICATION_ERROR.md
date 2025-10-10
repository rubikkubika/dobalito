# Исправление ошибки 401 при авторизации

## 🐛 Проблема

При попытке авторизации после проверки кода через `/check-code` получали ошибку 401 "Неверный или истекший код верификации".

## 🔍 Причина

Метод `PhoneVerificationService.verifyCode()` помечает код как использованный (`setIsUsed(true)`), поэтому при повторной проверке через `/verify-code` код уже недействителен.

**Последовательность событий:**
1. Пользователь вводит код
2. Frontend вызывает `/check-code` → код помечается как использованный
3. Frontend вызывает `/verify-code` → код уже недействителен → ошибка 401

## ✅ Решение

### Добавлен новый метод в PhoneVerificationService

```java
/**
 * Проверяет код верификации без его использования (для предварительной проверки)
 */
public boolean checkCodeWithoutUsing(String phone, String code) {
    LocalDateTime now = LocalDateTime.now();
    Optional<PhoneVerificationCode> codeOptional = codeRepository.findByPhoneAndCode(phone, code, now);
    
    if (codeOptional.isEmpty()) {
        return false;
    }
    
    PhoneVerificationCode verificationCode = codeOptional.get();
    
    // Проверяем валидность кода без его использования
    return verificationCode.isValid();
}
```

### Обновлен AuthController

**Было:**
```java
// Проверяем код
boolean isValidCode = phoneVerificationService.verifyCode(normalizedPhone, code);
```

**Стало:**
```java
// Проверяем код без его использования
boolean isValidCode = phoneVerificationService.checkCodeWithoutUsing(normalizedPhone, code);
```

## 🧪 Тестирование

### Тест 1: Существующий пользователь
```bash
# 1. Отправка кода
curl -X POST http://localhost:8080/api/v1/auth/send-verification-code \
  -H "Content-Type: application/json" \
  -d '{"phone":"+79001234567"}'

# Response: {"code":"877327","success":true,...}

# 2. Проверка кода (без использования)
curl -X POST http://localhost:8080/api/v1/auth/check-code \
  -H "Content-Type: application/json" \
  -d '{"phone":"+79001234567","code":"877327"}'

# Response: {"success":true,"isNewUser":false,...}

# 3. Авторизация (код все еще действителен)
curl -X POST http://localhost:8080/api/v1/auth/verify-code \
  -H "Content-Type: application/json" \
  -d '{"phone":"+79001234567","code":"877327"}'

# Response: {"success":true,"user":{...}}
```

### Тест 2: Новый пользователь
```bash
# 1. Отправка кода
curl -X POST http://localhost:8080/api/v1/auth/send-verification-code \
  -H "Content-Type: application/json" \
  -d '{"phone":"+79001234568"}'

# Response: {"code":"066027","success":true,...}

# 2. Проверка кода (без использования)
curl -X POST http://localhost:8080/api/v1/auth/check-code \
  -H "Content-Type: application/json" \
  -d '{"phone":"+79001234568","code":"066027"}'

# Response: {"success":true,"isNewUser":true,...}

# 3. Авторизация с именем (код все еще действителен)
curl -X POST http://localhost:8080/api/v1/auth/verify-code \
  -H "Content-Type: application/json" \
  -d '{"phone":"+79001234568","code":"066027","name":"Alex New"}'

# Response: {"success":true,"user":{"name":"Alex New",...}}
```

## 📋 Логика работы

### Для существующих пользователей:
1. **Отправка кода** → Генерация нового кода
2. **Проверка кода** → `checkCodeWithoutUsing()` → код остается действительным
3. **Авторизация** → `verifyCode()` → код помечается как использованный → успешная авторизация

### Для новых пользователей:
1. **Отправка кода** → Генерация нового кода
2. **Проверка кода** → `checkCodeWithoutUsing()` → код остается действительным → `isNewUser: true`
3. **Ввод имени** → Frontend показывает поле имени
4. **Авторизация** → `verifyCode()` с именем → код помечается как использованный → создание пользователя → успешная авторизация

## 🎯 Преимущества решения

- ✅ **Код проверяется дважды** без потери валидности
- ✅ **Правильное определение** типа пользователя
- ✅ **Корректная авторизация** для всех сценариев
- ✅ **Безопасность** - код все равно помечается как использованный при финальной авторизации
- ✅ **UX** - пользователь не видит ошибок при правильном вводе кода

## 🔧 Технические детали

### Методы проверки кода:

1. **`checkCodeWithoutUsing()`** - для предварительной проверки
   - Проверяет валидность кода
   - НЕ помечает как использованный
   - Используется в `/check-code`

2. **`verifyCode()`** - для финальной авторизации
   - Проверяет валидность кода
   - Помечает как использованный
   - Используется в `/verify-code`

### Безопасность:
- Код все равно становится недействительным после успешной авторизации
- Нет возможности использовать один код несколько раз для авторизации
- Предварительная проверка не влияет на безопасность системы
