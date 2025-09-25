#!/bin/bash

echo "🔄 Перезапуск CostChef..."

echo "🛑 Остановка всех контейнеров..."
docker-compose down

echo "🧹 Очистка старых контейнеров..."
docker container prune -f

echo "🔨 Пересборка и запуск..."
docker-compose up -d --build

echo "⏳ Ожидание запуска сервисов..."
sleep 30

echo "📊 Проверка статуса:"
docker-compose ps

echo "🔍 Проверка логов backend:"
docker-compose logs --tail=10 backend

echo "✅ Перезапуск завершен!"
echo "🌐 Проверьте приложение: http://109.73.198.35"
