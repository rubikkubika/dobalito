# 🚀 Инструкция по деплою Dobalito

## 📋 Подготовка к деплою

### 1. Сборка React приложения
```bash
# Переходим в папку frontend-react
cd frontend-react

# Устанавливаем зависимости
npm install

# Собираем для продакшена
npm run build
```

### 2. Проверка сборки
После сборки файлы будут в папке `frontend-react/build/`

## 🌐 Варианты деплоя

### 🎯 Вариант 1: Netlify

#### Шаги:
1. **Зарегистрируйтесь** на [netlify.com](https://netlify.com)
2. **Подключите GitHub** репозиторий
3. **Настройте сборку:**
   - Build Command: `cd frontend-react && npm run build`
   - Publish Directory: `frontend-react/build`

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

## 🐛 Отладка

### Если что-то не работает:
1. **Проверьте логи** сборки
2. **Убедитесь** что все зависимости установлены
3. **Проверьте** настройки CORS в backend
4. **Обновите** Node.js до последней версии

## 📞 Поддержка

Если возникли проблемы с деплоем, проверьте:
- [React документация](https://react.dev)
- [Netlify документация](https://docs.netlify.com)
