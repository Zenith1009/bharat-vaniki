import { useEffect, useState } from 'react';

const QuizProgress = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining = null,
  showTimer = true 
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (!timeRemaining) return 'text-gray-600';
    if (timeRemaining <= 5) return 'text-red-600';
    if (timeRemaining <= 10) return 'text-orange-600';
    return 'text-green-600';
  };

  const getTimerBgColor = () => {
    if (!timeRemaining) return 'bg-gray-100';
    if (timeRemaining <= 5) return 'bg-red-100';
    if (timeRemaining <= 10) return 'bg-orange-100';
    return 'bg-green-100';
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        
        {/* Progress indicator dots */}
        <div className="absolute top-0 left-0 w-full h-2 flex justify-between">
          {Array.from({ length: totalQuestions }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full border-2 -mt-0.5 transition-all duration-300 ${
                index < currentQuestion
                  ? 'bg-green-600 border-green-600'
                  : index === currentQuestion - 1
                  ? 'bg-green-400 border-green-400 scale-125'
                  : 'bg-white border-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Info */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Question Counter */}
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-700">
              Question {currentQuestion} of {totalQuestions}
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>

          {/* Timer */}
          {showTimer && timeRemaining !== null && (
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getTimerBgColor()}`}>
              <svg 
                className={`w-4 h-4 ${getTimerColor()}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className={`text-sm font-medium ${getTimerColor()}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar Labels */}
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Start</span>
          <span className="font-medium">
            {currentQuestion === totalQuestions ? 'Complete!' : `${totalQuestions - currentQuestion} remaining`}
          </span>
          <span>Finish</span>
        </div>
      </div>


    </div>
  );
};

export default QuizProgress;