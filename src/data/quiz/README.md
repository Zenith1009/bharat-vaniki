# Quiz Data Structure

This directory contains all quiz-related data, configurations, and utilities for the Indian Forests & Ecosystems Quiz system.

## Files Overview

### `questions.json`
Contains the main quiz questions data with the following structure:
- **Total Questions**: 20 comprehensive questions
- **Categories**: biodiversity (6), conservation (6), ecology (5), general (3)
- **Difficulties**: easy (6), medium (8), hard (6)

Each question follows this structure:
```json
{
  "id": "unique-question-id",
  "category": "biodiversity|conservation|ecology|general",
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0, // Index of correct option (0-3)
  "explanation": "Educational explanation of the answer",
  "difficulty": "easy|medium|hard",
  "imageUrl": "/images/quiz/image-name.jpg" // Optional
}
```

### `categories.json`
Defines quiz categories and difficulty levels with:
- Category metadata (name, description, icon, color, topics)
- Difficulty settings (points, colors, descriptions)

### `config.json`
Contains quiz configuration including:
- Default settings (question count, timing, display options)
- Scoring system (passing scores, bonus points)
- Feedback messages and thresholds
- Achievement definitions

### `validation.js`
Provides validation utilities:
- `validateQuizQuestion()` - Validates individual questions
- `validateQuizQuestions()` - Validates question arrays
- `getQuizStatistics()` - Generates statistics
- `filterQuestions()` - Filters by category/difficulty
- `shuffleQuestions()` - Randomizes question order

### `index.js`
Main export module providing:
- All data exports (questions, categories, config)
- Utility functions for question management
- Score calculation functions
- Data validation on import

## Usage Examples

### Import Quiz Data
```javascript
import { 
  questions, 
  getRandomQuestions, 
  getQuestionsByCategory,
  calculateScore 
} from '@/data/quiz';

// Get 10 random questions
const randomQuiz = getRandomQuestions(10);

// Get biodiversity questions only
const bioQuestions = getQuestionsByCategory('biodiversity');

// Calculate score
const score = calculateScore(userAnswers, quizQuestions);
```

### Validation
```javascript
import { validateQuizQuestions } from '@/data/quiz';

const validation = validateQuizQuestions(questions);
if (!validation.isValid) {
  console.error('Validation errors:', validation.questionErrors);
}
```

## Question Categories

### Biodiversity (6 questions)
- National Parks and Wildlife Sanctuaries
- Endemic and Endangered Species
- Bird Sanctuaries and Migration
- Unique Ecosystems

### Conservation (6 questions)
- Forest Cover Statistics
- Conservation Projects (Project Tiger, etc.)
- Environmental Policies
- Carbon Sequestration

### Ecology (5 questions)
- Forest Types and Characteristics
- Ecological Processes
- Ecosystem Services
- Symbiotic Relationships

### General Knowledge (3 questions)
- Cultural and Historical Significance
- Regional Specialties
- Traditional Uses

## Difficulty Distribution

- **Easy (6 questions)**: Basic concepts, 10 points each
- **Medium (8 questions)**: Intermediate knowledge, 20 points each  
- **Hard (6 questions)**: Advanced topics, 30 points each

## Image Requirements

Questions reference images in `/public/images/quiz/` directory. Images should be:
- Format: JPG/PNG/WebP
- Size: Optimized for web (< 500KB)
- Dimensions: 800x600px recommended
- Alt text: Descriptive for accessibility

## Adding New Questions

1. Follow the exact JSON structure in `questions.json`
2. Ensure unique IDs (format: q1, q2, etc.)
3. Use valid categories and difficulties
4. Provide educational explanations
5. Add corresponding images if needed
6. Run validation to check structure
7. Update this README if adding new categories

## Data Validation

The quiz data is automatically validated on import. Check browser console for any validation warnings. All questions must pass validation for the quiz system to function properly.

## Future Enhancements

- Multi-language support
- Dynamic question loading from API
- User-generated questions
- Advanced filtering options
- Question difficulty adjustment based on user performance