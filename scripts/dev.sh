#!/bin/bash

echo "Starting Dobalito in Development Mode..."

# Start only database
echo "Starting PostgreSQL database..."
docker-compose up postgres -d

# Wait for database to be ready
echo "Waiting for database to start..."
sleep 5

echo ""
echo "Database is ready!"
echo "You can now run:"
echo "  Backend: cd backend && ./mvnw spring-boot:run"
echo "  Frontend: flutter run -d web-server --web-port 3000"
echo ""
echo "Database connection:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: dobalito"
echo "  Username: postgres"
echo "  Password: password"
