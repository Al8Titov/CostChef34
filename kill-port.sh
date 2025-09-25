#!/bin/bash

echo "🔍 Поиск процессов, занимающих порт 3001..."

# Найти процесс, занимающий порт 3001
PORT_PID=$(lsof -ti:3001 2>/dev/null || netstat -tulpn | grep :3001 | awk '{print $7}' | cut -d'/' -f1)

if [ -n "$PORT_PID" ]; then
    echo "📌 Найден процесс с PID: $PORT_PID"
    echo "🛑 Завершение процесса..."
    kill -9 $PORT_PID
    echo "✅ Процесс завершен"
else
    echo "ℹ️ Порт 3001 свободен"
fi

echo ""
echo "🧹 Остановка всех Docker контейнеров..."
docker stop $(docker ps -aq) 2>/dev/null || echo "Нет запущенных контейнеров"

echo ""
echo "🗑️ Удаление всех Docker контейнеров..."
docker rm $(docker ps -aq) 2>/dev/null || echo "Нет контейнеров для удаления"

echo ""
echo "🔨 Запуск приложения..."
docker-compose up -d --build

echo ""
echo "⏳ Ожидание запуска..."
sleep 30

echo ""
echo "📊 Статус контейнеров:"
docker-compose ps

echo ""
echo "✅ Готово! Проверьте: http://109.73.198.35"
