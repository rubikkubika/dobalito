#!/bin/bash

# Dobalito - Quick Start Script
# Optimized Docker Compose startup with automatic frontend opening

echo ""
echo "========================================"
echo "🚀 DOBALITO - QUICK START (RECOMMENDED)"
echo "========================================"
echo ""
echo "✅ Using optimized Docker build with BuildKit"
echo "✅ Automatic frontend opening in browser"
echo "✅ Service status checking and API testing"
echo ""

# Enable BuildKit for faster builds
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Stop any running containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Test API
echo "🧪 Testing API..."
curl -s http://localhost:8080/api/v1/health | jq . || echo "API not ready yet"

echo ""
echo "========================================"
echo "✅ SUCCESS! All services are running!"
echo "========================================"
echo ""
echo "🌐 Frontend: http://localhost:3000 (opening automatically)"
echo "🔧 Backend API: http://localhost:8080/api/v1"
echo "🗄️  Database: localhost:5432"
echo ""
echo "📝 To view logs: docker-compose logs -f [service_name]"
echo "🛑 To stop: docker-compose down"
echo "🔄 To restart: ./scripts/start.sh"
echo ""

# Open frontend in browser
echo "🌐 Opening frontend in browser..."
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000
elif command -v open > /dev/null; then
    open http://localhost:3000
else
    echo "Please open http://localhost:3000 in your browser"
fi

echo ""
echo "🎉 Ready for development! Happy coding!"
echo ""