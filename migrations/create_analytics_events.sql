-- Create analytics_events table for comprehensive event tracking
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    module_id VARCHAR(100),
    lesson_id VARCHAR(100),
    component_type VARCHAR(50) NOT NULL,
    data JSONB NOT NULL DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_module_id ON analytics_events(module_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_component_type ON analytics_events(component_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_data ON analytics_events USING GIN(data);

-- Enable Row Level Security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own analytics events" ON analytics_events
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own analytics events" ON analytics_events
    FOR SELECT USING (auth.uid() = user_id);

-- Admin users can view all analytics (adjust role as needed)
CREATE POLICY "Admins can view all analytics events" ON analytics_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Comment on the table
COMMENT ON TABLE analytics_events IS 'Stores all user interaction and learning analytics events';
COMMENT ON COLUMN analytics_events.event_type IS 'Type of event (e.g., quiz_started, quiz_completed, difference_found)';
COMMENT ON COLUMN analytics_events.component_type IS 'Component that triggered the event (e.g., quiz, email_comparison, lesson)';
COMMENT ON COLUMN analytics_events.data IS 'JSON data containing event-specific information'; 