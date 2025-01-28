import React from "react";
import { useState } from "react";


//define QuickQuestion
const QuizQuestion=()=>{
    //state management
const [questions, setQuestions]=useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [completed, setCompleted] = useState(false);
}

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
return(
    <div>
    <div>
    Question {currentIndex + 1} of {questions.length}
  </div>

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
      <p>You've completed the quiz.</p>
    </div>
    
  )}
  </div>
);




  export default QuizQuestion;