# Настройка GitHub Actions для Dobalito

## Простая настройка (без внешних сервисов)

### Что делает этот workflow:
- ✅ Собирает Docker образы для backend и frontend
- ✅ Проверяет корректность docker-compose.yml
- ✅ Тестирует конфигурацию проекта
- ✅ Запускается при push в ветки `dev` и `main`
- ✅ Можно запустить вручную через GitHub UI

### Что НЕ требуется:
- ❌ Docker registry (Docker Hub, AWS ECR и т.д.)
- ❌ Внешний сервер для деплоя
- ❌ SSH ключи
- ❌ Секреты для базы данных

## Как запустить:

### 1. Автоматический запуск:
- Сделайте push в ветку `main`
- GitHub Actions автоматически запустится

### 2. Ручной запуск:
- Перейдите в `Actions` в вашем репозитории
- Выберите workflow "Build and Test"
- Нажмите "Run workflow"

## Что проверяется:

1. **Сборка Backend** - Docker образ Spring Boot приложения
2. **Сборка Frontend** - Docker образ React приложения  
3. **Конфигурация Docker Compose** - проверка синтаксиса
4. **Валидация env.local** - проверка переменных окружения

## Результат:

После успешного выполнения вы увидите:
```
✅ Backend image built successfully
✅ Frontend image built successfully  
✅ Docker Compose configuration is valid
🎉 All builds completed successfully!
```

## Если нужен полный деплой:

Когда у вас появится:
- Docker registry (Docker Hub, AWS ECR)
- Сервер для деплоя
- SSH доступ

Тогда можно будет использовать полную версию workflow с деплоем на сервер.

## Проверка работы:

1. Сделайте любой коммит и push в ветку `main`
2. Перейдите в `Actions` в GitHub
3. Увидите запущенный workflow "Build and Test"
4. Проверьте, что все шаги выполнились успешно
