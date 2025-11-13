-- Enable Realtime for messages table
-- IMPORTANT: Run this in Supabase SQL Editor

-- First, enable the publication for all changes
ALTER publication supabase_realtime ADD TABLE messages;

-- Alternatively, if you need to create it:
-- CREATE PUBLICATION supabase_realtime;
-- ALTER publication supabase_realtime ADD TABLE messages;

-- Enable replica identity for the table (needed for DELETE events)
ALTER TABLE messages REPLICA IDENTITY FULL;
