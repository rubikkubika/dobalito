#!/bin/bash
# Скрипт для остановки всех сервисов

echo "🛑 Остановка всех сервисов..."

docker-compose -f docker/docker-compose.yml down

echo "✅ Все сервисы остановлены!"