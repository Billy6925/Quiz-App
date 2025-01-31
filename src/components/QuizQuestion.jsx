import React from "react";
import { useState, useEffect } from "react";


//define QuickQuestion
const QuizQuestion=()=>{
    //state management
const [questions, setQuestions]=useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [loading, setLoading] = useState(true);
const [completed, setCompleted] = useState(false);


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
        })
      );
    }
  }, [completed]);
// Calculate progesss
const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

// Handlers
const handleNext = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1);
  } else {
    setCompleted(true);
    alert("Quiz Completed! Data saved to localStorage.");
  }
};

const handlePrevious = () => {
  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);
  }
};

  // Loading State
  if (loading) {
    return <div>Loading questions...</div>;
  }

  // Error State
  if (error) {
    return <div>Error: {error}</div>;
  }
return(
    <div>
{/*progress indicator*/}
    <div>
    Question {currentIndex + 1} of {questions.length}
  </div>

{/*Quiz content */}
  {!completed ? (
    <div>
      <h2>{questions[currentIndex].question}</h2>
      <ul>
        {questions[currentIndex].options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div>
      <h2>Congratulations!</h2>
      <p>You have completed the quiz successfully.</p>
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