# 🚀 Полный инструктаж по развертыванию CostChef

## 📋 Требования к серверу

- **ОС**: Ubuntu 20.04+ / CentOS 7+ / Debian 10+
- **RAM**: Минимум 2GB (рекомендуется 4GB+)
- **CPU**: 2 ядра
- **Диск**: 20GB свободного места
- **Сеть**: Статический IP адрес

## 🔧 Подготовка сервера

### 1. Подключение к серверу

```bash
# Подключение по SSH
ssh root@109.73.198.35
# Пароль: d6q^BijT#ACLRZ
```

### 2. Обновление системы

```bash
# Ubuntu/Debian
apt update && apt upgrade -y

# CentOS/RHEL
yum update -y
```

### 3. Установка Docker

```bash
# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Запуск Docker
systemctl start docker
systemctl enable docker

# Проверка установки
docker --version
docker-compose --version
```

### 4. Установка Git

```bash
# Ubuntu/Debian
apt install git -y

# CentOS/RHEL
yum install git -y

# Проверка
git --version
```

### 5. Настройка файрвола

```bash
# Ubuntu/Debian (ufw)
ufw allow ssh
ufw allow 80
ufw allow 443
ufw --force enable

# CentOS/RHEL (firewalld)
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

## 📦 Развертывание приложения

### 1. Клонирование репозитория

```bash
# Переход в домашнюю директорию
cd ~

# Клонирование проекта
git clone https://github.com/Al8Titov/CostChef34.git
cd CostChef34

# Проверка файлов
ls -la
```

### 2. Проверка конфигурации

```bash
# Проверка docker-compose.yml
cat docker-compose.yml

# Проверка структуры проекта
tree -L 2
```

### 3. Запуск приложения

```bash
# Запуск в фоновом режиме
docker-compose up -d --build

# Проверка статуса
docker-compose ps
```

### 4. Проверка логов

```bash
# Просмотр всех логов
docker-compose logs

# Просмотр логов backend
docker-compose logs backend

# Просмотр логов frontend
docker-compose logs frontend

# Следить за логами в реальном времени
docker-compose logs -f
```

## 🔍 Проверка работоспособности

### 1. Проверка контейнеров

```bash
# Статус контейнеров
docker-compose ps

# Должно показать:
# costchef-backend  Up 0.0.0.0:3001->3001/tcp
# costchef-frontend Up 0.0.0.0:80->80/tcp
```

### 2. Проверка портов

```bash
# Проверка открытых портов
netstat -tlnp | grep -E ':(80|3001)'

# Или
ss -tlnp | grep -E ':(80|3001)'
```

### 3. Проверка API

```bash
# Проверка health check
curl http://localhost:3001/api/health

# Проверка через внешний IP
curl http://109.73.198.35:3001/api/health
```

### 4. Проверка веб-интерфейса

```bash
# Проверка доступности
curl -I http://109.73.198.35

# Должен вернуть HTTP 200 OK
```

## 🌐 Доступ к приложению

- **Веб-интерфейс**: http://109.73.198.35
- **API Backend**: http://109.73.198.35:3001/api
- **Health Check**: http://109.73.198.35:3001/api/health

## 🔧 Управление приложением

### Остановка

```bash
# Остановка всех сервисов
docker-compose down

# Остановка с удалением volumes
docker-compose down -v
```

### Перезапуск

```bash
# Перезапуск всех сервисов
docker-compose restart

# Перезапуск конкретного сервиса
docker-compose restart backend
docker-compose restart frontend
```

### Обновление

```bash
# Получение обновлений
git pull origin main

# Пересборка и перезапуск
docker-compose down
docker-compose up -d --build
```

## 📊 Мониторинг

### 1. Статус контейнеров

```bash
# Текущий статус
docker-compose ps

# Использование ресурсов
docker stats
```

### 2. Логи

```bash
# Все логи
docker-compose logs

# Логи за последние 100 строк
docker-compose logs --tail=100

# Логи в реальном времени
docker-compose logs -f
```

### 3. Использование диска

```bash
# Общий размер Docker
docker system df

# Очистка неиспользуемых образов
docker system prune -a
```

## 🛠️ Устранение неполадок

### Проблема: Контейнеры не запускаются

```bash
# Проверка логов
docker-compose logs

# Проверка конфигурации
docker-compose config

# Пересборка образов
docker-compose build --no-cache
```

### Проблема: MongoDB не подключается

```bash
# Проверка переменных окружения
docker-compose exec backend env | grep MONGODB

# Проверка подключения из контейнера
docker-compose exec backend ping cluster0.ruk1ewc.mongodb.net
```

### Проблема: Frontend не загружается

```bash
# Проверка nginx конфигурации
docker-compose exec frontend nginx -t

# Проверка файлов
docker-compose exec frontend ls -la /usr/share/nginx/html
```

### Проблема: CORS ошибки

```bash
# Проверка CORS настроек
docker-compose exec backend env | grep CORS

# Обновление CORS_ORIGIN в docker-compose.yml
nano docker-compose.yml
```

## 🔒 Безопасность

### 1. Обновление JWT секрета

```bash
# Генерация нового секрета
openssl rand -base64 32

# Обновление в docker-compose.yml
nano docker-compose.yml

# Перезапуск
docker-compose restart backend
```

### 2. Настройка SSL (опционально)

```bash
# Установка certbot
apt install certbot python3-certbot-nginx -y

# Получение сертификата
certbot --nginx -d your-domain.com
```

## 📈 Масштабирование

### Увеличение ресурсов

```bash
# Ограничение ресурсов в docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
```

### Горизонтальное масштабирование

```bash
# Запуск нескольких экземпляров backend
docker-compose up -d --scale backend=3
```

## 🔄 Автоматическое обновление

### Создание скрипта обновления

```bash
# Создание скрипта
nano update.sh

# Содержимое скрипта:
#!/bin/bash
cd /root/CostChef34
git pull origin main
docker-compose down
docker-compose up -d --build

# Права на выполнение
chmod +x update.sh
```

### Настройка cron для автообновления

```bash
# Редактирование crontab
crontab -e

# Добавление задачи (обновление каждый день в 3:00)
0 3 * * * /root/CostChef34/update.sh >> /var/log/costchef-update.log 2>&1
```

## 📞 Поддержка

### Полезные команды

```bash
# Перезагрузка сервера
reboot

# Проверка места на диске
df -h

# Проверка памяти
free -h

# Проверка процессов
top
htop
```

### Логи системы

```bash
# Логи Docker
journalctl -u docker.service

# Логи системы
tail -f /var/log/syslog
```

## ✅ Чек-лист развертывания

- [ ] Сервер подготовлен (Docker, Git установлены)
- [ ] Файрвол настроен (порты 80, 443, 22 открыты)
- [ ] Репозиторий склонирован
- [ ] Приложение запущено (`docker-compose up -d`)
- [ ] Контейнеры работают (`docker-compose ps`)
- [ ] API доступен (`curl http://109.73.198.35:3001/api/health`)
- [ ] Веб-интерфейс доступен (`curl -I http://109.73.198.35`)
- [ ] Логи не содержат ошибок (`docker-compose logs`)

## 🎉 Готово!

Приложение CostChef успешно развернуто и доступно по адресу:
**http://109.73.198.35**

Для входа в систему создайте аккаунт через форму регистрации.
