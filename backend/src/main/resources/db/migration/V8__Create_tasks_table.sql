-- Update tasks table schema
-- Add new columns if they don't exist
DO $$
BEGIN
    -- Add creator_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tasks' AND column_name = 'creator_id') THEN
        ALTER TABLE tasks ADD COLUMN creator_id BIGINT;
    END IF;
    
    -- Add start_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tasks' AND column_name = 'start_date') THEN
        ALTER TABLE tasks ADD COLUMN start_date TIMESTAMP;
    END IF;
    
    -- Add end_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tasks' AND column_name = 'end_date') THEN
        ALTER TABLE tasks ADD COLUMN end_date TIMESTAMP;
    END IF;
    
    -- Update title column length if needed
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tasks' AND column_name = 'title' AND character_maximum_length = 200) THEN
        ALTER TABLE tasks ALTER COLUMN title TYPE VARCHAR(255);
    END IF;
END $$;

-- Add foreign key constraints if they don't exist
DO $$
BEGIN
    -- Add creator foreign key constraint
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE table_name = 'tasks' AND constraint_name = 'fk_tasks_creator') THEN
        ALTER TABLE tasks ADD CONSTRAINT fk_tasks_creator 
            FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
    
    -- Add executor foreign key constraint (update existing)
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE table_name = 'tasks' AND constraint_name = 'fk_tasks_executor') THEN
        ALTER TABLE tasks ADD CONSTRAINT fk_tasks_executor 
            FOREIGN KEY (executor_id) REFERENCES users(id) ON DELETE SET NULL;
    END IF;
    
    -- Add category foreign key constraint (update existing)
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE table_name = 'tasks' AND constraint_name = 'fk_tasks_category') THEN
        ALTER TABLE tasks ADD CONSTRAINT fk_tasks_category 
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;
    END IF;
    
    -- Add date check constraint
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE table_name = 'tasks' AND constraint_name = 'chk_tasks_dates') THEN
        ALTER TABLE tasks ADD CONSTRAINT chk_tasks_dates 
            CHECK (end_date > start_date);
    END IF;
END $$;

-- Create new indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_creator_id ON tasks(creator_id);
CREATE INDEX IF NOT EXISTS idx_tasks_start_date ON tasks(start_date);
CREATE INDEX IF NOT EXISTS idx_tasks_end_date ON tasks(end_date);



