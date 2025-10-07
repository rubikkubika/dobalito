# Dobalito Backend

Spring Boot REST API для React приложения.

## Технологии

- **Spring Boot 3.2.0** - Java фреймворк
- **Spring Security** - безопасность
- **Spring Web** - REST API
- **Spring Data JPA** - работа с базой данных
- **Maven** - управление зависимостями
- **PostgreSQL** - база данных
- **SpringDoc OpenAPI** - API документация
- **Docker** - контейнеризация

## Структура проекта

```
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── dobalito/
│       │           ├── config/      # Конфигурация
│       │           ├── controller/  # REST контроллеры
│       │           ├── dto/         # Data Transfer Objects
│       │           ├── entity/      # JPA сущности
│       │           ├── repository/  # Репозитории
│       │           └── service/     # Бизнес логика
│       └── resources/
│           └── application.yml     # Конфигурация приложения
├── pom.xml                         # Maven конфигурация
├── Dockerfile                      # Docker образ
└── README.md
```

## API Endpoints

### Общие
- `GET /api/v1/health` - проверка состояния сервиса
- `GET /api/v1/info` - информация о приложении

### Пользователи
- `GET /api/v1/users/profile` - получение профиля пользователя
- `PUT /api/v1/users/profile` - обновление профиля пользователя

## Запуск

### Локальная разработка

```bash
# Сборка проекта
mvn clean package

# Запуск приложения
java -jar target/dobalito-backend-1.0.0.jar
```

### Docker

```bash
# Из корневой папки проекта
docker-compose up backend --build
```

## Конфигурация

Основные настройки в `src/main/resources/application.yml`:

```yaml
server:
  port: 8080

spring:
  application:
    name: dobalito-backend
  
  # Database Configuration
  datasource:
    url: jdbc:postgresql://localhost:5432/dobalito
    driver-class-name: org.postgresql.Driver
    username: postgres
    password: root
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect

# OpenAPI/Swagger Configuration
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

## Особенности

- ✅ RESTful API архитектура
- ✅ CORS настроен для фронтенда
- ✅ Безопасность через Spring Security
- ✅ Готовность к масштабированию
- ✅ Логирование и мониторинг
