# Dobalito React Frontend

React фронтенд для приложения Dobalito с использованием TypeScript и Material-UI.

## Технологии

- **React 19.2.0** - Основной фреймворк
- **TypeScript** - Типизация
- **Material-UI (MUI)** - UI компоненты
- **React Router** - Маршрутизация
- **Axios** - HTTP клиент
- **Context API** - Управление состоянием

## Структура проекта

```
frontend-react/
├── src/
│   ├── components/          # React компоненты
│   │   ├── Layout.tsx       # Основной макет
│   │   └── FeatureCard.tsx  # Карточка функции
│   ├── pages/               # Страницы приложения
│   │   ├── HomePage.tsx     # Главная страница
│   │   ├── ProfilePage.tsx  # Профиль пользователя
│   │   ├── SettingsPage.tsx # Настройки
│   │   └── DesignsPage.tsx # Галерея дизайнов
│   ├── services/            # API сервисы
│   │   └── apiService.ts    # HTTP клиент
│   ├── context/             # State management
│   │   └── AppContext.tsx   # Контекст приложения
│   ├── types/               # TypeScript типы
│   │   └── index.ts         # Определения типов
│   ├── utils/               # Утилиты
│   │   └── helpers.ts       # Вспомогательные функции
│   ├── App.tsx              # Главный компонент
│   └── index.tsx            # Точка входа
├── public/                  # Статические файлы
├── package.json             # Зависимости
└── README.md                # Документация
```

## Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm start
```

### Сборка для продакшена
```bash
npm run build
```

### Запуск тестов
```bash
npm test
```

## API интеграция

Приложение использует тот же backend API что и Flutter версия:

- `GET /api/v1/health` - Статус API
- `GET /api/v1/info` - Информация о приложении
- `GET /api/v1/users/profile` - Получить профиль
- `PUT /api/v1/users/profile` - Обновить профиль

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
REACT_APP_API_URL=http://localhost:8080
```

## Docker

Для запуска через Docker используйте:

```bash
# Сборка образа
docker build -f docker/Dockerfile.frontend-react -t dobalito-react .

# Запуск контейнера
docker run -p 3000:3000 dobalito-react

# Или через docker-compose (рекомендуется)
docker-compose -f docker/docker-compose.yml up frontend-react
```

## Особенности

- **Адаптивный дизайн** - работает на всех устройствах
- **Material Design 3** - современный UI
- **TypeScript** - полная типизация
- **Context API** - простое управление состоянием
- **Axios interceptors** - автоматическая обработка ошибок
- **Responsive utilities** - утилиты для адаптивности

## Разработка

1. **Редактируйте файлы** в папке `src/`
2. **Добавляйте новые страницы** в `src/pages/`
3. **Создавайте компоненты** в `src/components/`
4. **Обновляйте типы** в `src/types/`
5. **Настраивайте API** в `src/services/`

## Структура компонентов

### Layout
Основной макет с боковой панелью навигации и адаптивным дизайном.

### Pages
- **HomePage** - главная страница с функциями приложения
- **ProfilePage** - профиль пользователя с возможностью редактирования
- **SettingsPage** - настройки приложения
- **DesignsPage** - галерея дизайнов

### Services
- **apiService** - HTTP клиент с interceptors для авторизации и обработки ошибок

### Context
- **AppContext** - глобальное состояние приложения (пользователь, загрузка, ошибки)

## Лицензия

MIT License