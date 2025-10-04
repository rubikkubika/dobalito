@echo off
echo 🚀 Сборка Flutter Web приложения...

cd frontend

echo 📦 Установка зависимостей...
flutter pub get

echo 🔨 Сборка для веб...
flutter build web --release

echo ✅ Flutter Web сборка завершена!
echo 📁 Файлы находятся в: frontend\build\web\
echo 🌐 Готово к деплою!

pause
