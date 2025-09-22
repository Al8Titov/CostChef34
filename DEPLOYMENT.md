# Инструкции по развертыванию CostChef

## 🚀 Быстрый запуск

### 1. Локальный запуск через Docker
```bash
# Клонируйте репозиторий
git clone https://github.com/Al8Titov/CostChef34.git
cd CostChef34

# Запустите приложение
docker-compose up -d

# Приложение будет доступно по адресу: http://localhost
```

### 2. Развертывание на сервере

#### Подключение к серверу
```bash
ssh root@109.73.198.35
# Пароль: d6q^BijT#ACLRZ
```

#### Автоматическое развертывание
```bash
# Клонируйте репозиторий
git clone https://github.com/Al8Titov/CostChef34.git
cd CostChef34

# Запустите скрипт развертывания
chmod +x deploy.sh
./deploy.sh
```

#### Ручное развертывание
```bash
# 1. Установите Docker (если не установлен)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 2. Установите Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 3. Запустите приложение
docker-compose up -d --build
```

## 🔧 Конфигурация

### Переменные окружения

#### Backend
- `NODE_ENV=production`
- `PORT=3001`
- `MONGODB_URI=mongodb+srv://Buck:Trevogavjope@cluster0.ruk1ewc.mongodb.net/costchef`
- `JWT_SECRET=your-super-secret-jwt-key-here-change-in-production`
- `CORS_ORIGIN=http://localhost:3000`

#### Frontend
- `VITE_API_URL=http://localhost:3001/api`

## 📊 Мониторинг

### Проверка статуса
```bash
docker-compose ps
```

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend
```

### Использование ресурсов
```bash
docker stats
```

## 🔄 Обновление

```bash
# Остановите приложение
docker-compose down

# Обновите код
git pull origin main

# Пересоберите и запустите
docker-compose up -d --build
```

## 🛠️ Устранение неполадок

### Проблемы с подключением к MongoDB
1. Проверьте строку подключения в `docker-compose.yml`
2. Убедитесь, что IP адрес сервера добавлен в whitelist MongoDB Atlas

### Проблемы с CORS
1. Обновите `CORS_ORIGIN` в `docker-compose.yml`
2. Перезапустите backend: `docker-compose restart backend`

### Проблемы с frontend
1. Проверьте `VITE_API_URL` в переменных окружения
2. Убедитесь, что backend запущен и доступен

### Очистка системы
```bash
# Остановите все контейнеры
docker-compose down

# Удалите все образы
docker system prune -a

# Пересоберите с нуля
docker-compose up -d --build
```

## 📝 Логи и отладка

### Включение debug режима
Добавьте в `docker-compose.yml`:
```yaml
environment:
  - DEBUG=*
  - NODE_ENV=development
```

### Просмотр логов в реальном времени
```bash
docker-compose logs -f --tail=100
```

## 🔐 Безопасность

### Рекомендации для продакшена
1. Измените `JWT_SECRET` на сложный случайный ключ
2. Обновите `CORS_ORIGIN` на ваш домен
3. Настройте SSL сертификаты
4. Ограничьте доступ к MongoDB Atlas по IP

### Смена JWT секрета
```bash
# Сгенерируйте новый секрет
openssl rand -base64 32

# Обновите в docker-compose.yml
# Перезапустите приложение
docker-compose restart backend
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs`
2. Проверьте статус: `docker-compose ps`
3. Проверьте подключение к MongoDB
4. Проверьте настройки CORS

## 🎯 Готовое приложение

После успешного развертывания у вас будет:
- ✅ Полнофункциональное веб-приложение
- ✅ Backend API на Node.js с MongoDB
- ✅ Frontend на React с современным UI
- ✅ Docker контейнеризация
- ✅ Nginx reverse proxy
- ✅ JWT аутентификация
- ✅ Управление пользователями
- ✅ Расчет себестоимости блюд
- ✅ Управление складом продуктов

Приложение будет доступно по адресу: **http://109.73.198.35**
