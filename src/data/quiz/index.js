/**
 * Quiz Data Module
 * Exports all quiz-related data, utilities, and configurations
 */

import questions from './questions.json';
import categories from './categories.json';
import config from './config.json';
import {
  validateQuizQuestion,
  validateQuizQuestions,
  getQuizStatistics,
  filterQuestions,
  shuffleQuestions,
  VALID_CATEGORIES,
  VALID_DIFFICULTIES
} from './validation.js';

// Export raw data
export { questions, categories, config };

// Export validation utilities
export {
  validateQuizQuestion,
  validateQuizQuestions,
  getQuizStatistics,
  filterQuestions,
  shuffleQuestions,
  VALID_CATEGORIES,
  VALID_DIFFICULTIES
};

/**
 * Get questions by category
 * @param {string} category - Category to filter by
 * @returns {Array} - Questions in the specified category
 */
export function getQuestionsByCategory(category) {
  return filterQuestions(questions, { category });
}

/**
 * Get questions by difficulty
 * @param {string} difficulty - Difficulty level to filter by
 * @returns {Array} - Questions of the specified difficulty
 */
export function getQuestionsByDifficulty(difficulty) {
  return filterQuestions(questions, { difficulty });
}

/**
 * Get a random set of questions
 * @param {number} count - Number of questions to return
 * @param {Object} filters - Optional filters for category/difficulty
 * @returns {Array} - Random set of questions
 */
export function getRandomQuestions(count = 10, filters = {}) {
  const filteredQuestions = filterQuestions(questions, filters);
  const shuffled = shuffleQuestions(filteredQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get quiz configuration
 * @returns {Object} - Quiz configuration object
 */
export function getQuizConfig() {
  return config.quiz;
}

/**
 * Get category information
 * @param {string} categoryId - Optional category ID to get specific category
 * @returns {Object|Array} - Category information
 */
export function getCategoryInfo(categoryId = null) {
  if (categoryId) {
    return categories.categories.find(cat => cat.id === categoryId);
  }
  return categories.categories;
}

/**
 * Get difficulty information
 * @param {string} difficultyId - Optional difficulty ID to get specific difficulty
 * @returns {Object|Array} - Difficulty information
 */
export function getDifficultyInfo(difficultyId = null) {
  if (difficultyId) {
    return categories.difficulties.find(diff => diff.id === difficultyId);
  }
  return categories.difficulties;
}

/**
 * Calculate quiz score
 * @param {Array} answers - User's answers array
 * @param {Array} questions - Questions array
 * @returns {Object} - Score calculation result
 */
export function calculateScore(answers, questions) {
  let correctAnswers = 0;
  let totalPoints = 0;
  let maxPoints = 0;

  const results = answers.map((answer, index) => {
    const question = questions[index];
    const isCorrect = answer === question.correctAnswer;
    const difficultyInfo = getDifficultyInfo(question.difficulty);
    const points = difficultyInfo ? difficultyInfo.points : 10;
    
    maxPoints += points;
    
    if (isCorrect) {
      correctAnswers++;
      totalPoints += points;
    }

    return {
      questionId: question.id,
      userAnswer: answer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      points: isCorrect ? points : 0,
      maxPoints: points
    };
  });

  const percentage = Math.round((correctAnswers / questions.length) * 100);
  const pointPercentage = Math.round((totalPoints / maxPoints) * 100);

  // Determine feedback based on percentage
  const feedbackConfig = config.quiz.feedback;
  let feedback = feedbackConfig.needsImprovement;
  
  if (percentage >= feedbackConfig.excellent.threshold) {
    feedback = feedbackConfig.excellent;
  } else if (percentage >= feedbackConfig.good.threshold) {
    feedback = feedbackConfig.good;
  } else if (percentage >= feedbackConfig.average.threshold) {
    feedback = feedbackConfig.average;
  }

  return {
    correctAnswers,
    totalQuestions: questions.length,
    percentage,
    totalPoints,
    maxPoints,
    pointPercentage,
    feedback,
    results,
    passed: percentage >= config.quiz.scoring.passingScore
  };
}

/**
 * Validate all quiz data on import
 */
const validation = validateQuizQuestions(questions);
if (!validation.isValid) {
  console.warn('Quiz data validation failed:', validation);
}

// Export validation result for debugging
export const dataValidation = validation;