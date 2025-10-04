# 🚀 Быстрый старт Dobalito

## ⚡ Один скрипт - всё готово!

### Windows
```bash
scripts/start.bat
```

### Linux/Mac
```bash
chmod +x scripts/start.sh
./scripts/start.sh
```

## ✅ Что происходит автоматически:

1. **Остановка** старых контейнеров
2. **Оптимизированная сборка** с BuildKit и кэшированием
3. **Запуск** всех сервисов (Frontend, Backend, Database)
4. **Проверка** статуса сервисов
5. **Тестирование** API
6. **Открытие фронтенда** в браузере

## 🎯 Результат:

- ✅ **Frontend**: http://localhost:3000 (открывается автоматически)
- ✅ **Backend API**: http://localhost:8080/api/v1
- ✅ **Database**: localhost:5432

## ⚠️ Важно:

- **НЕ используйте** `docker-compose up` напрямую
- **Используйте ТОЛЬКО** скрипты быстрого запуска
- **Фронтенд открывается автоматически** - не закрывайте браузер

## 🔄 Перезапуск:

После изменений в коде просто запустите скрипт снова:
```bash
scripts/start.bat  # Windows
./scripts/start.sh # Linux/Mac
```

## 🛑 Остановка:

```bash
docker-compose down
```

---
📖 **Подробные правила:** [DEVELOPMENT_RULES.md](DEVELOPMENT_RULES.md)
