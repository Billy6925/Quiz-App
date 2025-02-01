import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
    const storedQuizData = JSON.parse(localStorage.getItem("lastQuizData")) || {};
    
    setUserAnswers(storedAnswers);
    setQuestions(storedQuizData.questions || []);
    setResults(storedQuizData.results || []);

    if (storedQuizData.results) {
      const correctCount = storedQuizData.results.filter(r => r.isCorrect).length;
      const total = storedQuizData.results.length;
      setScore(correctCount);
      setPercentage(((correctCount / total) * 100).toFixed(2));
    }
    
    completeQuiz(storedQuizData);
  }, []);

  const completeQuiz = (quizData) => {
    if (!quizData.results) return;

    const newQuizData = {
      questions: quizData.questions,
      results: quizData.results,
    };

    const existingHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    existingHistory.unshift(newQuizData);
    localStorage.setItem("quizHistory", JSON.stringify(existingHistory));
    localStorage.removeItem('quizState');
  };

  const handleTryAnother = async () => {
    setIsLoading(true);
    try {
      // Clear localStorage items
      localStorage.removeItem("userAnswers");
      localStorage.removeItem("lastQuizData");
      
      // Simulate some loading time (you can remove this in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to categories
      navigate("/categories");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-lg font-semibold text-gray-700">Loading Categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h2>
          <div className="flex justify-center gap-8">
            <div className="text-lg">
              <span className="font-semibold">Score:</span> {score} / {questions.length}
            </div>
            <div className="text-lg">
              <span className="font-semibold">Percentage:</span> {percentage}%
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="font-semibold mb-2">Question {index + 1}:</div>
              <div className="mb-2">{result.question}</div>
              <div className={`mb-1 ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                <span className="font-medium">Your Answer:</span> {result.userAnswer}
                <span className="ml-2">{result.isCorrect ? "✓" : "✗"}</span>
              </div>
              {!result.isCorrect && (
                <div className="text-gray-700">
                  <span className="font-medium">Correct Answer:</span> {result.correctAnswer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
        <button
  onClick={() => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/categories');
    }, 1000);
  }}
  disabled={isLoading}
  className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors duration-200 
    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
>
  {isLoading ? 'Loading...' : 'Try Another Quiz'}
</button>
          <button
            onClick={() => navigate("/summary")}
            disabled={isLoading}
            className={`px-6 py-2 bg-gray-600 text-white rounded-lg transition-colors duration-200 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
          >
            View Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;