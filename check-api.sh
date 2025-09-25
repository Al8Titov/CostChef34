#!/bin/bash

echo "🔍 Проверка API и конфигурации..."

echo "📊 Статус контейнеров:"
docker-compose ps

echo ""
echo "🔍 Проверка переменных окружения frontend:"
docker-compose exec frontend env | grep VITE

echo ""
echo "🌐 Проверка API напрямую:"
curl -f http://109.73.198.35:3002/api/health || echo "❌ API недоступен"

echo ""
echo "🔍 Проверка nginx конфигурации:"
docker-compose exec frontend cat /etc/nginx/nginx.conf | grep -A 5 -B 5 "proxy_pass"

echo ""
echo "📋 Логи backend:"
docker-compose logs --tail=10 backend

echo ""
echo "📋 Логи frontend:"
docker-compose logs --tail=10 frontend
