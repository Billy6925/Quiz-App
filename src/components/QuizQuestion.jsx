import React, { useEffect, useState } from "react";

const QuizQuestion = () => {
  // State management
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Track selected answer
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]); // Store results to show at the end

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
      localStorage.setItem(
        "quizData",
        JSON.stringify({
          questions,
          currentIndex,
          completed,
          results,
        })
      );
    }
  }, [completed, results]);

  // Handlers
  const handleNext = () => {
    if (selectedAnswer) {
      // Store the result for this question
      const currentQuestion = questions[currentIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setResults((prevResults) => [
        ...prevResults,
        {
          question: currentQuestion.question,
          selectedAnswer,
          isCorrect,
          correctAnswer: currentQuestion.correctAnswer,
        },
      ]);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(""); // Reset selected answer for the next question
    } else {
      setCompleted(true);
      alert("Quiz Completed! Data saved to localStorage.");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(""); // Reset selected answer when going back
    }
  };

  const handleAnswerChange = (option) => {
    setSelectedAnswer(option);
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
          <h2>Congratulations!</h2>
          <p>You have completed the quiz successfully.</p>
          <div>
            <h3>Results:</h3>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <strong>Question: </strong>{result.question}
                  <br />
                  <strong>Your Answer: </strong>{result.selectedAnswer} 
                  <br />
                  <strong>Correct Answer: </strong>{result.correctAnswer} 
                  <span style={{ color: result.isCorrect ? "green" : "red" }}>
                    {result.isCorrect ? "(Correct)" : "(Incorrect)"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
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
