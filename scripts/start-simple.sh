#!/bin/sh

echo "Starting services..."

# Start backend in background on internal port
echo "Starting backend..."
java -jar /app/app.jar --server.port=8081 &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 15

# Check if backend is running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Backend failed to start"
    exit 1
fi

echo "Backend started with PID: $BACKEND_PID"

# Test if backend is responding
echo "Testing backend health..."
for i in 1 2 3 4 5; do
    if curl -f http://localhost:8081/api/v1/health >/dev/null 2>&1; then
        echo "Backend is healthy"
        break
    fi
    echo "Backend not ready yet, attempt $i/5"
    sleep 5
done

# Generate nginx config with correct port
echo "Generating nginx config..."
/generate-nginx-config.sh

# Start nginx in foreground
echo "Starting nginx..."
exec nginx -g "daemon off;"
