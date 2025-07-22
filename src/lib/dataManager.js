// Data Manager - Handles both static and dynamic data
import { supabase, dbHelpers } from './supabase'

// Static data imports
import quizQuestions from '../data/quiz/questions.json'
import quizCategories from '../data/quiz/categories.json'
import quizConfig from '../data/quiz/config.json'
import insightsStats from '../data/insights/statistics.json'
import donationCauses from '../data/donations/causes.json'
import donationOrganizations from '../data/donations/organizations.json'

export class DataManager {
  // Quiz Data Management
  static async getQuizQuestions(category = null, difficulty = null) {
    try {
      let questions = quizQuestions

      // Filter by category if specified
      if (category && category !== 'all') {
        questions = questions.filter(q => q.category === category)
      }

      // Filter by difficulty if specified
      if (difficulty && difficulty !== 'all') {
        questions = questions.filter(q => q.difficulty === difficulty)
      }

      // Shuffle questions for randomness
      questions = this.shuffleArray([...questions])

      return {
        success: true,
        data: questions,
        total: questions.length
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error)
      return {
        success: false,
        error: 'Failed to fetch quiz questions',
        data: []
      }
    }
  }

  static async getQuizCategories() {
    try {
      return {
        success: true,
        data: quizCategories
      }
    } catch (error) {
      console.error('Error fetching quiz categories:', error)
      return {
        success: false,
        error: 'Failed to fetch quiz categories',
        data: []
      }
    }
  }

  static async getQuizConfig() {
    try {
      return {
        success: true,
        data: quizConfig
      }
    } catch (error) {
      console.error('Error fetching quiz config:', error)
      return {
        success: false,
        error: 'Failed to fetch quiz config',
        data: {}
      }
    }
  }

  static async saveQuizScore(sessionId, score, category, totalQuestions) {
    try {
      await dbHelpers.saveQuizScore(sessionId, score, category, totalQuestions)
      return {
        success: true,
        message: 'Quiz score saved successfully'
      }
    } catch (error) {
      console.error('Error saving quiz score:', error)
      return {
        success: false,
        error: 'Failed to save quiz score'
      }
    }
  }

  static async getQuizStatistics() {
    try {
      const scores = await dbHelpers.getQuizStats()
      
      // Calculate statistics
      const stats = {
        totalAttempts: scores.length,
        averageScore: scores.length > 0 ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length : 0,
        categoryStats: {},
        recentAttempts: scores.slice(-10)
      }

      // Calculate category-wise statistics
      scores.forEach(score => {
        if (!stats.categoryStats[score.category]) {
          stats.categoryStats[score.category] = {
            attempts: 0,
            totalScore: 0,
            averageScore: 0
          }
        }
        stats.categoryStats[score.category].attempts++
        stats.categoryStats[score.category].totalScore += score.score
      })

      // Calculate averages for each category
      Object.keys(stats.categoryStats).forEach(category => {
        const categoryData = stats.categoryStats[category]
        categoryData.averageScore = categoryData.totalScore / categoryData.attempts
      })

      return {
        success: true,
        data: stats
      }
    } catch (error) {
      console.error('Error fetching quiz statistics:', error)
      return {
        success: false,
        error: 'Failed to fetch quiz statistics',
        data: {}
      }
    }
  }

  // Insights Data Management
  static async getForestStatistics() {
    try {
      return {
        success: true,
        data: insightsStats
      }
    } catch (error) {
      console.error('Error fetching forest statistics:', error)
      return {
        success: false,
        error: 'Failed to fetch forest statistics',
        data: {}
      }
    }
  }

  // Donations Data Management
  static async getDonationCauses(featured = null) {
    try {
      let causes = donationCauses

      // Filter by featured status if specified
      if (featured !== null) {
        causes = causes.filter(cause => cause.featured === featured)
      }

      return {
        success: true,
        data: causes,
        total: causes.length
      }
    } catch (error) {
      console.error('Error fetching donation causes:', error)
      return {
        success: false,
        error: 'Failed to fetch donation causes',
        data: []
      }
    }
  }

  static async getDonationOrganizations() {
    try {
      return {
        success: true,
        data: donationOrganizations
      }
    } catch (error) {
      console.error('Error fetching donation organizations:', error)
      return {
        success: false,
        error: 'Failed to fetch donation organizations',
        data: []
      }
    }
  }

  // Contact Form Management
  static async submitContactForm(name, email, message) {
    try {
      // Validate input
      if (!name || !email || !message) {
        return {
          success: false,
          error: 'All fields are required'
        }
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return {
          success: false,
          error: 'Invalid email format'
        }
      }

      await dbHelpers.saveContactSubmission(name, email, message)
      
      return {
        success: true,
        message: 'Contact form submitted successfully'
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      return {
        success: false,
        error: 'Failed to submit contact form'
      }
    }
  }

  // Newsletter Management
  static async subscribeToNewsletter(email) {
    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return {
          success: false,
          error: 'Invalid email format'
        }
      }

      await dbHelpers.subscribeToNewsletter(email)
      
      return {
        success: true,
        message: 'Successfully subscribed to newsletter'
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      
      // Handle duplicate email error
      if (error.code === '23505') {
        return {
          success: false,
          error: 'Email already subscribed'
        }
      }
      
      return {
        success: false,
        error: 'Failed to subscribe to newsletter'
      }
    }
  }

  // Utility Functions
  static shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  static validateInput(input, type = 'string', maxLength = null) {
    if (typeof input !== type) {
      return false
    }
    
    if (type === 'string') {
      input = input.trim()
      if (input.length === 0) return false
      if (maxLength && input.length > maxLength) return false
    }
    
    return true
  }
}

export default DataManager