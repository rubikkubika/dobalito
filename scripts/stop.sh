#!/bin/bash

echo "Stopping Dobalito Application..."

# Stop all services
docker-compose down

echo "All services stopped successfully!"
