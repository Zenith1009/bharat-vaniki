// API helper functions for Indian Forests Encyclopedia

import { API_ENDPOINTS } from './constants'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function fetchApi(endpoint, options = {}) {
  // Use relative URLs for internal API calls
  const url = endpoint.startsWith('/api') ? endpoint : 
             endpoint.startsWith('http') ? endpoint : 
             `/api${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.error || `API request failed: ${response.statusText}`,
        response.status
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(`Network error: ${error.message}`, 0)
  }
}

// Quiz API functions
export const quizApi = {
  async getQuestions(category = null, difficulty = null, limit = null) {
    const params = new URLSearchParams()
    if (category && category !== 'all') params.append('category', category)
    if (difficulty && difficulty !== 'all') params.append('difficulty', difficulty)
    if (limit) params.append('limit', limit.toString())
    
    const query = params.toString() ? `?${params.toString()}` : ''
    return fetchApi(`/quiz/questions${query}`)
  },

  async getCategories() {
    return fetchApi('/quiz/categories')
  },

  async getStats() {
    return fetchApi('/quiz/stats')
  },

  async saveScore(sessionId, score, category, totalQuestions) {
    return fetchApi('/quiz/questions', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        score,
        category,
        totalQuestions
      }),
    })
  },

  // Legacy method for backward compatibility
  async submitQuizResult(result) {
    return this.saveScore(
      result.sessionId || `session-${Date.now()}`,
      result.score,
      result.category,
      result.totalQuestions
    )
  },
}

// Insights API functions
export const insightsApi = {
  async getStatistics() {
    return fetchApi('/insights/stats')
  },

  async getForestData(region = null) {
    // For now, return all data since our endpoint doesn't filter by region
    // This can be extended later if region filtering is needed
    return fetchApi('/insights/stats')
  },
}

// Donations API functions
export const donationsApi = {
  async getCauses(featured = null) {
    const params = new URLSearchParams()
    if (featured !== null) params.append('featured', featured.toString())
    
    const query = params.toString() ? `?${params.toString()}` : ''
    return fetchApi(`/donations/causes${query}`)
  },

  async getCauseById(id) {
    // Get all causes and filter by ID (since we don't have individual endpoints)
    const response = await this.getCauses()
    if (response.success) {
      const cause = response.data.find(c => c.id === id)
      return {
        success: !!cause,
        data: cause || null,
        error: cause ? null : 'Cause not found'
      }
    }
    return response
  },

  async getOrganizations() {
    return fetchApi('/donations/organizations')
  },
}

// Contact API functions
export const contactApi = {
  async submitForm(formData) {
    return fetchApi('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  },
}

// Newsletter API functions
export const newsletterApi = {
  async subscribe(email) {
    return fetchApi('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },
}

// Generic data fetching with error handling
export async function fetchWithRetry(fetchFn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }
}

// Local storage helpers for offline functionality
export const storage = {
  get(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading from localStorage:`, error)
      return defaultValue
    }
  },

  set(key, value) {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error writing to localStorage:`, error)
    }
  },

  remove(key) {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing from localStorage:`, error)
    }
  },
}

export { ApiError }

// Unified API client for easy access to all endpoints
export const apiClient = {
  quiz: quizApi,
  insights: insightsApi,
  donations: donationsApi,
  contact: contactApi,
  newsletter: newsletterApi,
}

// React hooks for API integration (if using React)
export const useApiClient = () => {
  return apiClient
}

// Utility function to generate session IDs for quiz tracking
export const generateSessionId = () => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Error handling utilities
export const handleApiError = (error) => {
  if (error instanceof ApiError) {
    console.error(`API Error (${error.status}):`, error.message)
    return {
      success: false,
      error: error.message,
      status: error.status
    }
  }
  
  console.error('Unexpected error:', error)
  return {
    success: false,
    error: 'An unexpected error occurred',
    status: 0
  }
}

// Batch API operations
export const batchApi = {
  async getQuizData() {
    try {
      const [questions, categories] = await Promise.all([
        quizApi.getQuestions(),
        quizApi.getCategories()
      ])
      
      return {
        success: true,
        data: {
          questions: questions.data,
          categories: categories.data
        }
      }
    } catch (error) {
      return handleApiError(error)
    }
  },

  async getHomePageData() {
    try {
      const [forestStats, featuredCauses] = await Promise.all([
        insightsApi.getStatistics(),
        donationsApi.getCauses(true)
      ])
      
      return {
        success: true,
        data: {
          forestStats: forestStats.data,
          featuredCauses: featuredCauses.data
        }
      }
    } catch (error) {
      return handleApiError(error)
    }
  }
}

export default apiClient