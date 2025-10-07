# API Пользователей

## Описание
API для управления пользователями с поддержкой загрузки аватарок.

## Сущность User
```json
{
  "id": 1,
  "name": "Иван Петров",
  "email": "ivan.petrov@example.com",
  "avatar": "https://via.placeholder.com/150",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

## Endpoints

### 1. Получить всех пользователей
```
GET /api/v1/users
```
**Ответ:** Массив пользователей

### 2. Получить пользователя по ID
```
GET /api/v1/users/{id}
```
**Ответ:** Объект пользователя или 404

### 3. Создать пользователя
```
POST /api/v1/users
Content-Type: application/json

{
  "name": "Новый Пользователь",
  "email": "new@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

### 4. Обновить пользователя
```
PUT /api/v1/users/{id}
Content-Type: application/json

{
  "name": "Обновленное Имя",
  "email": "updated@example.com"
}
```

### 5. Удалить пользователя
```
DELETE /api/v1/users/{id}
```

### 6. Поиск пользователей
```
GET /api/v1/users/search?q=поисковый_запрос
```
**Параметры:**
- `q` - поисковый запрос (поиск по имени и email)

### 7. Загрузить аватарку
```
POST /api/v1/users/{id}/avatar
Content-Type: multipart/form-data

file: [файл изображения]
```
**Ограничения:**
- Максимальный размер файла: 10MB
- Поддерживаемые форматы: JPG, PNG, GIF
- Файл сохраняется в папке `uploads/avatars/`

### 8. Удалить аватарку
```
DELETE /api/v1/users/{id}/avatar
```

### 9. Получить аватарку
```
GET /api/v1/users/avatar/{filename}
```
**Ответ:** Файл изображения

### 10. Получить профиль (совместимость)
```
GET /api/v1/users/profile
```
**Ответ:** Первый пользователь из базы или создает тестового

## Примеры использования

### Создание пользователя с аватаркой
```bash
# 1. Создать пользователя
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Тест Пользователь", "email": "test@example.com"}'

# 2. Загрузить аватарку (ID = 1)
curl -X POST http://localhost:8080/api/v1/users/1/avatar \
  -F "file=@avatar.jpg"
```

### Поиск пользователей
```bash
curl "http://localhost:8080/api/v1/users/search?q=Иван"
```

## База данных
- Используется H2 in-memory база данных
- Консоль H2 доступна по адресу: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

## Тестовые данные
При запуске приложения автоматически создаются 5 тестовых пользователей:
1. Иван Петров (с аватаркой)
2. Мария Сидорова (с аватаркой)
3. Алексей Козлов (без аватарки)
4. Елена Волкова (с аватаркой)
5. Дмитрий Новиков (без аватарки)

