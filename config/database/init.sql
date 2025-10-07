-- Create database (PostgreSQL doesn't support IF NOT EXISTS for CREATE DATABASE)
-- Database is already created by POSTGRES_DB environment variable

-- Create database if it doesn't exist
-- Note: This script runs in the postgres database, so we need to create dobalito database
SELECT 'CREATE DATABASE dobalito'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'dobalito')\gexec

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
    ('Dobalito', '1.0.0', 'React web application with Spring Boot backend')
ON CONFLICT DO NOTHING;
