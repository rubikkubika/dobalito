#!/bin/bash
# Скрипт для запуска в продакшене

echo "🚀 Запуск в продакшене..."

# Копируем продакшен переменные окружения
cp env.production .env

# Запускаем сервисы
docker-compose -f docker/docker-compose.yml up -d

echo "✅ Продакшен запущен!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080"
