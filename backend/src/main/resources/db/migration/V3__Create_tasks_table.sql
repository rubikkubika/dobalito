-- Create tasks table
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category_id BIGINT REFERENCES categories(id),
    customer_id BIGINT REFERENCES users(id),
    executor_id BIGINT REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
    location VARCHAR(200),
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_customer_id ON tasks(customer_id);
CREATE INDEX idx_tasks_executor_id ON tasks(executor_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);

-- Insert sample tasks
INSERT INTO tasks (title, description, price, category_id, customer_id, status, location) VALUES
    ('Урок серфинга для начинающих', 'Помогу освоить основы серфинга на пляже', 2500.00, 1, 1, 'OPEN', 'Пляж Сочи'),
    ('Аренда горного велосипеда', 'Предоставлю велосипед для прогулки по горам', 1500.00, 2, 2, 'OPEN', 'Красная Поляна'),
    ('Фотосессия в парке', 'Профессиональная фотосессия на природе', 3000.00, 3, 3, 'OPEN', 'Парк Ривьера')
ON CONFLICT DO NOTHING;
