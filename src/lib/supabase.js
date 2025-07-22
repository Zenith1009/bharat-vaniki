import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database table names
export const TABLES = {
  QUIZ_SCORES: 'quiz_scores',
  CONTACT_SUBMISSIONS: 'contact_submissions',
  NEWSLETTER_SUBSCRIPTIONS: 'newsletter_subscriptions'
}

// Helper functions for common operations
export const dbHelpers = {
  // Quiz scores
  async saveQuizScore(sessionId, score, category, totalQuestions) {
    const { data, error } = await supabase
      .from(TABLES.QUIZ_SCORES)
      .insert({
        user_session: sessionId,
        score,
        category,
        total_questions: totalQuestions,
        completed_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  },

  async getQuizStats() {
    const { data, error } = await supabase
      .from(TABLES.QUIZ_SCORES)
      .select('*')
    
    if (error) throw error
    return data
  },

  // Contact submissions
  async saveContactSubmission(name, email, message) {
    const { data, error } = await supabaseAdmin
      .from(TABLES.CONTACT_SUBMISSIONS)
      .insert({
        name,
        email,
        message,
        submitted_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  },

  // Newsletter subscriptions
  async subscribeToNewsletter(email) {
    const { data, error } = await supabase
      .from(TABLES.NEWSLETTER_SUBSCRIPTIONS)
      .upsert({
        email,
        subscribed_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  }
}