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
    const result = await DataManager.getForestStatistics()
    
    if (!result.success) {
      return res.status(400).json(result)
    }

    // Add computed statistics
    const data = result.data
    const computedStats = {
      ...data,
      computed: {
        totalSpecies: data.species ? data.species.length : 0,
        totalRegions: data.regions ? data.regions.length : 0,
        endangeredSpecies: data.species ? data.species.filter(s => s.status === 'Endangered').length : 0,
        averageRegionArea: data.regions ? data.regions.reduce((sum, r) => sum + r.area, 0) / data.regions.length : 0,
        lastUpdated: new Date().toISOString()
      }
    }

    res.status(200).json({
      success: true,
      data: computedStats
    })
  } catch (error) {
    console.error('Error fetching forest statistics:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forest statistics'
    })
  }
}