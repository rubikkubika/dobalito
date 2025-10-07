# 📜 Скрипты

Эта папка содержит все скрипты для управления проектом.

## 📁 Содержимое:

### Основные скрипты:
- `start.sh` - Запуск сервисов (Linux/Mac)
- `start.bat` - Запуск сервисов (Windows)
- `stop.sh` - Остановка сервисов
- `dev.sh` - Скрипт для разработки

### Деплой скрипты:
- `start-simple.sh` - Простой запуск для production
- `generate-nginx-config.sh` - Генерация nginx конфигурации


## 🚀 Использование:

### Локальная разработка:
```bash
# Запуск всех сервисов
./scripts/start.sh

# Остановка сервисов
./scripts/stop.sh

# Режим разработки
./scripts/dev.sh
```

### Production:
```bash
# Простой запуск
./scripts/start-simple.sh

# Генерация nginx конфига
./scripts/generate-nginx-config.sh
```


## 🔧 Настройка:

1. **Убедитесь**, что у скриптов есть права на выполнение:
   ```bash
   chmod +x scripts/*.sh
   ```

2. **Настройте** переменные окружения в `.env` файле

3. **Проверьте**, что Docker и Docker Compose установлены
