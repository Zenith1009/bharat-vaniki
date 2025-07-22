-- Database schema for Indian Forests Website
-- Run these commands in Supabase SQL Editor

-- Quiz Scores Table
CREATE TABLE IF NOT EXISTS quiz_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_session TEXT NOT NULL,
  score INTEGER NOT NULL,
  category TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_scores_category ON quiz_scores(category);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_completed_at ON quiz_scores(completed_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Quiz scores: Allow anyone to insert, only service role can read all
CREATE POLICY "Anyone can insert quiz scores" ON quiz_scores
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can read all quiz scores" ON quiz_scores
  FOR SELECT USING (auth.role() = 'service_role');

-- Contact submissions: Only service role can insert and read
CREATE POLICY "Service role can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can read contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'service_role');

-- Newsletter subscriptions: Anyone can insert/upsert, only service role can read
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update their newsletter subscription" ON newsletter_subscriptions
  FOR UPDATE USING (true);

CREATE POLICY "Service role can read newsletter subscriptions" ON newsletter_subscriptions
  FOR SELECT USING (auth.role() = 'service_role');