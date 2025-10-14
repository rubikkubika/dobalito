-- Add missing columns to categories table
-- This migration adds english_name and is_active columns that are expected by the Category entity

-- Add english_name column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'categories' AND column_name = 'english_name'
    ) THEN
        ALTER TABLE categories ADD COLUMN english_name VARCHAR(100) NOT NULL DEFAULT '';
    END IF;
END $$;

-- Add is_active column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'categories' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE categories ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
    END IF;
END $$;

-- Update existing records to have proper english_name values
UPDATE categories SET english_name = name WHERE english_name = '';

-- Create index for english_name for better performance
CREATE INDEX IF NOT EXISTS idx_categories_english_name ON categories(english_name);

-- Create index for is_active for better performance
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
