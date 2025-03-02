-- Add foreign key constraint to user_sessions table
ALTER TABLE user_sessions
ADD CONSTRAINT fk_user_sessions_user
FOREIGN KEY (user_id) REFERENCES auth.users(id)
ON DELETE CASCADE; 