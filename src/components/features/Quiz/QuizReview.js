import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizQuestion from './QuizQuestion';
import categoriesData from '../../../data/quiz/categories.json';

const QuizReview = ({ 
  questions, 
  answers, 
  onBackToResults, 
  onRetakeQuiz,
  onBackToHome 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filterType, setFilterType] = useState('all'); // 'all', 'correct', 'incorrect'
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    filterQuestions();
  }, [filterType, questions, answers]);

  const filterQuestions = () => {
    let filtered = [...questions];
    
    if (filterType === 'correct') {
      filtered = questions.filter(q => answers[q.id] === q.correctAnswer);
    } else if (filterType === 'incorrect') {
      filtered = questions.filter(q => answers[q.id] !== q.correctAnswer);
    }
    
    setFilteredQuestions(filtered);
    setCurrentQuestionIndex(0);
  };

  const getCurrentQuestion = () => {
    return filteredQuestions[currentQuestionIndex];
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const getQuestionStats = () => {
    const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const incorrect = questions.length - correct;
    return { correct, incorrect, total: questions.length };
  };

  const getAnswerStatus = (question) => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    return {
      isCorrect,
      userAnswer,
      correctAnswer: question.correctAnswer
    };
  };

  const getCategoryStats = () => {
    const stats = {};
    
    questions.forEach(question => {
      if (!stats[question.category]) {
        stats[question.category] = { correct: 0, total: 0 };
      }
      stats[question.category].total++;
      if (answers[question.id] === question.correctAnswer) {
        stats[question.category].correct++;
      }
    });

    return Object.entries(stats).map(([categoryId, data]) => {
      const categoryInfo = categoriesData.categories.find(c => c.id === categoryId);
      return {
        ...categoryInfo,
        ...data,
        percentage: Math.round((data.correct / data.total) * 100)
      };
    });
  };

  const questionStats = getQuestionStats();
  const categoryStats = getCategoryStats();
  const currentQuestion = getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Questions to Review</h2>
          <p className="text-gray-600 mb-6">
            {filterType === 'correct' && 'No correct answers to review.'}
            {filterType === 'incorrect' && 'Great job! No incorrect answers to review.'}
          </p>
          <button
            onClick={onBackToResults}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with Navigation and Stats */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            {/* Filter Options */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter Questions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    filterType === 'all' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  All Questions ({questionStats.total})
                </button>
                <button
                  onClick={() => setFilterType('correct')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    filterType === 'correct' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  ✓ Correct ({questionStats.correct})
                </button>
                <button
                  onClick={() => setFilterType('incorrect')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    filterType === 'incorrect' 
                      ? 'bg-red-100 text-red-800 border border-red-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  ✗ Incorrect ({questionStats.incorrect})
                </button>
              </div>
            </div>

            {/* Question Navigation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Question Navigation</h3>
              <div className="grid grid-cols-5 gap-2">
                {filteredQuestions.map((question, index) => {
                  const status = getAnswerStatus(question);
                  const originalIndex = questions.findIndex(q => q.id === question.id);
                  
                  return (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                        index === currentQuestionIndex
                          ? 'ring-2 ring-blue-500 scale-110'
                          : ''
                      } ${
                        status.isCorrect
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {originalIndex + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Performance */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Performance</h3>
              <div className="space-y-2">
                {categoryStats.map(category => (
                  <div key={category.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </div>
                    <div className={`text-sm font-bold ${
                      category.percentage >= 80 ? 'text-green-600' :
                      category.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {category.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={onBackToResults}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Back to Results
              </button>
              <button
                onClick={onRetakeQuiz}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Retake Quiz
              </button>
              <button
                onClick={onBackToHome}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Answer Review</h2>
                  <p className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                    {filterType !== 'all' && ` (${filterType} answers)`}
                  </p>
                </div>
                
                {/* Answer Status Badge */}
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getAnswerStatus(currentQuestion).isCorrect
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {getAnswerStatus(currentQuestion).isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuizQuestion
                    question={currentQuestion}
                    selectedAnswer={answers[currentQuestion.id]}
                    questionNumber={questions.findIndex(q => q.id === currentQuestion.id) + 1}
                    showExplanation={true}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Additional Insights */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Question Insights</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium">
                      {categoriesData.categories.find(c => c.id === currentQuestion.category)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="ml-2 font-medium">
                      {categoriesData.difficulties.find(d => d.id === currentQuestion.difficulty)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Points:</span>
                    <span className="ml-2 font-medium">
                      {categoriesData.difficulties.find(d => d.id === currentQuestion.difficulty)?.points || 10}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Your Answer:</span>
                    <span className={`ml-2 font-medium ${
                      getAnswerStatus(currentQuestion).isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Option {String.fromCharCode(65 + getAnswerStatus(currentQuestion).userAnswer)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Previous</span>
              </button>

              <div className="text-sm text-gray-600">
                {currentQuestionIndex + 1} of {filteredQuestions.length}
              </div>

              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === filteredQuestions.length - 1}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizReview;