import DataManager from '../../../lib/dataManager'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    switch (req.method) {
      case 'GET':
        await handleGetQuestions(req, res)
        break
      case 'POST':
        await handleSaveScore(req, res)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        })
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

async function handleGetQuestions(req, res) {
  const { category, difficulty, limit } = req.query

  try {
    const result = await DataManager.getQuizQuestions(category, difficulty)
    
    if (!result.success) {
      return res.status(400).json(result)
    }

    let questions = result.data

    // Apply limit if specified
    if (limit && !isNaN(parseInt(limit))) {
      questions = questions.slice(0, parseInt(limit))
    }

    res.status(200).json({
      success: true,
      data: questions,
      total: questions.length,
      filters: {
        category: category || 'all',
        difficulty: difficulty || 'all',
        limit: limit ? parseInt(limit) : null
      }
    })
  } catch (error) {
    console.error('Error fetching quiz questions:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quiz questions'
    })
  }
}

async function handleSaveScore(req, res) {
  const { sessionId, score, category, totalQuestions } = req.body

  // Validate required fields
  if (!sessionId || score === undefined || !category || !totalQuestions) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: sessionId, score, category, totalQuestions'
    })
  }

  // Validate data types
  if (typeof score !== 'number' || typeof totalQuestions !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Score and totalQuestions must be numbers'
    })
  }

  // Validate score range
  if (score < 0 || score > totalQuestions) {
    return res.status(400).json({
      success: false,
      error: 'Score must be between 0 and totalQuestions'
    })
  }

  try {
    const result = await DataManager.saveQuizScore(sessionId, score, category, totalQuestions)
    
    if (!result.success) {
      return res.status(400).json(result)
    }

    res.status(201).json({
      success: true,
      message: 'Quiz score saved successfully',
      data: {
        sessionId,
        score,
        category,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100)
      }
    })
  } catch (error) {
    console.error('Error saving quiz score:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to save quiz score'
    })
  }
}