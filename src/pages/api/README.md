# Indian Forests Website API Documentation

This document describes the API endpoints available for the Indian Forests Website.

## Base URL
```
http://localhost:3000/api (development)
https://your-domain.vercel.app/api (production)
```

## Authentication
Most endpoints are public and don't require authentication. Database operations use Supabase with Row Level Security (RLS) policies.

## Endpoints

### Quiz API

#### GET /api/quiz/questions
Fetch quiz questions with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (biodiversity, conservation, ecology, general)
- `difficulty` (optional): Filter by difficulty (easy, medium, hard)
- `limit` (optional): Limit number of questions returned

**Example:**
```
GET /api/quiz/questions?category=biodiversity&difficulty=easy&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "q1",
      "category": "biodiversity",
      "question": "Which is the largest national park in India?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0,
      "explanation": "Detailed explanation...",
      "difficulty": "medium",
      "imageUrl": "/images/quiz/example.jpg"
    }
  ],
  "total": 10,
  "filters": {
    "category": "biodiversity",
    "difficulty": "easy",
    "limit": 10
  }
}
```

#### POST /api/quiz/questions
Save a quiz score to the database.

**Request Body:**
```json
{
  "sessionId": "unique-session-id",
  "score": 8,
  "category": "biodiversity",
  "totalQuestions": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz score saved successfully",
  "data": {
    "sessionId": "unique-session-id",
    "score": 8,
    "category": "biodiversity",
    "totalQuestions": 10,
    "percentage": 80
  }
}
```

#### GET /api/quiz/categories
Get available quiz categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "biodiversity",
      "name": "Biodiversity",
      "description": "Questions about flora and fauna"
    }
  ]
}
```

#### GET /api/quiz/stats
Get quiz statistics and analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalAttempts": 150,
    "averageScore": 7.2,
    "categoryStats": {
      "biodiversity": {
        "attempts": 50,
        "totalScore": 360,
        "averageScore": 7.2
      }
    },
    "recentAttempts": []
  }
}
```

### Insights API

#### GET /api/insights/stats
Get forest statistics and data.

**Response:**
```json
{
  "success": true,
  "data": {
    "statistics": {
      "totalForestCover": 712249,
      "biodiversityCount": 91000,
      "conservationProjects": 870,
      "carbonSequestration": 7124.6
    },
    "regions": [],
    "species": [],
    "computed": {
      "totalSpecies": 2,
      "totalRegions": 2,
      "endangeredSpecies": 2,
      "averageRegionArea": 189000,
      "lastUpdated": "2024-01-20T10:30:00.000Z"
    }
  }
}
```

### Contact API

#### POST /api/contact
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "submittedAt": "2024-01-20T10:30:00.000Z",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Newsletter API

#### POST /api/newsletter/subscribe
Subscribe to newsletter.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": {
    "email": "user@example.com",
    "subscribedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

### Donations API

#### GET /api/donations/causes
Get donation causes and organizations.

**Query Parameters:**
- `featured` (optional): Filter by featured status (true/false)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "wwf-india-forests",
      "title": "Protect India's Forest Ecosystems",
      "organization": "WWF India",
      "shortDescription": "Supporting forest conservation...",
      "category": "Forest Conservation",
      "location": "Pan-India",
      "donationUrl": "https://www.wwfindia.org/donate/",
      "verified": true,
      "featured": true
    }
  ],
  "total": 5,
  "filters": {
    "featured": true
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes:
- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Rate Limiting
Currently no rate limiting is implemented, but it's recommended for production use.

## CORS
All endpoints include CORS headers to allow cross-origin requests.

## Data Validation
- All user inputs are validated and sanitized
- Email addresses are validated using regex
- String lengths are limited to prevent abuse
- Numeric values are validated for proper ranges

## Database Integration
- Static data (quiz questions, forest stats, donation causes) is served from JSON files
- Dynamic data (quiz scores, contact forms, newsletter subscriptions) is stored in Supabase
- Row Level Security (RLS) policies protect sensitive data