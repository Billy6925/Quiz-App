import React, {useState, useEffect} from "react";

function QuizSummary() {
    const [quizHistory, setQuizHistory] = useState([])

    useEffect(()=> {
        fetch("http://localhost:3000/questions")
        .then(response => response.json())
        .then(data => setQuizHistory(data))
        .catch(error => console.error('Error fetching quiz history:',error))
    },[])

    return(
        <>
<header>
    <NavBar/>
</header>
<div>
    <h2>Quiz Summary</h2>
    {quizHistory.map((quiz, index) => (
<main key={index}>
<h3>Quiz{quizHistory.length - index}</h3>
<p>Categories:{quiz.categories.join(',')}</p>
<p>Questions Completed{quiz.questionsCompleted}</p>
<p>Correct Answers: {quiz.correctAnswers}</p>
<ul>
    {
        quiz.answers.map((answer, index) => (
    <li key={index}>
question{index +1}: {answer.userAnswer} - Correct:{answer.correctAnswer}
    </li>
))}
</ul>
</main>
))}
</div>

        </>
    )
}
export default QuizSummary;