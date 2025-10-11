-- Create categories table
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7) DEFAULT '#4ECDC4',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_categories_name ON categories(name);

-- Insert sample categories
INSERT INTO categories (name, description, icon, color) VALUES
    ('Серфинг', 'Услуги по обучению серфингу и аренде оборудования', '🏄‍♂️', '#4ECDC4'),
    ('Аренда велосипедов', 'Прокат велосипедов для прогулок и спорта', '🚴‍♂️', '#45B7D1'),
    ('Фотография', 'Фотосессии и услуги фотографа', '📸', '#96CEB4'),
    ('Репетиторство', 'Образовательные услуги и помощь в учебе', '📚', '#FFEAA7'),
    ('Доставка', 'Курьерские услуги и доставка товаров', '🚚', '#DDA0DD')
ON CONFLICT (name) DO NOTHING;
