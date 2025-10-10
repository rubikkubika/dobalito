# Настройка GitHub Actions для Dobalito

## Полная настройка с деплоем на сервер

### Что делает этот workflow:
- ✅ Собирает Docker образы для backend и frontend
- ✅ Пушит образы в приватный registry
- ✅ Деплоит на ваш сервер через SSH
- ✅ Перезапускает сервисы на сервере
- ✅ Проверяет работоспособность после деплоя
- ✅ Запускается при push в ветку `main`

### Требуемые секреты:

Перейдите в настройки репозитория: `Settings` → `Secrets and variables` → `Actions`

#### Docker Registry
- **Name:** `REGISTRY_USERNAME`
- **Secret:** ваш username для Docker registry

- **Name:** `REGISTRY_PASSWORD`  
- **Secret:** ваш пароль для Docker registry

#### Сервер
- **Name:** `SERVER_HOST`
- **Secret:** IP адрес или домен вашего сервера

- **Name:** `SERVER_USERNAME`
- **Secret:** имя пользователя на сервере (ubuntu, root и т.д.)

- **Name:** `SERVER_SSH_KEY`
- **Secret:** приватный SSH ключ для доступа к серверу

#### База данных и безопасность
- **Name:** `DB_PASSWORD`
- **Secret:** надежный пароль для базы данных

- **Name:** `JWT_SECRET`
- **Secret:** очень длинный и безопасный ключ для JWT

## Примеры значений:

### REGISTRY_USERNAME
```
ваш-username-для-89.208.14.20
```

### REGISTRY_PASSWORD
```
ваш-пароль-для-89.208.14.20
```

### SERVER_HOST
```
192.168.1.100
```
или
```
myserver.com
```

### SERVER_USERNAME
```
ubuntu
```

### SERVER_SSH_KEY
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA1234567890abcdef...
-----END OPENSSH PRIVATE KEY-----
```

### DB_PASSWORD
```
SuperSecurePassword123!
```

### JWT_SECRET
```
dobalito-super-secure-jwt-secret-key-for-production-very-long-and-complex-key-2024
```

## Генерация SSH ключа:

```bash
# Создать новый SSH ключ
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy"

# Скопировать публичный ключ на сервер
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server.com

# Показать приватный ключ для GitHub
cat ~/.ssh/id_rsa
```

## Подготовка сервера:

1. **Установите Docker и Docker Compose** на сервер
2. **Создайте директорию проекта:**
   ```bash
   sudo mkdir -p /opt/dobalito
   sudo chown $USER:$USER /opt/dobalito
   ```
3. **Скопируйте docker-compose.yml:**
   ```bash
   # Скопируйте файл docker/docker-compose.yml на сервер в /opt/dobalito/
   ```
4. **Настройте SSH доступ** с вашего GitHub Actions

## Проверка работы:

1. Добавьте все секреты в GitHub
2. Сделайте push в ветку `main`
3. Перейдите в `Actions` в GitHub
4. Проверьте, что workflow выполнился успешно
5. Проверьте, что сервисы запустились на сервере

## Безопасность:

- ✅ Никогда не добавляйте секреты в код
- ✅ Используйте сильные пароли
- ✅ Регулярно обновляйте SSH ключи
- ✅ Ограничьте доступ к серверу только необходимыми IP
- ✅ Используйте HTTPS для всех соединений
