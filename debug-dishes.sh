#!/bin/bash

echo "🔍 Диагностика создания блюд..."

echo "📋 Логи backend (последние 20 строк):"
docker-compose logs --tail=20 backend

echo ""
echo "🔍 Проверка API dishes:"
curl -f http://109.73.198.35:3002/api/dishes || echo "❌ API dishes недоступен"

echo ""
echo "📊 Статус контейнеров:"
docker-compose ps

echo ""
echo "🔍 Проверка MongoDB подключения в backend:"
docker-compose exec backend node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB подключен'))
  .catch(err => console.log('❌ MongoDB ошибка:', err.message));
"
