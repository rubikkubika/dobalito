# 🐳 Docker конфигурация

Эта папка содержит все Docker файлы для контейнеризации приложения.

## 📁 Содержимое:

- `docker-compose.yml` - Конфигурация Docker Compose для локальной разработки
- `Dockerfile.frontend` - Dockerfile для Flutter frontend
- `Dockerfile.frontend-react` - Dockerfile для React frontend
- `nginx.conf` - Конфигурация Nginx для Flutter веб-сервера
- `nginx-react.conf` - Конфигурация Nginx для React веб-сервера
- `env.local.example` - Пример переменных для локальной разработки

## 🚀 Локальная разработка:

### 1. Создайте файл `.env.local`:
```bash
cp env.local.example .env.local
```

### 2. Запустите сервисы:
```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```


## 🔧 Сервисы:

- **postgres** - PostgreSQL база данных (порт 5432)
- **backend** - Spring Boot API (порт 8080)
- **frontend-react** - React Web приложение (порт 3000)

## 📝 Переменные окружения:

### Локально (`.env.local`):
```env
CONTAINER_NAME_PREFIX=dobalito
NETWORK_NAME=dobalito-network
POSTGRES_DB=dobalito
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
SPRING_PROFILES_ACTIVE=local
BACKEND_URL=http://localhost:8080
```


## 🏥 Health Checks:

Все сервисы имеют настроенные health checks:
- **Backend**: `http://localhost:8080/api/v1/health`
- **Frontend-React**: `http://localhost:3000`
- **Database**: Автоматическая проверка через pg_isready
