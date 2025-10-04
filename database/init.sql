-- Create database if not exists
CREATE DATABASE IF NOT EXISTS dobalito;

-- Use the database
\c dobalito;

-- Create a simple table for demo purposes
CREATE TABLE IF NOT EXISTS app_info (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO app_info (name, version, description) 
VALUES 
    ('Dobalito', '1.0.0', 'Multi-platform Flutter application with Spring Boot backend')
ON CONFLICT DO NOTHING;
