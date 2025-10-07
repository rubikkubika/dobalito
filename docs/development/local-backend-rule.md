# 🏠 Правило локального запуска бэкенда

## Когда пользователь говорит "запустить бэк локально":

### ✅ ОБЯЗАТЕЛЬНО:
1. **Создать базу данных `dobalito`** (если не существует):
   ```bash
   $env:PGPASSWORD="root"; & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -h localhost -c "CREATE DATABASE dobalito;"
   ```

2. **Запустить бэкенд с локальной БД**:
   ```bash
   cd backend; $env:SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/dobalito"; $env:SPRING_DATASOURCE_USERNAME="postgres"; $env:SPRING_DATASOURCE_PASSWORD="root"; mvn spring-boot:run
   ```

### 🔧 Параметры подключения:
- **База данных**: `dobalito` (локальная PostgreSQL)
- **Хост**: `localhost:5432`
- **Логин**: `postgres`
- **Пароль**: `root`

### ❌ НЕ ИСПОЛЬЗОВАТЬ:
- Docker базу данных
- Базу данных `postgres` (системную)
- H2 базу данных

### ✅ ПРОВЕРИТЬ:
- Бэкенд доступен: `curl.exe --max-time 10 -s http://localhost:8080/api/v1/health`
- Порт слушает: `netstat -ano | findstr :8080`
