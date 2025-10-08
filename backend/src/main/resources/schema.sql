-- Create database if it doesn't exist
-- Note: This will be executed when connecting to PostgreSQL
-- The actual database creation should be done manually or via Docker

-- Create tables (these will be created by Hibernate with ddl-auto: update)
-- This file is mainly for reference and can be used for manual setup

-- Insert test data after tables are created
-- Note: This will be executed after Hibernate creates the tables

-- Insert test categories
INSERT INTO categories (name, english_name, description, icon, color, is_active, created_at, updated_at) 
VALUES 
    ('Серфинг', 'Surfing', 'Услуги и товары для серфинга: доски, гидрокостюмы, уроки серфинга, аренда оборудования', null, '#00B4DB', true, NOW(), NOW()),
    ('Аренда байка', 'Bike Rental', 'Аренда велосипедов, мотоциклов и другого двухколесного транспорта', null, '#FF6B6B', true, NOW(), NOW()),
    ('Туризм', 'Tourism', 'Туристические услуги: экскурсии, гиды, туры, путеводители', null, '#4ECDC4', true, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert test users
INSERT INTO users (name, email, avatar, created_at, updated_at) 
VALUES 
    ('Иван Петров', 'ivan.petrov@example.com', 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=IP', NOW(), NOW()),
    ('Мария Сидорова', 'maria.sidorova@example.com', 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=MS', NOW(), NOW()),
    ('Алексей Козлов', 'alexey.kozlov@example.com', null, NOW(), NOW()),
    ('Елена Волкова', 'elena.volkova@example.com', 'https://via.placeholder.com/150/45B7D1/FFFFFF?text=EV', NOW(), NOW()),
    ('Дмитрий Новиков', 'dmitry.novikov@example.com', null, NOW(), NOW()),
    ('Sammy', 'sammy@example.com', 'https://example.com/avatars/sammy.jpg', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Link Sammy to categories (Серфинг and Аренда байка)
-- Note: This assumes the categories have IDs 1 and 2 respectively
INSERT INTO user_categories (user_id, category_id) 
SELECT u.id, c.id 
FROM users u, categories c 
WHERE u.email = 'sammy@example.com' 
  AND c.name IN ('Серфинг', 'Аренда байка')
ON CONFLICT (user_id, category_id) DO NOTHING;