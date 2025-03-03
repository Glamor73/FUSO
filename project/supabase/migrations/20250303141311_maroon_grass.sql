/*
  # Initial schema for FUSO Calendar App

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text)
      - `date` (text, not null)
      - `completed` (boolean, default false)
      - `subject_id` (uuid, references subjects)
      - `user_id` (uuid, not null, references auth.users)
      - `created_at` (timestamptz, default now())
    
    - `subjects`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `color` (text, not null)
      - `user_id` (uuid, not null, references auth.users)
      - `created_at` (timestamptz, default now())
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date text NOT NULL,
  completed boolean DEFAULT false,
  subject_id uuid,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key constraint for tasks.subject_id
ALTER TABLE tasks
  ADD CONSTRAINT fk_tasks_subject
  FOREIGN KEY (subject_id)
  REFERENCES subjects(id)
  ON DELETE SET NULL;

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks
CREATE POLICY "Users can create their own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for subjects
CREATE POLICY "Users can create their own subjects"
  ON subjects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own subjects"
  ON subjects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subjects"
  ON subjects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subjects"
  ON subjects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);