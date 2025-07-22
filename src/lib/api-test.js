// API Test Script - Run this to test all endpoints
// Usage: node src/lib/api-test.js (when server is running)

const BASE_URL = 'http://localhost:3000/api'

async function testAPI() {
  console.log('🧪 Testing Indian Forests Website API Endpoints\n')

  // Test Quiz Questions API
  console.log('📝 Testing Quiz API...')
  try {
    const response = await fetch(`${BASE_URL}/quiz/questions?limit=2`)
    const data = await response.json()
    console.log('✅ GET /api/quiz/questions:', data.success ? 'SUCCESS' : 'FAILED')
    console.log(`   Questions returned: ${data.data?.length || 0}`)
  } catch (error) {
    console.log('❌ GET /api/quiz/questions: FAILED -', error.message)
  }

  // Test Quiz Categories API
  try {
    const response = await fetch(`${BASE_URL}/quiz/categories`)
    const data = await response.json()
    console.log('✅ GET /api/quiz/categories:', data.success ? 'SUCCESS' : 'FAILED')
  } catch (error) {
    console.log('❌ GET /api/quiz/categories: FAILED -', error.message)
  }

  // Test Insights Stats API
  console.log('\n📊 Testing Insights API...')
  try {
    const response = await fetch(`${BASE_URL}/insights/stats`)
    const data = await response.json()
    console.log('✅ GET /api/insights/stats:', data.success ? 'SUCCESS' : 'FAILED')
    console.log(`   Forest cover: ${data.data?.statistics?.totalForestCover || 'N/A'} sq km`)
  } catch (error) {
    console.log('❌ GET /api/insights/stats: FAILED -', error.message)
  }

  // Test Donations API
  console.log('\n💰 Testing Donations API...')
  try {
    const response = await fetch(`${BASE_URL}/donations/causes?featured=true`)
    const data = await response.json()
    console.log('✅ GET /api/donations/causes:', data.success ? 'SUCCESS' : 'FAILED')
    console.log(`   Featured causes: ${data.total || 0}`)
  } catch (error) {
    console.log('❌ GET /api/donations/causes: FAILED -', error.message)
  }

  // Test Contact Form API (POST)
  console.log('\n📧 Testing Contact API...')
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from API testing script.'
      })
    })
    const data = await response.json()
    console.log('✅ POST /api/contact:', data.success ? 'SUCCESS' : 'FAILED')
    if (!data.success) console.log(`   Error: ${data.error}`)
  } catch (error) {
    console.log('❌ POST /api/contact: FAILED -', error.message)
  }

  // Test Newsletter API (POST)
  console.log('\n📰 Testing Newsletter API...')
  try {
    const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test-newsletter@example.com'
      })
    })
    const data = await response.json()
    console.log('✅ POST /api/newsletter/subscribe:', data.success ? 'SUCCESS' : 'FAILED')
    if (!data.success) console.log(`   Error: ${data.error}`)
  } catch (error) {
    console.log('❌ POST /api/newsletter/subscribe: FAILED -', error.message)
  }

  // Test Quiz Score Saving (POST)
  console.log('\n🎯 Testing Quiz Score API...')
  try {
    const response = await fetch(`${BASE_URL}/quiz/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: 'test-session-' + Date.now(),
        score: 8,
        category: 'biodiversity',
        totalQuestions: 10
      })
    })
    const data = await response.json()
    console.log('✅ POST /api/quiz/questions (save score):', data.success ? 'SUCCESS' : 'FAILED')
    if (!data.success) console.log(`   Error: ${data.error}`)
  } catch (error) {
    console.log('❌ POST /api/quiz/questions: FAILED -', error.message)
  }

  console.log('\n🏁 API Testing Complete!')
}

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  testAPI().catch(console.error)
}

export default testAPI