import DataManager from '../../../lib/dataManager'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    })
  }

  try {
    const { email } = req.body

    // Validate required field
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    // Validate email length
    if (email.length > 255) {
      return res.status(400).json({
        success: false,
        error: 'Email must be less than 255 characters'
      })
    }

    // Sanitize email
    const sanitizedEmail = email.trim().toLowerCase()

    const result = await DataManager.subscribeToNewsletter(sanitizedEmail)

    if (!result.success) {
      return res.status(400).json(result)
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email: sanitizedEmail,
        subscribedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe to newsletter'
    })
  }
}