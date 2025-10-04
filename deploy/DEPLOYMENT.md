# 🚀 Инструкция по деплою Dobalito

## 📋 Подготовка к деплою

### 1. Сборка Flutter Web приложения
```bash
# Сделать скрипт исполняемым
chmod +x build-web.sh

# Запустить сборку
./build-web.sh
```

### 2. Проверка сборки
После сборки файлы будут в папке `frontend/build/web/`

## 🌐 Варианты деплоя

### 🎯 Вариант 1: Railway (Рекомендуется)

#### Шаги:
1. **Зарегистрируйтесь** на [railway.app](https://railway.app)
2. **Подключите GitHub** аккаунт
3. **Создайте репозиторий** на GitHub и загрузите код
4. **Импортируйте проект** в Railway
5. **Railway автоматически** определит Docker и задеплоит

#### Преимущества:
- ✅ Бесплатно
- ✅ Автоматический деплой при push в GitHub
- ✅ CDN по всему миру
- ✅ Простая настройка

### 🎯 Вариант 2: Netlify

#### Шаги:
1. **Зарегистрируйтесь** на [netlify.com](https://netlify.com)
2. **Подключите GitHub** репозиторий
3. **Настройте сборку:**
   - Build Command: `cd frontend && flutter build web --release`
   - Publish Directory: `frontend/build/web`

#### Преимущества:
- ✅ Бесплатно
- ✅ Drag & Drop деплой
- ✅ Автоматические сборки

### 🎯 Вариант 3: Docker + Cloud Provider

#### Для AWS/GCP/Azure:
1. **Создайте Dockerfile** для продакшена
2. **Настройте CI/CD** pipeline
3. **Задеплойте** контейнер

#### Для VPS (DigitalOcean, Linode):
```bash
# На сервере
git clone <your-repo>
cd dobalito
docker-compose up -d
```

## 🔧 Настройка домена

### После деплоя:
1. **Получите URL** от платформы
2. **Настройте кастомный домен** (опционально)
3. **Проверьте работу** приложения

## 📱 Мобильные приложения

### Для Android:
```bash
cd frontend
flutter build apk --release
```

### Для iOS:
```bash
cd frontend
flutter build ios --release
```

## 🐛 Отладка

### Если что-то не работает:
1. **Проверьте логи** сборки
2. **Убедитесь** что все зависимости установлены
3. **Проверьте** настройки CORS в backend
4. **Обновите** Flutter до последней версии

## 📞 Поддержка

Если возникли проблемы с деплоем, проверьте:
- [Flutter Web документация](https://flutter.dev/web)
- [Railway документация](https://docs.railway.app)
- [Netlify документация](https://docs.netlify.com)
