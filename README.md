# Dobalito

Современное веб-приложение с React фронтендом и Spring Boot бэкендом.

## Архитектура

- **Frontend**: React + TypeScript + Material-UI (Web)
- **Backend**: Spring Boot REST API
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose

## Структура проекта

```
dobalito/
├── frontend-react/               # React приложение
│   ├── src/                     # TypeScript код
│   │   ├── components/          # React компоненты
│   │   ├── pages/               # Страницы приложения
│   │   ├── services/            # API сервисы
│   │   ├── context/             # State management
│   │   ├── types/               # TypeScript типы
│   │   └── utils/               # Утилиты
│   ├── public/                  # Статические файлы
│   ├── package.json             # React зависимости
│   └── README.md                # Документация фронтенда
├── backend/                     # Spring Boot API
│   ├── src/main/java/com/dobalito/
│   │   ├── config/              # Конфигурация
│   │   └── controller/          # REST контроллеры
│   ├── src/main/resources/      # Ресурсы
│   ├── pom.xml                  # Maven зависимости
│   ├── Dockerfile               # Backend Docker образ
│   └── README.md                # Документация бэкенда
├── docs/                        # 📚 ВСЯ ДОКУМЕНТАЦИЯ
│   ├── development/             # Правила разработки
│   ├── user-guide/              # Руководства пользователя
│   ├── api/                     # API документация
│   ├── deployment/              # Развертывание
│   ├── architecture/            # Архитектура системы
│   └── README.md                # Главная документация
├── docker/                      # Docker конфигурация
│   ├── docker-compose.yml      # Основная конфигурация
│   ├── Dockerfile.frontend-react # React Frontend Docker образ
│   ├── Dockerfile.frontend     # Flutter Frontend Docker образ
│   ├── nginx.conf              # Nginx конфигурация для Flutter
│   ├── nginx-react.conf        # Nginx конфигурация для React
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
│   └── generate-nginx-config.sh # Генерация nginx конфига
├── deploy/                      # Деплой
│   ├── deployment.md           # Подробная инструкция
│   ├── quick-deploy.md         # Быстрая инструкция
│   └── README.md               # Деплой документация
├── temp/                        # Временные файлы (игнорируется git)
└── README.md                    # Этот файл
```

## Быстрый старт

Этот проект использует современную архитектуру с микросервисами и контейнеризацией для обеспечения быстрого развертывания и масштабируемости.

### Предварительные требования

- Docker и Docker Compose
- Node.js 18+ (для разработки)
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
   - ✅ React фронтенд: http://localhost:3000
   - ✅ Backend API: http://localhost:8080/api/v1
   - ✅ База данных PostgreSQL: localhost:5432

### ⚡ Оптимизация сборки

Проект настроен для быстрой сборки с использованием:
- **Многоэтапная сборка** - уменьшает размер финальных образов
- **Кэширование зависимостей** - Maven и npm зависимости кэшируются
- **BuildKit** - ускоренная сборка Docker образов
- **.dockerignore** - исключение ненужных файлов из контекста сборки

### 📋 Правила запуска

1. **Обязательно используйте быстрый запуск** - скрипты автоматически оптимизируют сборку
2. **После запуска автоматически открывается фронтенд** в браузере
3. **Не используйте `docker-compose up` напрямую** - это медленнее и менее удобно

📖 **Полная документация:** [docs/README.md](docs/README.md)  
🔧 **Правила разработки:** [docs/development/](docs/development/)  
👤 **Руководства пользователя:** [docs/user-guide/](docs/user-guide/)  
🌐 **API документация:** [docs/api/](docs/api/)  
🚀 **Развертывание:** [docs/deployment/](docs/deployment/)  
🏗️ **Архитектура:** [docs/architecture/](docs/architecture/)

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

3. **Запустите React приложение**
   ```bash
   cd frontend-react
   npm start
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

### React

```bash
# Переход в папку фронтенда
cd frontend-react

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build

# Запуск тестов
npm test
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

### PostgreSQL Database

**Подключение:**
- URL: `jdbc:postgresql://localhost:5432/dobalito`
- Username: `postgres`
- Password: `root` (локально) / `password` (Docker)

### Таблицы

#### app_info
| Поле | Тип | Описание |
|------|-----|----------|
| id | BIGSERIAL | Первичный ключ |
| name | VARCHAR(100) | Название приложения |
| version | VARCHAR(20) | Версия |
| description | TEXT | Описание |
| created_at | TIMESTAMP | Дата создания |

#### users
| Поле | Тип | Описание |
|------|-----|----------|
| id | BIGSERIAL | Первичный ключ |
| name | VARCHAR(100) | Имя пользователя |
| email | VARCHAR(255) | Email (уникальный) |
| avatar | VARCHAR(500) | URL аватарки |
| created_at | TIMESTAMP | Дата создания |
| updated_at | TIMESTAMP | Дата обновления |

#### categories
| Поле | Тип | Описание |
|------|-----|----------|
| id | BIGSERIAL | Первичный ключ |
| name | VARCHAR(100) | Название категории (уникальное) |
| english_name | VARCHAR(100) | Английское название |
| description | VARCHAR(500) | Описание |
| icon | VARCHAR(100) | Иконка/эмодзи |
| color | VARCHAR(7) | Hex-код цвета |
| is_active | BOOLEAN | Статус активности |
| created_at | TIMESTAMP | Дата создания |
| updated_at | TIMESTAMP | Дата обновления |

## Технологии

### Frontend
- React 19.2.0
- TypeScript
- Material-UI (MUI)
- React Router
- Axios (HTTP Client)
- Context API (State Management)

### Backend
- Spring Boot 3.2.0
- Spring Security (упрощенная конфигурация)
- PostgreSQL Driver
- Spring Data JPA
- SpringDoc OpenAPI

### DevOps
- Docker
- Docker Compose
- Nginx (Reverse Proxy)

## Лицензия

MIT License
