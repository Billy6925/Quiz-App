import { Button } from 'bootstrap';
import React, {useState, useEffect} from 'react';

function Result() {
    const [score, setScore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/questions")
        .then(response => response.json())
        .then(data => {
            setScore(data.score)
            setCorrectAnswer(data.correctAnswer)
        })
        .catch(error => console.error('Error fectching score:', error))
    },[])

    return(
        <>
        <h2>Final score: {score}</h2>
        <h2>Correct Answers</h2>
        <ul>
        {correctAnswer.map((answer, index => {
<li key ={index}>
    Question {index +1}: {answer}
</li>
        }))}
        </ul>
        <Button onClick={RestartQuiz}>Restart Quiz</Button>
        </>
    )
}
export default Result;