-- Create phone_verification_codes table for phone verification functionality
-- This table stores verification codes sent to users' phone numbers

CREATE TABLE IF NOT EXISTS phone_verification_codes (
    id BIGSERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    attempts INTEGER NOT NULL DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_phone_verification_codes_phone ON phone_verification_codes(phone);
CREATE INDEX IF NOT EXISTS idx_phone_verification_codes_expires_at ON phone_verification_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_phone_verification_codes_is_used ON phone_verification_codes(is_used);
CREATE INDEX IF NOT EXISTS idx_phone_verification_codes_created_at ON phone_verification_codes(created_at);
