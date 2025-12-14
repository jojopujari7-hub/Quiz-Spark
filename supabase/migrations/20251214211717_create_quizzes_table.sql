/*
  # Create Quizzes Table

  1. New Tables
    - `quizzes`
      - `id` (varchar, primary key) - Auto-generated UUID
      - `topic` (text) - The quiz topic
      - `seed_questions` (text array) - User-provided example questions
      - `generated_questions` (jsonb) - Array of generated quiz questions with options and answers
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `quizzes` table
    - Add policy for public read access (quizzes are public)
*/

CREATE TABLE IF NOT EXISTS quizzes (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid()::varchar,
  topic text NOT NULL,
  seed_questions text[] NOT NULL DEFAULT '{}',
  generated_questions jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quizzes"
  ON quizzes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create quizzes"
  ON quizzes
  FOR INSERT
  TO public
  WITH CHECK (true);