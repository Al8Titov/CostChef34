#!/bin/bash

# Скрипт для развертывания CostChef на сервере

echo "🚀 Начинаем развертывание CostChef..."

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Устанавливаем..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Проверяем наличие Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Устанавливаем..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down

# Удаляем старые образы
echo "🧹 Очищаем старые образы..."
docker system prune -f

# Собираем и запускаем новые контейнеры
echo "🔨 Собираем и запускаем контейнеры..."
docker-compose up -d --build

# Ждем запуска
echo "⏳ Ждем запуска сервисов..."
sleep 30

# Проверяем статус
echo "📊 Проверяем статус сервисов..."
docker-compose ps

# Проверяем логи
echo "📝 Последние логи:"
docker-compose logs --tail=20

echo "✅ Развертывание завершено!"
echo "🌐 Приложение доступно по адресу: http://localhost"
echo "🔧 Для просмотра логов: docker-compose logs -f"
