@echo off
REM Скрипт для остановки всех сервисов на Windows

echo 🛑 Остановка всех сервисов...

docker-compose -f docker/docker-compose.yml down

echo ✅ Все сервисы остановлены!
