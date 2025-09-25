#!/bin/bash

echo "🔍 Диагностика CostChef..."

echo "📊 Статус контейнеров:"
docker-compose ps

echo ""
echo "📋 Логи backend:"
docker-compose logs --tail=20 backend

echo ""
echo "📋 Логи frontend:"
docker-compose logs --tail=20 frontend

echo ""
echo "🌐 Проверка API:"
curl -f http://localhost:3002/api/health || echo "❌ API недоступен"

echo ""
echo "🌐 Проверка Frontend:"
curl -I http://localhost || echo "❌ Frontend недоступен"

echo ""
echo "🔗 Проверка сети:"
docker network ls | grep costchef

echo ""
echo "✅ Диагностика завершена"
