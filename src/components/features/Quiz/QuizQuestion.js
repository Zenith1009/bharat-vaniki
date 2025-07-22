import { useState } from 'react';
import Image from 'next/image';
import categoriesData from '../../../data/quiz/categories.json';

const QuizQuestion = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  questionNumber,
  showExplanation = false 
}) => {
  const [imageError, setImageError] = useState(false);

  if (!question) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Question not found</p>
      </div>
    );
  }

  const category = categoriesData.categories.find(cat => cat.id === question.category);
  const difficulty = categoriesData.difficulties.find(diff => diff.id === question.difficulty);

  const handleOptionClick = (optionIndex) => {
    if (onAnswerSelect) {
      onAnswerSelect(optionIndex);
    }
  };

  const getOptionClassName = (optionIndex) => {
    const baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md";
    
    if (showExplanation) {
      // Show correct/incorrect styling when explanation is shown
      if (optionIndex === question.correctAnswer) {
        return `${baseClasses} border-green-500 bg-green-50 text-green-800`;
      } else if (selectedAnswer === optionIndex && optionIndex !== question.correctAnswer) {
        return `${baseClasses} border-red-500 bg-red-50 text-red-800`;
      } else {
        return `${baseClasses} border-gray-200 bg-gray-50 text-gray-600`;
      }
    } else {
      // Normal selection styling
      if (selectedAnswer === optionIndex) {
        return `${baseClasses} border-green-500 bg-green-50 text-green-800 shadow-md`;
      } else {
        return `${baseClasses} border-gray-200 bg-white text-gray-800 hover:border-green-300`;
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{category?.icon}</span>
          <div>
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: category?.color }}
            >
              {category?.name}
            </span>
            <span 
              className="ml-2 inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: difficulty?.color }}
            >
              {difficulty?.name} • {difficulty?.points} pts
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Question {questionNumber}
        </div>
      </div>

      {/* Question Image */}
      {question.imageUrl && !imageError && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={question.imageUrl}
            alt={`Illustration for: ${question.question}`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      )}

      {/* Question Text */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={getOptionClassName(index)}
            disabled={showExplanation}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 font-semibold">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-left">{option}</span>
              {showExplanation && index === question.correctAnswer && (
                <div className="ml-auto flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                <div className="ml-auto flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Explanation (shown when showExplanation is true) */}
      {showExplanation && question.explanation && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800 mb-1">Explanation</h4>
              <p className="text-sm text-blue-700">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Selection Indicator */}
      {!showExplanation && selectedAnswer !== undefined && (
        <div className="text-center">
          <p className="text-sm text-green-600 font-medium">
            ✓ Answer selected: Option {String.fromCharCode(65 + selectedAnswer)}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;