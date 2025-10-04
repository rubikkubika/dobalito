#!/bin/bash

# Переходим в папку frontend
cd frontend

# Устанавливаем зависимости
flutter pub get

# Собираем для веб
flutter build web --release

echo "✅ Flutter Web сборка завершена!"
echo "📁 Файлы находятся в: frontend/build/web/"
