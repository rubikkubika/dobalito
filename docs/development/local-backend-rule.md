# Правило запуска бэкенда локально без Docker

## 🚀 Умная стратегия запуска: логи → фоновый режим

**Двухэтапный подход для оптимального баланса диагностики и интерактивности**

### Этап 1: Диагностика (с логами)
```bash
cd backend; $env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/dobalito"; $env:SPRING_DATASOURCE_USERNAME="postgres"; $env:SPRING_DATASOURCE_PASSWORD="root"; mvn spring-boot:run
# is_background: false  ← Показать все логи для диагностики
```

### Этап 2: Разработка (в фоне)
```bash
cd backend; $env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/dobalito"; $env:SPRING_DATASOURCE_USERNAME="postgres"; $env:SPRING_DATASOURCE_PASSWORD="root"; mvn spring-boot:run
# is_background: true   ← Фоновый режим для продолжения работы
```

## 🎯 Когда использовать каждый режим

### `is_background: false` (с логами) - ИСПОЛЬЗОВАТЬ:
- ✅ **Первый запуск** после изменений в коде
- ✅ **При ошибках** - всегда показывать логи
- ✅ **После очистки** target папки
- ✅ **При изменении** конфигурации
- ✅ **Диагностика** проблем с миграциями

### `is_background: true` (в фоне) - ИСПОЛЬЗОВАТЬ:
- ✅ **После успешного** запуска
- ✅ **Для продолжения** разработки
- ✅ **При перезапуске** работающего приложения
- ✅ **Для интерактивности** чата

## 🔍 Почему такой подход работает?

### ✅ Преимущества:
- **Диагностика:** Видим все логи при первом запуске
- **Интерактивность:** Не блокируем чат после успешного запуска
- **Отладка:** При ошибках всегда показываем логи
- **Производительность:** Оптимальный баланс диагностики и работы

## 🛠️ Примеры ошибок, видимых только в логах:

- `Found more than one migration with version 8`
- `Cannot resolve reference to bean 'entityManagerFactory'`
- `Migration checksum mismatch`
- `Port 8080 already in use`
- `Database connection failed`
- `Flyway migration failed`

## 📋 Правило для AI Assistant

**При запуске бэкенда локально:**

1. **Первый запуск:** `is_background: false` - показать логи
2. **Анализ логов:** Проверить на ошибки и предупреждения
3. **Исправление:** Устранить проблемы если есть
4. **Повторный запуск:** `is_background: true` - для продолжения работы
5. **При ошибках:** Всегда `is_background: false`

## 🎯 Исключения

**Фронтенд ВСЕГДА в фоне:**
```bash
cd frontend-react; npm start
# is_background: true  ← ОК для фронтенда
```

**Это правило обеспечивает оптимальный баланс между диагностикой проблем и интерактивностью разработки!**