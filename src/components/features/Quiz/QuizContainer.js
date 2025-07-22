import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import QuizQuestion from './QuizQuestion';
import QuizProgress from './QuizProgress';
import QuizResults from './QuizResults';
import QuizReview from './QuizReview';
import quizData from '../../../data/quiz/questions.json';
import categoriesData from '../../../data/quiz/categories.json';
import configData from '../../../data/quiz/config.json';

const QuizContainer = ({
  selectedCategory = null,
  questionCount = 10,
  onQuizComplete = null,
  onBackToSelection = null
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);


  // Sound effects
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.3 });
  const [playTick] = useSound('/sounds/tick.mp3', { volume: 0.2 });
  const [playTimeWarning] = useSound('/sounds/warning.mp3', { volume: 0.4 });

  // Initialize quiz questions based on category and settings
  useEffect(() => {
    const initializeQuiz = () => {
      let filteredQuestions = [...quizData];

      // Filter by category if specified
      if (selectedCategory && selectedCategory !== 'all') {
        filteredQuestions = quizData.filter(q => q.category === selectedCategory);
      }

      // Shuffle questions if enabled in config
      if (configData.quiz.settings.shuffleQuestions) {
        filteredQuestions = shuffleArray(filteredQuestions);
      }

      // Limit to requested question count
      const limitedQuestions = filteredQuestions.slice(0, questionCount);
      
      console.log('Quiz initialization:', {
        selectedCategory,
        questionCount,
        filteredQuestionsLength: filteredQuestions.length,
        limitedQuestionsLength: limitedQuestions.length
      });

      setQuizQuestions(limitedQuestions);
    };

    initializeQuiz();
  }, [selectedCategory, questionCount]);

  // Timer functionality
  useEffect(() => {
    if (isQuizStarted && !isQuizCompleted && configData.quiz.settings.timePerQuestion) {
      setTimeRemaining(configData.quiz.settings.timePerQuestion);

      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return configData.quiz.settings.timePerQuestion;
          }
          // Play warning sound when 5 seconds left
          if (prev === 6) {
            playTimeWarning();
          }
          // Play tick sound for last 3 seconds
          if (prev <= 3) {
            playTick();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, isQuizStarted, isQuizCompleted, playTimeWarning, playTick]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswerSelect = (questionId, selectedOptionIndex) => {
    playClick(); // Play sound when answer is selected
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const completeQuiz = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setIsQuizCompleted(true);

    if (onQuizComplete) {
      onQuizComplete({
        score: calculatedScore,
        answers: selectedAnswers,
        questions: quizQuestions,
        totalQuestions: quizQuestions.length
      });
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    quizQuestions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      const difficulty = categoriesData.difficulties.find(d => d.id === question.difficulty);
      const points = difficulty ? difficulty.points : 10;

      totalPoints += points;

      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
        earnedPoints += points;
      }
    });

    return {
      correctAnswers,
      totalQuestions: quizQuestions.length,
      percentage: Math.round((correctAnswers / quizQuestions.length) * 100),
      points: earnedPoints,
      totalPoints
    };
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsQuizCompleted(false);
  };

  const restartQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setShowReview(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
  };

  const handleReviewAnswers = () => {
    setShowReview(true);
  };

  const handleBackToResults = () => {
    setShowReview(false);
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const getCurrentQuestion = () => {
    return quizQuestions[currentQuestionIndex];
  };

  const isAnswerSelected = () => {
    const currentQuestion = getCurrentQuestion();
    return currentQuestion && selectedAnswers.hasOwnProperty(currentQuestion.id);
  };

  // Quiz intro screen
  if (!isQuizStarted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {configData.quiz.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {configData.quiz.description}
          </p>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-green-800 mb-2">Quiz Details:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• {quizQuestions.length} questions</li>
              <li>• {selectedCategory ? `Category: ${categoriesData.categories.find(c => c.id === selectedCategory)?.name || 'Mixed'}` : 'Mixed categories'}</li>
              {configData.quiz.settings.timePerQuestion && (
                <li>• {configData.quiz.settings.timePerQuestion} seconds per question</li>
              )}
              <li>• Passing score: {configData.quiz.scoring.passingScore}%</li>
            </ul>
          </div>

          <button
            onClick={startQuiz}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz completed screen - show results or review
  if (isQuizCompleted) {
    if (showReview) {
      return (
        <QuizReview
          questions={quizQuestions}
          answers={selectedAnswers}
          onBackToResults={handleBackToResults}
          onRetakeQuiz={restartQuiz}
          onBackToHome={handleBackToHome}
        />
      );
    }

    return (
      <QuizResults
        score={score}
        answers={selectedAnswers}
        questions={quizQuestions}
        category={selectedCategory}
        onReviewAnswers={handleReviewAnswers}
        onRetakeQuiz={restartQuiz}
        onBackToHome={handleBackToHome}
        onBackToSelection={onBackToSelection}
      />
    );
  }

  // Main quiz interface
  const currentQuestion = getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <p className="text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Progress Bar */}
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          timeRemaining={timeRemaining}
        />

        {/* Question */}
        <div className="p-6">
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswers[currentQuestion.id]}
            onAnswerSelect={(selectedOptionIndex) =>
              handleAnswerSelect(currentQuestion.id, selectedOptionIndex)
            }
            questionNumber={currentQuestionIndex + 1}
          />
        </div>



        {/* Navigation */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>

          <button
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;