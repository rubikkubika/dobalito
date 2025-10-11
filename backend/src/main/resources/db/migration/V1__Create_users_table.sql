-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    phone VARCHAR(20) UNIQUE,
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Insert sample users
INSERT INTO users (name, email, phone, avatar) VALUES
    ('Иван Петров', 'ivan.petrov@example.com', '+7-900-123-45-67', 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=IP'),
    ('Мария Сидорова', 'maria.sidorova@example.com', '+7-900-234-56-78', 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=MS'),
    ('Алексей Козлов', 'alexey.kozlov@example.com', '+7-900-345-67-89', 'https://via.placeholder.com/150/45B7D1/FFFFFF?text=AK')
ON CONFLICT (email) DO NOTHING;
