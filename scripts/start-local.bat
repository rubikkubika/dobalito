@echo off
REM Скрипт для запуска локальной разработки на Windows

echo 🚀 Запуск локальной разработки...

REM Копируем локальные переменные окружения
copy env.local .env

REM Запускаем сервисы
docker-compose -f docker/docker-compose.yml up -d

echo ✅ Локальная разработка запущена!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:8080
echo 🗄️  Database: localhost:5432
