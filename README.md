# Dobalito

Простое многоплатформенное приложение на Flutter с бэкендом на Spring Boot.

## Архитектура

- **Frontend**: Flutter (Android, iOS, Web)
- **Backend**: Spring Boot REST API
- **Containerization**: Docker & Docker Compose

## Структура проекта

```
dobalito/
├── frontend/                     # Flutter приложение
│   ├── lib/                     # Dart код
│   │   ├── core/                # Основные компоненты
│   │   │   ├── config/          # Конфигурация
│   │   │   ├── providers/       # State management
│   │   │   ├── router/          # Навигация
│   │   │   ├── services/        # Сервисы
│   │   │   └── theme/           # Темы
│   │   └── features/            # Функциональные модули
│   │       ├── home/            # Главная страница
│   │       ├── profile/         # Профиль пользователя
│   │       └── settings/       # Настройки
│   ├── web/                     # Веб-конфигурация
│   ├── build/                   # Собранные файлы
│   ├── pubspec.yaml             # Flutter зависимости
│   └── README.md                # Документация фронтенда
├── backend/                     # Spring Boot API
│   ├── src/main/java/com/dobalito/
│   │   ├── config/              # Конфигурация
│   │   └── controller/          # REST контроллеры
│   ├── src/main/resources/      # Ресурсы
│   ├── pom.xml                  # Maven зависимости
│   ├── Dockerfile               # Backend Docker образ
│   └── README.md                # Документация бэкенда
├── docker/                      # Docker конфигурация
│   ├── docker-compose.yml      # Основная конфигурация
│   ├── Dockerfile.frontend      # Frontend Docker образ
│   ├── Dockerfile.fullstack     # Fullstack Docker образ
│   ├── nginx.conf              # Nginx конфигурация
│   └── README.md               # Docker документация
├── config/                      # Конфигурация
│   ├── database/               # SQL скрипты
│   │   └── init.sql            # Инициализация БД
│   └── README.md               # Конфигурация документация
├── scripts/                     # Скрипты
│   ├── start.sh                # Запуск сервисов
│   ├── start.bat               # Запуск сервисов (Windows)
│   ├── stop.sh                 # Остановка сервисов
│   ├── dev.sh                  # Разработка
│   ├── start-simple.sh         # Простой запуск
│   ├── generate-nginx-config.sh # Генерация nginx конфига
│   └── railway/                # Railway скрипты
├── deploy/                      # Деплой
│   ├── DEPLOYMENT.md           # Подробная инструкция
│   ├── QUICK_DEPLOY.md         # Быстрая инструкция
│   ├── build-web.bat           # Windows сборка
│   ├── build-web.sh            # Linux/Mac сборка
│   └── README.md               # Деплой документация
├── Dockerfile.frontend         # Frontend Docker образ
└── nginx.conf                  # Nginx конфигурация
```

## Быстрый старт

Этот проект использует современную архитектуру с микросервисами и контейнеризацией для обеспечения быстрого развертывания и масштабируемости.

### Предварительные требования

- Docker и Docker Compose
- Flutter SDK (для разработки)
- Java 17+ (для разработки)

### Запуск через Docker (рекомендуется)

1. **Клонируйте репозиторий**
   ```bash
   git clone <repository-url>
   cd dobalito
   ```

2. **Быстрый запуск (РЕКОМЕНДУЕТСЯ)**
   ```bash
   # Windows - автоматически откроет фронтенд в браузере
   scripts/start.bat
   
   # Linux/Mac - автоматически откроет фронтенд в браузере
   chmod +x scripts/start.sh
   ./scripts/start.sh
   ```
   
   ⚠️ **НЕ ИСПОЛЬЗУЙТЕ** `docker-compose up` напрямую - это медленнее!

3. **Готово!**
   - ✅ Фронтенд автоматически откроется в браузере: http://localhost:3000
   - ✅ Backend API доступен по адресу: http://localhost:8080/api/v1
   - ✅ База данных PostgreSQL: localhost:5432

### ⚡ Оптимизация сборки

Проект настроен для быстрой сборки с использованием:
- **Многоэтапная сборка** - уменьшает размер финальных образов
- **Кэширование зависимостей** - Maven и Flutter зависимости кэшируются
- **BuildKit** - ускоренная сборка Docker образов
- **.dockerignore** - исключение ненужных файлов из контекста сборки

### 📋 Правила запуска

1. **Обязательно используйте быстрый запуск** - скрипты автоматически оптимизируют сборку
2. **После запуска автоматически открывается фронтенд** в браузере
3. **Не используйте `docker-compose up` напрямую** - это медленнее и менее удобно

📖 **Подробные правила разработки:** [docs/development-rules.md](docs/development-rules.md)  
⚡ **Быстрый старт:** [docs/README.md](docs/README.md)  
👤 **Правила для пользователя:** [docs/user-rules.md](docs/user-rules.md)

### Разработка

1. **Запустите только базу данных**
   ```bash
   chmod +x scripts/dev.sh
   ./scripts/dev.sh
   ```

2. **Запустите бэкенд**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. **Запустите Flutter приложение**
   ```bash
   cd frontend
   flutter run -d web-server --web-port 3000
   ```

## API Endpoints

### Общие

- `GET /api/v1/health` - Статус API
- `GET /api/v1/info` - Информация о приложении

### Пользователи

- `GET /api/v1/users/profile` - Получить профиль
- `PUT /api/v1/users/profile` - Обновить профиль

## Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# API Configuration
API_BASE_URL=http://localhost:8080
API_VERSION=/api/v1

# Database Configuration
DB_USERNAME=postgres
DB_PASSWORD=password
DB_URL=jdbc:postgresql://localhost:5432/dobalito

# JWT Configuration
JWT_SECRET=mySecretKey123456789012345678901234567890
```

## Разработка

### Flutter

```bash
# Переход в папку фронтенда
cd frontend

# Установка зависимостей
flutter pub get

# Запуск в режиме разработки
flutter run

# Сборка для веб
flutter build web

# Сборка для Android
flutter build apk

# Сборка для iOS
flutter build ios
```

### Spring Boot

```bash
# Запуск приложения
./mvnw spring-boot:run

# Сборка JAR
./mvnw clean package

# Запуск тестов
./mvnw test
```

## Docker команды

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down

# Пересборка и запуск
docker-compose up --build -d
```

## Структура базы данных

### Таблица app_info

| Поле | Тип | Описание |
|------|-----|----------|
| id | BIGSERIAL | Первичный ключ |
| name | VARCHAR(100) | Название приложения |
| version | VARCHAR(20) | Версия |
| description | TEXT | Описание |
| created_at | TIMESTAMP | Дата создания |

## Технологии

### Frontend
- Flutter 3.x
- Provider (State Management)
- Go Router (Navigation)
- Dio (HTTP Client)
- Shared Preferences (Local Storage)

### Backend
- Spring Boot 3.2
- Spring Security (упрощенная конфигурация)
- PostgreSQL Driver

### DevOps
- Docker
- Docker Compose
- Nginx (Reverse Proxy)

## Лицензия

MIT License
