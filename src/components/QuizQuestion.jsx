import React, { useEffect, useState } from "react";
import { QuizContext } from "../contexts/QuizContext";

const QuizQuestion = () => {
  // State management
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Track selected answer
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]); // Store results to show at the end
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Save quiz data to localStorage when completed
  useEffect(() => {
    if (completed) {
      localStorage.setItem("quizData", JSON.stringify({ questions, results, completed }));
    }
  }, [completed, results]);

  // Function to handle answer selection and save it to localStorage
  const handleAnswerSelection = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = answer;
    setUserAnswers(updatedAnswers);

    // Save answers in localStorage
    localStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
  };

  // Handle Next Button
  const handleNext = () => {
    if (selectedAnswer) {
      const currentQuestion = questions[currentIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

      setResults((prevResults) => [
        ...prevResults,
        {
          question: currentQuestion.question,
          userAnswer: selectedAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect,
        },
      ]);

      // Save the selected answer
      handleAnswerSelection(selectedAnswer);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(""); // Reset selected answer for the next question
      } else {
        // Calculate final score and percentage
        const correctCount = results.filter((r) => r.isCorrect).length + (isCorrect ? 1 : 0);
        const calculatedPercentage = ((correctCount / questions.length) * 100).toFixed(2);

        setScore(correctCount);
        setPercentage(calculatedPercentage);
        setCompleted(true);
        alert("Quiz Completed! Data saved to localStorage.");
      }
    }
  };

  // Handle Previous Button
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(""); // Reset selected answer when going back
    }
  };

  // Handle Answer Selection
  const handleAnswerChange = (option) => {
    setSelectedAnswer(option);
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    localStorage.removeItem("userAnswers"); // Clear stored answers
    localStorage.removeItem("quizData"); // Clear saved quiz data
    setCurrentIndex(0);
    setSelectedAnswer("");
    setCompleted(false);
    setResults([]);
    setUserAnswers([]);
    setScore(0);
    setPercentage(0);
  };

  // Loading State
  if (loading) {
    return <div>Loading questions...</div>;
  }

  // Error State
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Progress indicator */}
      <div>
        Question {currentIndex + 1} of {questions.length}
      </div>

      {/* Quiz content */}
      {!completed ? (
        <div>
          <h2>{questions[currentIndex].question}</h2>
          <ul>
            {questions[currentIndex].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerChange(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <h3>Final Score: {score} / {questions.length}</h3>
          <h3>Percentage: {percentage}%</h3>

          <h3>Results:</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>Question {index + 1}: </strong>
                {result.question}
                <br />
                <strong>Your Answer: </strong>{result.userAnswer} 
                <span style={{ color: result.isCorrect ? "green" : "red", fontWeight: "bold", marginLeft: "10px" }}>
                  {result.isCorrect ? "(Correct)" : "(Incorrect)"}
                </span>
                <br />
                <strong>Correct Answer: </strong>{result.correctAnswer}
              </li>
            ))}
          </ul>

          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>

        {!completed && (
          <button onClick={handleNext}>
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
