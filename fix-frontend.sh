#!/bin/bash

echo "🔧 Исправление frontend..."

echo "📥 Обновление кода..."
git pull origin main

echo "🛑 Остановка контейнеров..."
docker-compose down

echo "🔨 Пересборка frontend..."
docker-compose build --no-cache frontend

echo "🚀 Запуск приложения..."
docker-compose up -d

echo "⏳ Ожидание запуска..."
sleep 30

echo "📊 Проверка статуса:"
docker-compose ps

echo "🔍 Логи frontend:"
docker-compose logs --tail=10 frontend

echo "✅ Готово! Проверьте приложение: http://109.73.198.35"
