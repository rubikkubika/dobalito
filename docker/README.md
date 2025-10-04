# 🐳 Docker конфигурация

Эта папка содержит все Docker файлы для контейнеризации приложения.

## 📁 Содержимое:

- `docker-compose.yml` - Основная конфигурация Docker Compose
- `Dockerfile.frontend` - Dockerfile для Flutter frontend
- `Dockerfile.fullstack` - Dockerfile для fullstack развертывания
- `nginx.conf` - Конфигурация Nginx для веб-сервера

## 🚀 Запуск:

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```

## 🔧 Сервисы:

- **Frontend** - Flutter Web приложение (порт 3000)
- **Backend** - Spring Boot API (порт 8080)
- **Database** - PostgreSQL (порт 5432)

## 📝 Переменные окружения:

Создайте файл `.env` в корне проекта:

```env
POSTGRES_DB=dobalito
POSTGRES_USER=dobalito
POSTGRES_PASSWORD=password
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```
