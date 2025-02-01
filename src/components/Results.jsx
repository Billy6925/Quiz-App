import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
    const storedQuizData = JSON.parse(localStorage.getItem("lastQuizData")) || {};
    
    setUserAnswers(storedAnswers);
    setQuestions(storedQuizData.questions || []);
    setResults(storedQuizData.results || []);

    // Calculate score based on stored results
    if (storedQuizData.results) {
      const correctCount = storedQuizData.results.filter(r => r.isCorrect).length;
      const total = storedQuizData.results.length;
      setScore(correctCount);
      setPercentage(((correctCount / total) * 100).toFixed(2));
    }
    
    // Save quiz results to history
    completeQuiz(storedQuizData);
  }, []);

  // Function to save quiz history
  const completeQuiz = (quizData) => {
    if (!quizData.results) return; // Prevent saving empty quiz data

    const newQuizData = {
      questions: quizData.questions,
      results: quizData.results,
    };

    // Get existing quiz history from localStorage
    const existingHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

    // Add the new quiz data to the history
    existingHistory.unshift(newQuizData); // Unshift to add to the beginning (most recent first)

    // Store the updated history in localStorage
    localStorage.setItem("quizHistory", JSON.stringify(existingHistory));

    // Clear current quiz state
    localStorage.removeItem('quizState');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Final Score: {score} / {questions.length}</h2>
      <h2 className="text-xl mb-4">Percentage: {percentage}%</h2>
      <h2 className="text-xl mb-4">Results:</h2>
      
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index} className="border p-4 rounded">
            <strong>Question {index + 1}: </strong>
            {result.question}
            <br />
            <strong>Your Answer: </strong>
            <span style={{ 
              color: result.isCorrect ? "green" : "red",
              fontWeight: "bold"
            }}>
              {result.userAnswer}
              {result.isCorrect ? " ✓" : " ✗"}
            </span>
            <br />
            {!result.isCorrect && (
              <><strong>Correct Answer: </strong>{result.correctAnswer}<br /></>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <Button variant="primary" onClick={() => navigate("/categories")}>
          Try Another Quiz
        </Button>
        <Button variant="secondary" onClick={() => navigate("/summary")}>
          View Summary
        </Button>
      </div>
    </div>
  );
}

export default Result;
