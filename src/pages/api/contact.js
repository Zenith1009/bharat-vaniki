import DataManager from '../../lib/dataManager'

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
    const { name, email, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: name, email, message'
      })
    }

    // Validate field lengths
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name must be less than 100 characters'
      })
    }

    if (email.length > 255) {
      return res.status(400).json({
        success: false,
        error: 'Email must be less than 255 characters'
      })
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be less than 2000 characters'
      })
    }

    // Basic sanitization
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    }

    const result = await DataManager.submitContactForm(
      sanitizedData.name,
      sanitizedData.email,
      sanitizedData.message
    )

    if (!result.success) {
      return res.status(400).json(result)
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        submittedAt: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email
      }
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form'
    })
  }
}