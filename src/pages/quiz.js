import { useState } from 'react';
import { QuizContainer } from '../components/features/Quiz';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import categoriesData from '../data/quiz/categories.json';
import configData from '../data/quiz/config.json';

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = (results) => {
    console.log('Quiz completed:', results);
    // Could save results to localStorage or send to API
  };

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const resetQuizSelection = () => {
    setShowQuiz(false);
    setSelectedCategory(null);
    setQuestionCount(10);
  };

  if (showQuiz) {
    return (
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8">
        <QuizContainer
          selectedCategory={selectedCategory}
          questionCount={questionCount}
          onQuizComplete={handleQuizComplete}
          onBackToSelection={resetQuizSelection}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                🌲 Forest Knowledge Quiz
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                Test your knowledge about India's diverse forests, wildlife, and conservation efforts
              </p>
              <div className="flex items-center justify-center space-x-4 text-green-100">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🏆</span>
                  <span>Earn Achievements</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  <span>Track Progress</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  <span>Learn & Improve</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quiz Configuration */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-gray-800 mb-2">
                  Customize Your Quiz Experience
                </CardTitle>
                <p className="text-gray-600">
                  Choose your preferred category and number of questions to get started
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Category Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Category</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(null)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedCategory === null
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">🌍</div>
                      <div className="font-semibold">All Categories</div>
                      <div className="text-sm text-gray-600">Mixed questions</div>
                    </motion.button>
                    
                    {categoriesData.categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-gray-200 bg-white hover:border-green-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <div className="font-semibold">{category.name}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Question Count Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Number of Questions</h3>
                  <div className="flex flex-wrap gap-3">
                    {[5, 10, 15, 20].map((count) => (
                      <motion.button
                        key={count}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuestionCount(count)}
                        className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-200 ${
                          questionCount === count
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                        }`}
                      >
                        {count} Questions
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quiz Info */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Quiz Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⏱️</span>
                      <span>{configData.quiz.settings.timePerQuestion} seconds per question</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🎯</span>
                      <span>Passing score: {configData.quiz.scoring.passingScore}%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🏅</span>
                      <span>Points based on difficulty</span>
                    </div>
                  </div>
                </div>

                {/* Start Quiz Button */}
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={startQuiz}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg"
                    >
                      🚀 Start Quiz ({questionCount} Questions)
                    </Button>
                  </motion.div>
                  <p className="text-sm text-gray-600 mt-3">
                    Category: {selectedCategory ? 
                      categoriesData.categories.find(c => c.id === selectedCategory)?.name : 
                      'All Categories'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }