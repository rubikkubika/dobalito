# Dobalito Backend

Spring Boot REST API для Flutter приложения.

## Технологии

- **Spring Boot 3.x** - Java фреймворк
- **Spring Security** - безопасность
- **Spring Web** - REST API
- **Maven** - управление зависимостями
- **PostgreSQL** - база данных
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
```

## Особенности

- ✅ RESTful API архитектура
- ✅ CORS настроен для фронтенда
- ✅ Безопасность через Spring Security
- ✅ Готовность к масштабированию
- ✅ Логирование и мониторинг
