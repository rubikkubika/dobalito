# PostgreSQL Configuration for Dobalito Backend

## Overview
The Dobalito backend is configured to work with PostgreSQL as the primary database.

## Configuration Files

### Main Configuration (`application.yml`)
- Database: PostgreSQL
- Connection URL: `jdbc:postgresql://localhost:5432/dobalito`
- Default credentials: `postgres/password`
- Hibernate dialect: PostgreSQL
- DDL mode: `update` (safe for production)

### Docker Compose (`docker/docker-compose.yml`)
- PostgreSQL 15 Alpine image
- Automatic database initialization
- Health checks for both PostgreSQL and backend
- Environment variable support

## Environment Variables

Create `.env.local` file in the `docker/` directory:

```bash
# PostgreSQL Configuration
POSTGRES_DB=dobalito
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

# Spring Boot Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/dobalito
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true

# Service Ports
BACKEND_PORT=8080
FRONTEND_PORT=3000
```

## Running with Docker

1. Copy environment file:
   ```bash
   cp docker/env.local.example docker/.env.local
   ```

2. Start services:
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```

3. Check logs:
   ```bash
   docker-compose -f docker/docker-compose.yml logs -f backend
   ```

## Local Development

For local development without Docker:

1. Install PostgreSQL locally
2. Create database:
   ```sql
   CREATE DATABASE dobalito;
   ```

3. Update `application.yml` with local connection:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/dobalito
       username: your_username
       password: your_password
   ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

## Database Schema

The application will automatically create tables based on JPA entities:
- `users` - User management
- `categories` - Task categories
- Additional tables as entities are added

## Troubleshooting

### Connection Issues
- Check PostgreSQL is running: `docker-compose -f docker/docker-compose.yml ps`
- Verify credentials in environment variables
- Check network connectivity between containers

### Schema Issues
- Set `JPA_DDL_AUTO=create-drop` for development
- Use `JPA_DDL_AUTO=validate` for production
- Check PostgreSQL logs for detailed errors

### Performance
- Monitor connection pool metrics
- Adjust HikariCP settings in `application.yml`
- Enable query logging for optimization
