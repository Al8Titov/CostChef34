# CostChef - Калькулятор себестоимости блюд

Полнофункциональное веб-приложение для расчета себестоимости блюд с разделением на frontend и backend.

## Структура проекта

```
├── frontend/          # React приложение
├── backend/           # Node.js API сервер
├── docker-compose.yml # Docker конфигурация
└── README.md
```

## Технологии

### Frontend
- React 19
- Redux
- Styled Components
- React Router
- Vite

### Backend
- Node.js 18
- Express.js
- MongoDB
- JWT аутентификация
- Mongoose ODM

### Инфраструктура
- Docker
- Nginx
- MongoDB Atlas

## Быстрый запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/Al8Titov/CostChef34.git
cd CostChef34
```

### 2. Запуск через Docker
```bash
docker-compose up -d
```

Приложение будет доступно по адресу: http://localhost

### 3. Запуск в режиме разработки

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Конфигурация

### Переменные окружения

#### Backend (.env)
```
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://Buck:Trevogavjope@cluster0.ruk1ewc.mongodb.net/costchef
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

## Развертывание на сервере

### Требования
- Docker и Docker Compose
- Git
- Доступ к серверу по SSH

### Шаги развертывания

1. **Подключение к серверу**
```bash
ssh root@109.73.198.35
# Пароль: d6q^BijT#ACLRZ
```

2. **Установка Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

3. **Клонирование репозитория**
```bash
git clone https://github.com/Al8Titov/CostChef34.git
cd CostChef34
```

4. **Настройка переменных окружения**
```bash
# Обновите JWT_SECRET в docker-compose.yml
# Обновите CORS_ORIGIN для вашего домена
```

5. **Запуск приложения**
```bash
docker-compose up -d
```

6. **Проверка статуса**
```bash
docker-compose ps
docker-compose logs
```

## API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/logout` - Выход
- `GET /api/auth/profile` - Профиль пользователя

### Продукты
- `GET /api/products` - Получить продукты
- `POST /api/products` - Создать продукт
- `PUT /api/products/:id` - Обновить продукт
- `DELETE /api/products/:id` - Удалить продукт

### Блюда
- `GET /api/dishes` - Получить блюда
- `POST /api/dishes` - Создать блюдо
- `PUT /api/dishes/:id` - Обновить блюдо
- `DELETE /api/dishes/:id` - Удалить блюдо

### Пользователи (только админы)
- `GET /api/users` - Получить пользователей
- `PUT /api/users/:id/role` - Изменить роль
- `DELETE /api/users/:id` - Удалить пользователя

## Роли пользователей

- **0 - Администратор**: Полный доступ ко всем функциям
- **1 - Пользователь**: Создание и управление своими блюдами и продуктами
- **2 - Гость**: Только просмотр

## Функции приложения

- ✅ Регистрация и авторизация пользователей
- ✅ Управление складом продуктов
- ✅ Создание рецептов блюд
- ✅ Расчет себестоимости блюд
- ✅ Управление пользователями (для админов)
- ✅ Адаптивный дизайн
- ✅ JWT аутентификация
- ✅ Валидация данных

## Обновление приложения

```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

## Мониторинг

```bash
# Просмотр логов
docker-compose logs -f

# Статус контейнеров
docker-compose ps

# Использование ресурсов
docker stats
```

## Поддержка

При возникновении проблем проверьте:
1. Статус контейнеров: `docker-compose ps`
2. Логи приложения: `docker-compose logs`
3. Подключение к MongoDB
4. Настройки CORS

## Лицензия

MIT License
