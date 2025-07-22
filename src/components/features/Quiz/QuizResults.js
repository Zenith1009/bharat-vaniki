import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import configData from '../../../data/quiz/config.json';
import categoriesData from '../../../data/quiz/categories.json';

const QuizResults = ({ 
  score, 
  answers, 
  questions, 
  onReviewAnswers, 
  onRetakeQuiz, 
  onBackToHome,
  onBackToSelection = null,
  category = null 
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Sound effects
  const [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.6 });
  const [playFailure] = useSound('/sounds/failure.mp3', { volume: 0.4 });
  const [playAchievement] = useSound('/sounds/achievement.mp3', { volume: 0.7 });
  const [playApplause] = useSound('/sounds/applause.mp3', { volume: 0.5 });

  // Get window size for confetti
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);

    // Calculate achievements
    calculateAchievements();

    // Play sound effects based on performance
    const soundTimer = setTimeout(() => {
      if (score.percentage >= 90) {
        playApplause();
        setShowConfetti(true);
        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
      } else if (score.percentage >= configData.quiz.scoring.passingScore) {
        playSuccess();
      } else {
        playFailure();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(soundTimer);
    };
  }, [score.percentage, playApplause, playSuccess, playFailure]);

  const calculateAchievements = () => {
    const earnedAchievements = [];
    
    // Perfect score achievement
    if (score.percentage === 100) {
      const achievement = configData.quiz.achievements.find(a => a.id === 'perfect_score');
      if (achievement) earnedAchievements.push(achievement);
    }

    // Category-specific achievements
    if (category && score.percentage >= 90) {
      const categoryAchievement = configData.quiz.achievements.find(a => 
        a.id === `${category}_master` || a.id === `${category}_expert` || a.id === `${category}_champion`
      );
      if (categoryAchievement) earnedAchievements.push(categoryAchievement);
    }

    // First quiz achievement (could be tracked via localStorage)
    const hasCompletedBefore = localStorage.getItem('quiz_completed');
    if (!hasCompletedBefore) {
      const firstQuizAchievement = configData.quiz.achievements.find(a => a.id === 'first_quiz');
      if (firstQuizAchievement) earnedAchievements.push(firstQuizAchievement);
      localStorage.setItem('quiz_completed', 'true');
    }

    setAchievements(earnedAchievements);
    
    // Play achievement sound if any achievements were earned
    if (earnedAchievements.length > 0) {
      setTimeout(() => {
        playAchievement();
      }, 2000);
    }
  };

  const getFeedback = () => {
    return Object.values(configData.quiz.feedback)
      .reverse()
      .find(f => score.percentage >= f.threshold);
  };

  const getScoreColor = () => {
    if (score.percentage >= 90) return 'text-green-600';
    if (score.percentage >= 70) return 'text-blue-600';
    if (score.percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = () => {
    if (score.percentage >= 90) return 'bg-green-50 border-green-200';
    if (score.percentage >= 70) return 'bg-blue-50 border-blue-200';
    if (score.percentage >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getCategoryBreakdown = () => {
    const breakdown = {};
    
    questions.forEach(question => {
      if (!breakdown[question.category]) {
        breakdown[question.category] = {
          total: 0,
          correct: 0,
          points: 0,
          totalPoints: 0
        };
      }
      
      breakdown[question.category].total++;
      breakdown[question.category].totalPoints += categoriesData.difficulties.find(d => d.id === question.difficulty)?.points || 10;
      
      if (answers[question.id] === question.correctAnswer) {
        breakdown[question.category].correct++;
        breakdown[question.category].points += categoriesData.difficulties.find(d => d.id === question.difficulty)?.points || 10;
      }
    });

    return breakdown;
  };

  const feedback = getFeedback();
  const categoryBreakdown = getCategoryBreakdown();
  const isPassing = score.percentage >= configData.quiz.scoring.passingScore;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Confetti for excellent performance */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header with Animation */}
        <div className={`text-center py-8 px-6 ${getScoreBgColor()} border-b`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            {feedback?.badge}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Quiz Completed!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-gray-600 mb-4"
          >
            {feedback?.message}
          </motion.p>

          {/* Pass/Fail Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              isPassing 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {isPassing ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Passed
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Needs Improvement
              </>
            )}
          </motion.div>
        </div>

        {/* Score Statistics */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor()}`}>
                {score.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor()}`}>
                {score.percentage}%
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {score.points}
              </div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {score.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          {Object.keys(categoryBreakdown).length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance by Category</h3>
              <div className="space-y-3">
                {Object.entries(categoryBreakdown).map(([categoryId, stats]) => {
                  const categoryInfo = categoriesData.categories.find(c => c.id === categoryId);
                  const percentage = Math.round((stats.correct / stats.total) * 100);
                  
                  return (
                    <div key={categoryId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{categoryInfo?.icon}</span>
                        <div>
                          <div className="font-medium text-gray-800">{categoryInfo?.name}</div>
                          <div className="text-sm text-gray-600">
                            {stats.correct}/{stats.total} correct • {stats.points}/{stats.totalPoints} points
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          percentage >= 80 ? 'text-green-600' : 
                          percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements Unlocked!</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.2 }}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{achievement.name}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={onReviewAnswers}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Review Answers
            </button>
            
            <button
              onClick={onRetakeQuiz}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Retake Quiz
            </button>
            
{onBackToSelection && (
              <button
                onClick={onBackToSelection}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                New Quiz
              </button>
            )}
            
            <button
              onClick={onBackToHome}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Home
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResults;