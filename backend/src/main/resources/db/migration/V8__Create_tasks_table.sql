-- Create tasks table
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    creator_id BIGINT NOT NULL,
    executor_id BIGINT,
    category_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    
    CONSTRAINT fk_tasks_creator 
        FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_tasks_executor 
        FOREIGN KEY (executor_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_tasks_category 
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    CONSTRAINT chk_tasks_dates 
        CHECK (end_date > start_date),
    CONSTRAINT chk_tasks_status 
        CHECK (status IN ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'))
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_creator_id ON tasks(creator_id);
CREATE INDEX idx_tasks_executor_id ON tasks(executor_id);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_start_date ON tasks(start_date);
CREATE INDEX idx_tasks_end_date ON tasks(end_date);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);


