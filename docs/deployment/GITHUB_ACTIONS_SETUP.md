# Настройка GitHub Actions для автоматического деплоя

## Обзор

Настроен автоматический деплой в приватный Docker Registry при пуше в ветку `main`. Система включает:

- ✅ Автоматическую сборку Docker образов
- ✅ Пуш в приватный реестр
- ✅ Деплой на продакшен сервер
- ✅ Health checks после деплоя
- ✅ Кэширование для ускорения сборки

## Необходимые секреты в GitHub

Добавьте следующие секреты в настройках репозитория (`Settings` → `Secrets and variables` → `Actions`):

### Docker Registry
- `REGISTRY_USERNAME` - имя пользователя для Docker Registry
- `REGISTRY_PASSWORD` - пароль для Docker Registry

### Сервер
- `SERVER_HOST` - IP адрес или домен сервера
- `SERVER_USERNAME` - имя пользователя на сервере
- `SERVER_SSH_KEY` - приватный SSH ключ для доступа к серверу

### База данных
- `DB_PASSWORD` - пароль для базы данных в продакшене
- `JWT_SECRET` - секретный ключ для JWT токенов

## Структура файлов

```
.github/
└── workflows/
    └── deploy.yml          # Основной workflow

docker/
└── docker-compose.yml       # Обновленный compose файл

scripts/
├── start-local.sh          # Запуск локально (Linux/Mac)
├── start-local.bat          # Запуск локально (Windows)
├── start-production.sh      # Запуск в продакшене
├── update-production.sh     # Обновление в продакшене
└── stop.sh                 # Остановка сервисов

env.local                   # Переменные для локальной разработки
env.production              # Переменные для продакшена
```

## Настройка сервера

### 1. Подготовка сервера

```bash
# Создаем директорию для проекта
sudo mkdir -p /opt/dobalito
sudo chown $USER:$USER /opt/dobalito

# Клонируем репозиторий
cd /opt/dobalito
git clone https://github.com/your-username/dobalito.git .

# Создаем директорию для uploads
mkdir -p uploads/avatars
```

### 2. Настройка SSH ключей

```bash
# На локальной машине генерируем SSH ключ
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Копируем публичный ключ на сервер
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server.com

# Добавляем приватный ключ в GitHub Secrets как SERVER_SSH_KEY
cat ~/.ssh/id_rsa
```

### 3. Настройка Docker на сервере

```bash
# Устанавливаем Docker и Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Устанавливаем Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Использование

### Локальная разработка

```bash
# Linux/Mac
./scripts/start-local.sh

# Windows
scripts\start-local.bat

# Или вручную
cp env.local .env
docker-compose -f docker/docker-compose.yml up -d
```

### Продакшен

```bash
# Запуск в продакшене
./scripts/start-production.sh

# Обновление
./scripts/update-production.sh

# Остановка
./scripts/stop.sh
```

### Автоматический деплой

Просто сделайте push в ветку `main`:

```bash
git add .
git commit -m "feat: новая функция"
git push origin main
```

GitHub Actions автоматически:
1. Соберет Docker образы
2. Запушит их в приватный реестр
3. Задеплоит на сервер
4. Проверит работоспособность

## Мониторинг

### Логи деплоя
- Перейдите в `Actions` в GitHub репозитории
- Выберите последний workflow
- Просмотрите логи каждого шага

### Логи сервисов на сервере

```bash
# Логи всех сервисов
docker-compose -f docker/docker-compose.yml logs -f

# Логи конкретного сервиса
docker-compose -f docker/docker-compose.yml logs -f backend
docker-compose -f docker/docker-compose.yml logs -f frontend-react
```

### Health checks

```bash
# Проверка backend
curl http://localhost:8080/api/v1/health

# Проверка frontend
curl http://localhost:3000
```

## Откат изменений

Если что-то пошло не так, можно откатиться к предыдущей версии:

```bash
# На сервере
cd /opt/dobalito

# Посмотреть доступные теги
docker images | grep dobalito

# Откатиться к предыдущей версии
docker tag your-registry.com/dobalito-backend:previous-tag your-registry.com/dobalito-backend:latest
docker tag your-registry.com/dobalito-frontend:previous-tag your-registry.com/dobalito-frontend:latest

# Перезапустить
docker-compose -f docker/docker-compose.yml up -d
```

## Безопасность

- ✅ Все секреты хранятся в GitHub Secrets
- ✅ SSH ключи для безопасного доступа к серверу
- ✅ Приватный Docker Registry
- ✅ Переменные окружения для разных сред
- ✅ Health checks для проверки работоспособности

## Troubleshooting

### Проблемы с доступом к реестру
```bash
# Проверьте логин в реестр
docker login your-registry.com
```

### Проблемы с SSH
```bash
# Проверьте SSH соединение
ssh -i ~/.ssh/id_rsa user@your-server.com
```

### Проблемы с Docker
```bash
# Проверьте статус Docker
sudo systemctl status docker

# Перезапустите Docker
sudo systemctl restart docker
```
