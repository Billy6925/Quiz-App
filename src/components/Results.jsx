import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function Result({ restartQuiz }) {
    const [score, setScore] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState([]); // Initialize as empty array

    useEffect(() => {
        fetch("http://localhost:3000/questions")
        .then(response => response.json())
        .then(data => {
            setScore(data.score || 0);
            setCorrectAnswer(data.correctAnswer || []); // Provide fallback empty array
        })
        .catch(error => console.error('Error fetching score:', error));
    }, []);

    return (
        <>
            <h2>Final score: {score}</h2>
            <h2>Correct Answers</h2>
            <ul>
                {correctAnswer.map((answer, index) => (
                    <li key={index}>
                        Question {index + 1}: {answer}
                    </li>
                ))}
            </ul>
            <Button onClick={restartQuiz}>Restart Quiz</Button>
        </>
    );
}

export default Result;