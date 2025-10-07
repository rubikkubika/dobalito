# Dobalito Backend - Полная документация

## 🏗️ Архитектура

### Структура проекта
```
backend/src/main/java/com/dobalito/
├── config/                 # Конфигурации
│   ├── DataLoader.java     # Загрузка тестовых данных
│   ├── FileUploadConfig.java # Конфигурация загрузки файлов
│   ├── OpenApiConfig.java  # Swagger/OpenAPI конфигурация
│   └── SecurityConfig.java # Безопасность
├── controller/             # REST контроллеры
│   ├── AdminController.java # Административные функции
│   ├── AppController.java  # Основные эндпоинты
│   ├── CategoryController.java # Управление категориями
│   └── UserController.java # Управление пользователями
├── dto/                    # Data Transfer Objects
│   ├── CategoryCreateRequest.java
│   ├── CategoryResponse.java
│   └── CategoryUpdateRequest.java
├── entity/                 # JPA сущности
│   ├── Category.java       # Категории услуг
│   └── User.java          # Пользователи
├── exception/              # Обработка исключений
│   ├── GlobalExceptionHandler.java
│   ├── ResourceAlreadyExistsException.java
│   ├── ResourceNotFoundException.java
│   └── ValidationException.java
├── repository/             # JPA репозитории
│   ├── CategoryRepository.java
│   └── UserRepository.java
├── service/                # Бизнес-логика
│   ├── CategoryService.java
│   └── UserService.java
└── DobalitoApplication.java # Главный класс приложения
```

## 🚀 Основные функции

### 1. Управление пользователями
- ✅ CRUD операции для пользователей
- ✅ Загрузка и управление аватарками
- ✅ Поиск пользователей по имени/email
- ✅ Валидация данных

### 2. Управление категориями
- ✅ CRUD операции для категорий
- ✅ Активация/деактивация категорий
- ✅ Поиск по имени и описанию
- ✅ Фильтрация активных категорий
- ✅ Цветовая схема и иконки

### 3. Административные функции
- ✅ Статистика системы
- ✅ Информация о системе
- ✅ Мониторинг ресурсов

### 4. API документация
- ✅ Swagger UI интерфейс
- ✅ OpenAPI спецификация
- ✅ Интерактивная документация

## 📊 API Endpoints

### Основные эндпоинты
```
GET  /api/v1/health          # Проверка состояния
GET  /api/v1/info            # Информация о приложении
```

### Пользователи
```
GET    /api/v1/users                    # Все пользователи
GET    /api/v1/users/{id}               # Пользователь по ID
POST   /api/v1/users                    # Создать пользователя
PUT    /api/v1/users/{id}               # Обновить пользователя
DELETE /api/v1/users/{id}               # Удалить пользователя
GET    /api/v1/users/search?q=query     # Поиск пользователей
POST   /api/v1/users/{id}/avatar        # Загрузить аватарку
DELETE /api/v1/users/{id}/avatar        # Удалить аватарку
GET    /api/v1/users/avatar/{filename}  # Получить аватарку
GET    /api/v1/users/profile            # Профиль пользователя
PUT    /api/v1/users/profile            # Обновить профиль
```

### Категории
```
GET    /api/v1/categories                    # Все категории
GET    /api/v1/categories/active            # Активные категории
GET    /api/v1/categories/{id}               # Категория по ID
GET    /api/v1/categories/name/{name}        # Категория по имени
POST   /api/v1/categories                   # Создать категорию
PUT    /api/v1/categories/{id}               # Обновить категорию
DELETE /api/v1/categories/{id}               # Удалить категорию
PUT    /api/v1/categories/{id}/activate      # Активировать
PUT    /api/v1/categories/{id}/deactivate    # Деактивировать
GET    /api/v1/categories/search?q=query     # Поиск категорий
GET    /api/v1/categories/search/active?q=   # Поиск активных
GET    /api/v1/categories/with-icons         # С иконками
GET    /api/v1/categories/color/{color}      # По цвету
```

### Администрирование
```
GET    /api/v1/admin/stats        # Статистика системы
GET    /api/v1/admin/system-info  # Информация о системе
```

### Документация
```
GET    /api-docs          # OpenAPI спецификация
GET    /swagger-ui.html   # Swagger UI интерфейс
```

## 🗄️ База данных

### H2 In-Memory Database
- **URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** `password`
- **Console:** `http://localhost:8080/h2-console`

### Таблицы

#### Users
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    avatar VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

#### Categories
```sql
CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    icon VARCHAR(100),
    color VARCHAR(7),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

## 🔧 Конфигурация

### application.yml
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driverClassName: org.h2.Driver
    username: sa
    password: password
  
  h2:
    console:
      enabled: true
      path: /h2-console
  
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
  
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

## 📦 Зависимости

### Основные
- **Spring Boot 3.2.0** - Основной фреймворк
- **Spring Data JPA** - Работа с базой данных
- **Spring Security** - Безопасность
- **Spring Web** - REST API
- **H2 Database** - In-memory база данных

### Дополнительные
- **Spring Boot Validation** - Валидация данных
- **SpringDoc OpenAPI** - API документация
- **Commons FileUpload** - Загрузка файлов
- **Commons IO** - Работа с файлами

## 🚀 Запуск

### Локально
```bash
cd backend
mvn spring-boot:run
```

### Docker
```bash
docker-compose -f docker/docker-compose.yml up -d
```

## 📋 Тестовые данные

При запуске автоматически создаются:

### Пользователи (5)
- Иван Петров (с аватаркой)
- Мария Сидорова (с аватаркой)
- Алексей Козлов (без аватарки)
- Елена Волкова (с аватаркой)
- Дмитрий Новиков (без аватарки)

### Категории (5)
- 🏄‍♂️ **Серфинг** (#00B4DB)
- 🚴‍♂️ **Аренда байка** (#FF6B6B)
- 🗺️ **Туризм** (#4ECDC4)
- 🍽️ **Еда и напитки** (#45B7D1)
- 💪 **Спорт и фитнес** (#96CEB4)

## 🔍 Мониторинг

### Health Check
```bash
curl http://localhost:8080/api/v1/health
```

### Статистика
```bash
curl http://localhost:8080/api/v1/admin/stats
```

### Системная информация
```bash
curl http://localhost:8080/api/v1/admin/system-info
```

## 🛡️ Безопасность

- **CORS** настроен для всех источников
- **CSRF** отключен для API
- **Валидация** входных данных
- **Обработка ошибок** с детальными сообщениями

## 📚 Документация API

После запуска приложения доступна интерактивная документация:
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON:** `http://localhost:8080/api-docs`

## 🔄 Интеграция с фронтендом

API полностью совместим с React фронтендом:
- ✅ CORS настроен
- ✅ JSON формат данных
- ✅ Обработка ошибок
- ✅ Валидация данных
- ✅ Загрузка файлов

