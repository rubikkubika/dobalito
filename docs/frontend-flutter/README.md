# Flutter Frontend Documentation

## Обзор

Flutter фронтенд для приложения Dobalito - кроссплатформенное приложение для Android, iOS и Web.

## Структура проекта

```
frontend-flutter/
├── lib/
│   ├── core/           # Основная логика приложения
│   │   ├── config/     # Конфигурация
│   │   ├── providers/  # Провайдеры состояния
│   │   ├── router/     # Маршрутизация
│   │   ├── services/   # Сервисы
│   │   ├── theme/      # Темы
│   │   └── widgets/    # Общие виджеты
│   └── features/       # Функциональные модули
│       ├── home/       # Главная страница
│       ├── profile/    # Профиль пользователя
│       ├── settings/   # Настройки
│       └── designs/    # Галерея дизайнов
├── web/                # Веб-конфигурация
├── build/              # Собранные файлы
├── pubspec.yaml        # Зависимости
└── README.md           # Документация
```

## Технологии

- **Flutter 3.x** - Основной фреймворк
- **Provider** - Управление состоянием
- **Go Router** - Навигация
- **Dio** - HTTP клиент
- **Shared Preferences** - Локальное хранилище

## Быстрый старт

### Установка зависимостей
```bash
cd frontend-flutter
flutter pub get
```

### Запуск в режиме разработки
```bash
# Web
flutter run -d web-server --web-port 3000

# Android
flutter run

# iOS
flutter run
```

### Сборка для продакшена
```bash
# Web
flutter build web --release

# Android
flutter build apk --release

# iOS
flutter build ios --release
```

## API интеграция

Приложение использует Spring Boot backend API:

- `GET /api/v1/health` - Статус API
- `GET /api/v1/info` - Информация о приложении
- `GET /api/v1/users/profile` - Получить профиль
- `PUT /api/v1/users/profile` - Обновить профиль

## Особенности

- **Кроссплатформенность** - один код для всех платформ
- **Адаптивный дизайн** - работает на всех размерах экранов
- **Material Design 3** - современный UI
- **Горячая перезагрузка** - быстрая разработка
- **Оптимизированная производительность** - быстрая работа

## Структура компонентов

### Core
- **AppConfig** - конфигурация приложения
- **AppProvider** - глобальное состояние
- **AppRouter** - маршрутизация
- **ApiService** - HTTP клиент
- **StorageService** - локальное хранилище
- **AppTheme** - темы приложения

### Features
- **HomePage** - главная страница с функциями
- **ProfilePage** - профиль пользователя
- **SettingsPage** - настройки приложения
- **DesignsPage** - галерея дизайнов

## Разработка

1. **Редактируйте файлы** в папке `lib/`
2. **Добавляйте новые страницы** в `lib/features/`
3. **Создавайте виджеты** в `lib/core/widgets/`
4. **Обновляйте API** в `lib/core/services/`
5. **Настраивайте маршруты** в `lib/core/router/`

## Docker

Для запуска через Docker используйте:

```bash
# Сборка образа
docker build -f docker/Dockerfile.frontend -t dobalito-flutter .

# Запуск контейнера
docker run -p 3000:3000 dobalito-flutter
```

## Лицензия

MIT License
