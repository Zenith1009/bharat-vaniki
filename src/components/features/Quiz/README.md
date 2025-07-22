# Quiz Components

This directory contains the core quiz components for the Indian Forests & Ecosystems quiz system.

## Components

### QuizContainer
The main container component that manages the entire quiz flow and state.

**Props:**
- `selectedCategory` (string, optional): Filter questions by category ('biodiversity', 'conservation', 'ecology', 'general', or null for all)
- `questionCount` (number, default: 10): Number of questions to include in the quiz
- `onQuizComplete` (function, optional): Callback function called when quiz is completed

**Features:**
- Complete quiz state management
- Question shuffling (configurable)
- Timer functionality
- Score calculation with difficulty-based points
- Quiz intro and completion screens
- Integration with QuizResults and QuizReview components
- Restart functionality

### QuizQuestion
Component for displaying individual quiz questions with answer options.

**Props:**
- `question` (object, required): Question data object
- `selectedAnswer` (number, optional): Index of currently selected answer
- `onAnswerSelect` (function, required): Callback for answer selection
- `questionNumber` (number, required): Current question number for display
- `showExplanation` (boolean, default: false): Whether to show answer explanations

**Features:**
- Category and difficulty indicators
- Image support with error handling
- Interactive answer selection
- Visual feedback for correct/incorrect answers
- Explanation display with color-coded answer options

### QuizProgress
Component for displaying quiz progress and timer information.

**Props:**
- `currentQuestion` (number, required): Current question number
- `totalQuestions` (number, required): Total number of questions
- `timeRemaining` (number, optional): Seconds remaining for current question
- `showTimer` (boolean, default: true): Whether to display the timer

**Features:**
- Animated progress bar
- Question counter
- Timer with color-coded urgency
- Progress dots for visual feedback
- Completion animation

### QuizResults ✨ NEW
Comprehensive results screen with animations and detailed feedback.

**Props:**
- `score` (object, required): Score object with correctAnswers, percentage, points, totalPoints
- `answers` (object, required): User's selected answers
- `questions` (array, required): Array of quiz questions
- `category` (string, optional): Quiz category for achievement calculation
- `onReviewAnswers` (function, required): Callback to show review screen
- `onRetakeQuiz` (function, required): Callback to restart quiz
- `onBackToHome` (function, required): Callback to navigate home

**Features:**
- Animated score presentation with Framer Motion
- Achievement system with unlockable badges
- Category-wise performance breakdown
- Pass/fail indicators with visual feedback
- Detailed statistics display
- Local storage integration for achievements

### QuizReview ✨ NEW
Advanced answer review system for detailed question analysis.

**Props:**
- `questions` (array, required): Array of quiz questions
- `answers` (object, required): User's selected answers
- `onBackToResults` (function, required): Callback to return to results
- `onRetakeQuiz` (function, required): Callback to restart quiz
- `onBackToHome` (function, required): Callback to navigate home

**Features:**
- Question-by-question review with explanations
- Filter system (all, correct, incorrect answers)
- Visual navigation grid with status indicators
- Category performance sidebar
- Detailed question insights and metadata
- Smooth page transitions between questions

## Usage Example

```jsx
import { QuizContainer } from '../components/features/Quiz';

function QuizPage() {
  const handleQuizComplete = (results) => {
    console.log('Quiz Results:', results);
    // Handle quiz completion (save score, show results, etc.)
  };

  return (
    <QuizContainer
      selectedCategory="biodiversity"
      questionCount={10}
      onQuizComplete={handleQuizComplete}
    />
  );
}
```

## Data Structure

The components expect quiz data in the following format:

```javascript
// Question Object
{
  id: "q1",
  category: "biodiversity",
  question: "Which is the largest national park in India?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: 0,
  explanation: "Detailed explanation of the correct answer...",
  difficulty: "medium",
  imageUrl: "/images/quiz/example.jpg" // optional
}
```

## Styling

Components use Tailwind CSS classes and are designed to be responsive. The color scheme follows the forest theme with green primary colors and appropriate contrast for accessibility.

## Configuration

Quiz behavior is controlled by the configuration file at `src/data/quiz/config.json`, including:
- Timer settings
- Scoring system
- Feedback messages
- Achievement system

## Achievement System ✨ NEW

The quiz system includes an achievement system that tracks user progress:

### Available Achievements
- 🌲 **Forest Explorer**: Complete your first quiz
- 🏆 **Forest Expert**: Score 100% on any quiz
- 🦋 **Biodiversity Master**: Score 90%+ on biodiversity questions
- 🌱 **Conservation Champion**: Score 90%+ on conservation questions
- 🌿 **Ecology Expert**: Score 90%+ on ecology questions
- 🔥 **Dedicated Learner**: Complete 5 quizzes in a row

### Achievement Tracking
- Uses localStorage to persist achievement status
- Automatically unlocks based on quiz performance
- Displays with animations in QuizResults component
- Configurable through config.json

## Animation System

The quiz system uses Framer Motion for smooth, engaging animations:

### QuizResults Animations
- Entrance animations with staggered timing
- Score counter animations
- Badge/emoji scaling animations
- Achievement unlock animations with delays

### QuizReview Animations
- Page transitions between questions
- Smooth filter transitions
- Hover and focus state animations

### Performance Considerations
- Animations are optimized for performance
- Reduced motion support for accessibility
- Smooth 60fps animations on modern devices

## Testing

Test the complete quiz system using the test page at `/quiz-test`:

```jsx
// Access at http://localhost:3000/quiz-test
// Tests all components including new results and review system
```

## Accessibility Features

- Keyboard navigation support
- Screen reader compatible with ARIA labels
- High contrast color schemes
- Focus indicators for all interactive elements
- Reduced motion support for animations