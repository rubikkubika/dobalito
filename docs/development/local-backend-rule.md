# Правило запуска бэкенда локально без Docker

## 🚨 КРИТИЧЕСКОЕ ПРАВИЛО: ВСЕГДА запускать бэкенд с логами

**При запуске бэкенда локально БЕЗ Docker - ВСЕГДА использовать `is_background: false` для отображения логов!**

### ❌ НЕПРАВИЛЬНО (скрывает ошибки):
```bash
cd backend; $env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/dobalito"; $env:SPRING_DATASOURCE_USERNAME="postgres"; $env:SPRING_DATASOURCE_PASSWORD="root"; mvn spring-boot:run
# is_background: true  ← НЕ ДЕЛАТЬ ТАК!
```

### ✅ ПРАВИЛЬНО (показывает логи):
```bash
cd backend; $env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/dobalito"; $env:SPRING_DATASOURCE_USERNAME="postgres"; $env:SPRING_DATASOURCE_PASSWORD="root"; mvn spring-boot:run
# is_background: false  ← ВСЕГДА ТАК!
```

## Почему это критично?

1. **Диагностика ошибок**: Бэкенд часто падает из-за проблем с миграциями, зависимостями, конфигурацией
2. **Flyway ошибки**: Проблемы с миграциями видны только в логах
3. **JPA ошибки**: Проблемы с EntityManager видны только в логах
4. **База данных**: Ошибки подключения к БД видны только в логах
5. **Порты**: Проблемы с занятыми портами видны только в логах

## Исключения

**ТОЛЬКО фронтенд можно запускать в фоне:**
```bash
cd frontend-react; npm start
# is_background: true  ← ОК для фронтенда
```

## Примеры ошибок, которые видны только в логах:

- `Found more than one migration with version 8`
- `Cannot resolve reference to bean 'entityManagerFactory'`
- `Migration checksum mismatch`
- `Port 8080 already in use`
- `Database connection failed`

## Правило для AI Assistant

**ВСЕГДА при запуске бэкенда локально:**
1. Использовать `is_background: false`
2. Показывать полные логи запуска
3. Анализировать ошибки в логах
4. Исправлять проблемы перед повторным запуском
5. Только после успешного запуска можно переключиться на фоновый режим

## Команда для правильного запуска:

```bash
run_terminal_cmd
  command: cd backend; $env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/dobalito"; $env:SPRING_DATASOURCE_USERNAME="postgres"; $env:SPRING_DATASOURCE_PASSWORD="root"; mvn spring-boot:run
  is_background: false  # ← ВСЕГДА false для бэкенда!
```

**Это правило критично для диагностики проблем с Spring Boot, Flyway, JPA и базой данных!**