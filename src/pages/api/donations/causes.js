import DataManager from '../../../lib/dataManager'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    })
  }

  try {
    const { featured } = req.query
    
    // Convert featured query param to boolean if provided
    let featuredFilter = null
    if (featured !== undefined) {
      featuredFilter = featured === 'true'
    }

    const result = await DataManager.getDonationCauses(featuredFilter)
    
    if (!result.success) {
      return res.status(400).json(result)
    }

    res.status(200).json({
      success: true,
      data: result.data,
      total: result.total,
      filters: {
        featured: featuredFilter
      }
    })
  } catch (error) {
    console.error('Error fetching donation causes:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch donation causes'
    })
  }
}