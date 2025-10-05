# 🐳 Docker конфигурация

Эта папка содержит все Docker файлы для контейнеризации приложения.

## 📁 Содержимое:

- `docker-compose.yml` - **Универсальная** конфигурация Docker Compose (локально + Railway)
- `Dockerfile.frontend` - Dockerfile для Flutter frontend
- `Dockerfile.fullstack` - Dockerfile для fullstack развертывания
- `nginx.conf` - Конфигурация Nginx для веб-сервера
- `railway.env` - Переменные окружения для Railway
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

## 🌐 Railway Deployment:

### 1. Настройка переменных окружения
Добавьте переменные из `railway.env` в настройки Railway проекта.

### 2. Автоматический деплой
Railway автоматически обнаружит `railway.toml` и использует `docker-compose.yml`.

## 🔧 Сервисы:

- **postgres** - PostgreSQL база данных (порт 5432)
- **backend** - Spring Boot API (порт 8080)
- **frontend** - Flutter Web приложение (порт 3000)

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

### Railway (`railway.env`):
```env
POSTGRES_DB=dobalito
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secure_password
SPRING_PROFILES_ACTIVE=railway
BACKEND_URL=http://backend:8080
```

## 🏥 Health Checks:

Все сервисы имеют настроенные health checks:
- **Backend**: `http://localhost:8080/api/v1/health`
- **Frontend**: `http://localhost:3000`
- **Database**: Автоматическая проверка через pg_isready
