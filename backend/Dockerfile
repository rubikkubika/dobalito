# ============================
# Stage 1 — Build with Maven
# ============================
FROM maven:3.9-eclipse-temurin-17-alpine AS builder

# Рабочая директория
WORKDIR /app

# 1️⃣ Копируем pom.xml и settings.xml для кэша зависимостей
COPY backend/pom.xml ./

# 2️⃣ Предзагружаем зависимости (кэшируется отдельно от исходников)
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B dependency:go-offline

# 3️⃣ Копируем исходники
COPY backend/src ./src

# 4️⃣ Собираем JAR, используя кэш Maven
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B clean package -DskipTests

# ============================
# Stage 2 — Runtime
# ============================
FROM eclipse-temurin:17-jre-alpine AS production

# Минимальный образ с утилитами
RUN apk add --no-cache curl

WORKDIR /app

# 5️⃣ Копируем собранный JAR из builder stage
COPY --from=builder /app/target/*.jar app.jar

# 6️⃣ Прописываем переменные окружения (опционально)
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# 7️⃣ Healthcheck для Kubernetes / Compose
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

EXPOSE 8080

# 8️⃣ Запуск приложения
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
