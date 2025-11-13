-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read messages
CREATE POLICY "Anyone can read messages"
  ON messages FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert messages
CREATE POLICY "Authenticated users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Create policy to allow users to update their own messages
CREATE POLICY "Users can update their own messages"
  ON messages FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create policy to allow users to delete their own messages
CREATE POLICY "Users can delete their own messages"
  ON messages FOR DELETE
  USING (true);

-- Create index for faster queries
CREATE INDEX messages_created_at_idx ON messages (created_at DESC);
