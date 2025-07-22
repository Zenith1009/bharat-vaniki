/**
 * Quiz Data Validation Utilities
 * Validates quiz question structure and content
 */

// Valid categories for quiz questions
export const VALID_CATEGORIES = ['biodiversity', 'conservation', 'ecology', 'general'];

// Valid difficulty levels
export const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

/**
 * Validates a single quiz question object
 * @param {Object} question - The quiz question to validate
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export function validateQuizQuestion(question) {
  const errors = [];

  // Check required fields
  if (!question.id || typeof question.id !== 'string') {
    errors.push('Question must have a valid string id');
  }

  if (!question.category || !VALID_CATEGORIES.includes(question.category)) {
    errors.push(`Question category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (!question.question || typeof question.question !== 'string') {
    errors.push('Question must have a valid question text');
  }

  if (!Array.isArray(question.options) || question.options.length !== 4) {
    errors.push('Question must have exactly 4 options as an array');
  }

  if (typeof question.correctAnswer !== 'number' || 
      question.correctAnswer < 0 || 
      question.correctAnswer > 3) {
    errors.push('correctAnswer must be a number between 0 and 3');
  }

  if (!question.explanation || typeof question.explanation !== 'string') {
    errors.push('Question must have a valid explanation');
  }

  if (!question.difficulty || !VALID_DIFFICULTIES.includes(question.difficulty)) {
    errors.push(`Question difficulty must be one of: ${VALID_DIFFICULTIES.join(', ')}`);
  }

  // Optional imageUrl validation
  if (question.imageUrl && typeof question.imageUrl !== 'string') {
    errors.push('imageUrl must be a string if provided');
  }

  // Validate options are all strings
  if (Array.isArray(question.options)) {
    question.options.forEach((option, index) => {
      if (typeof option !== 'string') {
        errors.push(`Option ${index + 1} must be a string`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates an array of quiz questions
 * @param {Array} questions - Array of quiz questions to validate
 * @returns {Object} - Validation result with overall validity and detailed errors
 */
export function validateQuizQuestions(questions) {
  if (!Array.isArray(questions)) {
    return {
      isValid: false,
      errors: ['Questions must be provided as an array'],
      questionErrors: []
    };
  }

  const questionErrors = [];
  let totalErrors = 0;

  questions.forEach((question, index) => {
    const validation = validateQuizQuestion(question);
    if (!validation.isValid) {
      questionErrors.push({
        questionIndex: index,
        questionId: question.id || `question-${index}`,
        errors: validation.errors
      });
      totalErrors += validation.errors.length;
    }
  });

  // Check for duplicate IDs
  const ids = questions.map(q => q.id).filter(Boolean);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    questionErrors.push({
      questionIndex: -1,
      questionId: 'duplicate-check',
      errors: [`Duplicate question IDs found: ${duplicateIds.join(', ')}`]
    });
    totalErrors++;
  }

  return {
    isValid: totalErrors === 0,
    totalQuestions: questions.length,
    validQuestions: questions.length - questionErrors.length,
    totalErrors,
    questionErrors
  };
}

/**
 * Gets statistics about quiz questions by category and difficulty
 * @param {Array} questions - Array of quiz questions
 * @returns {Object} - Statistics object
 */
export function getQuizStatistics(questions) {
  const stats = {
    total: questions.length,
    byCategory: {},
    byDifficulty: {},
    categoryCounts: {},
    difficultyCounts: {}
  };

  // Initialize counters
  VALID_CATEGORIES.forEach(category => {
    stats.byCategory[category] = [];
    stats.categoryCounts[category] = 0;
  });

  VALID_DIFFICULTIES.forEach(difficulty => {
    stats.byDifficulty[difficulty] = [];
    stats.difficultyCounts[difficulty] = 0;
  });

  // Count questions by category and difficulty
  questions.forEach(question => {
    if (question.category && VALID_CATEGORIES.includes(question.category)) {
      stats.byCategory[question.category].push(question);
      stats.categoryCounts[question.category]++;
    }

    if (question.difficulty && VALID_DIFFICULTIES.includes(question.difficulty)) {
      stats.byDifficulty[question.difficulty].push(question);
      stats.difficultyCounts[question.difficulty]++;
    }
  });

  return stats;
}

/**
 * Filters questions by category and/or difficulty
 * @param {Array} questions - Array of quiz questions
 * @param {Object} filters - Filter options
 * @param {string} filters.category - Category to filter by
 * @param {string} filters.difficulty - Difficulty to filter by
 * @returns {Array} - Filtered questions
 */
export function filterQuestions(questions, filters = {}) {
  return questions.filter(question => {
    if (filters.category && question.category !== filters.category) {
      return false;
    }
    if (filters.difficulty && question.difficulty !== filters.difficulty) {
      return false;
    }
    return true;
  });
}

/**
 * Shuffles an array of questions randomly
 * @param {Array} questions - Array of quiz questions
 * @returns {Array} - Shuffled questions
 */
export function shuffleQuestions(questions) {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}