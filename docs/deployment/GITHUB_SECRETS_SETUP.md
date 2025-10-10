# Инструкция по настройке GitHub Secrets

## Шаги настройки

### 1. Перейдите в настройки репозитория
- Откройте ваш репозиторий на GitHub
- Нажмите на вкладку `Settings`
- В левом меню выберите `Secrets and variables` → `Actions`

### 2. Добавьте следующие секреты

Нажмите `New repository secret` для каждого секрета:

#### Docker Registry
- **Name:** `REGISTRY_USERNAME`
- **Secret:** `ваш-username-для-docker-registry`

- **Name:** `REGISTRY_PASSWORD`
- **Secret:** `ваш-пароль-для-docker-registry`

#### Сервер
- **Name:** `SERVER_HOST`
- **Secret:** `IP-адрес-или-домен-вашего-сервера`

- **Name:** `SERVER_USERNAME`
- **Secret:** `имя-пользователя-на-сервере`

- **Name:** `SERVER_SSH_KEY`
- **Secret:** `приватный-ssh-ключ-для-доступа-к-серверу`

#### База данных и безопасность
- **Name:** `DB_PASSWORD`
- **Secret:** `надежный-пароль-для-базы-данных`

- **Name:** `JWT_SECRET`
- **Secret:** `очень-длинный-и-безопасный-ключ-для-jwt`

## Примеры значений

### REGISTRY_USERNAME
```
myregistryuser
```

### REGISTRY_PASSWORD
```
myregistrypassword123
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
или
```
root
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

## Генерация SSH ключа

Если у вас нет SSH ключа, создайте его:

```bash
# Генерируем новый SSH ключ
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy"

# Копируем публичный ключ на сервер
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-server.com

# Показываем приватный ключ для добавления в GitHub
cat ~/.ssh/id_rsa
```

## Проверка настройки

После добавления всех секретов:

1. Сделайте тестовый коммит и push в ветку `main`
2. Перейдите в `Actions` в вашем репозитории
3. Проверьте, что workflow запустился успешно
4. Если есть ошибки, проверьте логи в каждом шаге

## Безопасность

- ✅ Никогда не добавляйте секреты в код
- ✅ Используйте сильные пароли
- ✅ Регулярно обновляйте SSH ключи
- ✅ Ограничьте доступ к серверу только необходимыми IP
- ✅ Используйте HTTPS для всех соединений
