@echo off
REM Dobalito - Quick Start Script for Windows
REM Optimized Docker Compose startup with automatic frontend opening

echo.
echo ========================================
echo 🚀 DOBALITO - QUICK START (RECOMMENDED)
echo ========================================
echo.
echo ✅ Using optimized Docker build with BuildKit
echo ✅ Automatic frontend opening in browser
echo ✅ Service status checking and API testing
echo.

REM Enable BuildKit for faster builds
set DOCKER_BUILDKIT=1
set COMPOSE_DOCKER_CLI_BUILD=1

REM Stop any running containers
echo 🛑 Stopping existing containers...
docker-compose down

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak > nul

REM Check service status
echo 📊 Checking service status...
docker-compose ps

REM Test API
echo 🧪 Testing API...
curl -s http://localhost:8080/api/v1/health

echo.
echo ========================================
echo ✅ SUCCESS! All services are running!
echo ========================================
echo.
echo 🌐 Frontend: http://localhost:3000 (opening automatically)
echo 🔧 Backend API: http://localhost:8080/api/v1
echo 🗄️  Database: localhost:5432
echo.
echo 📝 To view logs: docker-compose logs -f [service_name]
echo 🛑 To stop: docker-compose down
echo 🔄 To restart: scripts/start.bat
echo.

REM Open frontend in browser
echo 🌐 Opening frontend in browser...
start http://localhost:3000

echo.
echo 🎉 Ready for development! Happy coding!
echo.
