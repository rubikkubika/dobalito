# Dobalito Frontend

Flutter веб-приложение для Android, iOS и Web платформ.

## Технологии

- **Flutter** - кроссплатформенный фреймворк
- **Dart SDK 3.9.2** - последняя версия языка программирования
- **Material Design 3** - современный дизайн
- **Provider** - управление состоянием
- **GoRouter** - навигация
- **Dio** - HTTP клиент
- **Shared Preferences** - локальное хранилище

## Структура проекта

```
frontend/
├── lib/
│   ├── core/           # Основная логика приложения
│   │   ├── config/     # Конфигурация
│   │   ├── providers/  # Провайдеры состояния
│   │   ├── router/     # Маршрутизация
│   │   ├── services/   # Сервисы
│   │   └── theme/      # Тема приложения
│   └── features/       # Функциональные модули
│       ├── home/       # Главная страница
│       ├── profile/    # Профиль пользователя
│       └── settings/   # Настройки
├── web/                # Веб-конфигурация
├── pubspec.yaml        # Зависимости
└── README.md
```

## Запуск

### Локальная разработка

```bash
# Установка зависимостей
flutter pub get

# Запуск в режиме разработки
flutter run -d chrome --web-port=3000
```

### Docker

```bash
# Из корневой папки проекта
docker-compose up frontend --build
```

## API интеграция

Приложение интегрируется с Spring Boot бэкендом через следующие endpoints:

- `GET /api/v1/health` - проверка состояния API
- `GET /api/v1/info` - информация о приложении
- `GET /api/v1/users/profile` - профиль пользователя
- `PUT /api/v1/users/profile` - обновление профиля

## Особенности

- ✅ Responsive дизайн для всех устройств
- ✅ Темная и светлая темы
- ✅ Современный Material Design 3
- ✅ Hot reload для быстрой разработки
- ✅ Tree-shaking для оптимизации размера
