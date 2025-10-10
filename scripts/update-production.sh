#!/bin/bash
# Скрипт для обновления в продакшене

echo "🔄 Обновление в продакшене..."

# Останавливаем сервисы
docker-compose -f docker/docker-compose.yml down

# Обновляем образы
docker-compose -f docker/docker-compose.yml pull

# Запускаем обновленные сервисы
docker-compose -f docker/docker-compose.yml up -d

echo "✅ Обновление завершено!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080"
