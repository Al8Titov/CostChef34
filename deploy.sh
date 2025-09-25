#!/bin/bash

echo "🚀 Развертывание CostChef..."

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker и попробуйте снова."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Установите Docker Compose и попробуйте снова."
    exit 1
fi

# Удаление проблемного .env файла если он есть
echo "🧹 Очистка проблемных .env файлов..."
if [ -f "/root/.env" ]; then
    echo "Удаляем проблемный /root/.env файл..."
    rm -f /root/.env
fi

# Остановка существующих контейнеров
echo "🛑 Остановка существующих контейнеров..."
docker-compose down

# Удаление старых образов
echo "🗑️ Удаление старых образов..."
docker-compose down --rmi all

# Проверка конфигурации
echo "🔍 Проверка конфигурации..."
docker-compose config

# Сборка и запуск
echo "🔨 Сборка и запуск приложения..."
docker-compose up -d --build

# Ожидание запуска
echo "⏳ Ожидание запуска сервисов..."
sleep 30

# Проверка статуса
echo "📊 Проверка статуса контейнеров..."
docker-compose ps

# Проверка API
echo "🔍 Проверка API..."
if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Backend API работает"
else
    echo "❌ Backend API недоступен"
fi

# Проверка Frontend
echo "🔍 Проверка Frontend..."
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Frontend работает"
else
    echo "❌ Frontend недоступен"
fi

echo "🎉 Развертывание завершено!"
echo "📱 Приложение доступно по адресу: http://109.73.198.35"
echo "🔧 API доступен по адресу: http://109.73.198.35:3001/api"
echo ""
echo "📋 Полезные команды:"
echo "  docker-compose ps          - статус контейнеров"
echo "  docker-compose logs        - просмотр логов"
echo "  docker-compose restart     - перезапуск"
echo "  docker-compose down        - остановка"