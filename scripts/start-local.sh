#!/bin/bash
# Скрипт для запуска локальной разработки

echo "🚀 Запуск локальной разработки..."

# Копируем локальные переменные окружения
cp env.local .env

# Запускаем сервисы
docker-compose -f docker/docker-compose.yml up -d

echo "✅ Локальная разработка запущена!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080"
echo "🗄️  Database: localhost:5432"
