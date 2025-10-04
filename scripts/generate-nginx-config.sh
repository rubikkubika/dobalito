#!/bin/sh

# Get port from environment variable or use default 80
PORT=${PORT:-80}

# Generate nginx config with dynamic port
cat > /etc/nginx/nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen ${PORT};
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Handle Flutter web app
        location / {
            try_files \$uri \$uri/ /index.html;
        }

        # Proxy API requests to backend
        location /api/ {
            proxy_pass http://localhost:8081/api/;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # Enable gzip compression
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    }
}
EOF

echo "Generated nginx config for port ${PORT}"
