# CostChef - Калькулятор себестоимости блюд

Веб-приложение для расчета себестоимости блюд с React frontend и Node.js backend.

## 🚀 Быстрый запуск

```bash
# Клонирование
git clone https://github.com/Al8Titov/CostChef34.git
cd CostChef34

# Запуск через Docker
docker-compose up -d
```

Приложение доступно по адресу: http://localhost

## 📋 Функции

- Регистрация и авторизация пользователей
- Управление складом продуктов
- Создание рецептов блюд
- Расчет себестоимости блюд
- Управление пользователями (для админов)

## 🛠️ Технологии

- **Frontend**: React, Redux, Styled Components
- **Backend**: Node.js, Express, MongoDB
- **Инфраструктура**: Docker, Nginx

## 📁 Структура

```
├── frontend/          # React приложение
├── backend/           # Node.js API
└── docker-compose.yml # Docker конфигурация
```

## 🔧 Развертывание на сервере

```bash
# Подключение к серверу
ssh root@109.73.198.35

# Клонирование и запуск
git clone https://github.com/Al8Titov/CostChef34.git
cd CostChef34
docker-compose up -d --build
```

## 📞 Поддержка

При проблемах проверьте:
- Статус: `docker-compose ps`
- Логи: `docker-compose logs`