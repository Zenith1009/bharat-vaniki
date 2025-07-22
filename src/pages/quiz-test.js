import { QuizContainer } from '../components/features/Quiz';

export default function QuizTestPage() {
  const handleQuizComplete = (results) => {
    console.log('Quiz completed:', results);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Quiz Component Test
        </h1>
        
        <QuizContainer
          selectedCategory="biodiversity"
          questionCount={5}
          onQuizComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
}