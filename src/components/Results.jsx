import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function Result({ userAnswers, restartQuiz }) {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [results, setResults] = useState([]);

    // Fetch questions from API to compare answers
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:3000/questions");
                const data = await response.json();
                setQuestions(data);
                calculateScore(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [correctAnswer]);

    // Calculate the score and compare user answers with correct answers
    const calculateScore = (questions) => {
        let correctCount = 0;
        const resultsArray = userAnswers.map((userAnswer, index) => {
            const correctAnswer = questions[index]?.correctAnswer;
            const isCorrect = userAnswer === correctAnswer;
            if (isCorrect) correctCount++;

            return {
                question: questions[index]?.question,
                userAnswer,
                correctAnswer,
                isCorrect,
            };
        });

        // Calculate percentage score
        const calculatedScore = (correctCount / questions.length) * 100;
        setScore(calculatedScore);
        setResults(resultsArray);
    };

    return (
        <>
            <h2>Final Score: {score.toFixed(2)}%</h2>
            <h2>Results:</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <strong>Question {index + 1}: </strong>
                        {result.question}
                        <br />
                        <strong>Your Answer: </strong>{result.userAnswer}
                        <br />
                        <strong>Correct Answer: </strong>{result.correctAnswer}
                        <br />
                        <span style={{ color: result.isCorrect ? "green" : "red" }}>
                            {result.isCorrect ? "(Correct)" : "(Incorrect)"}
                        </span>
                    </li>
                ))}
            </ul>
            <Button onClick={restartQuiz}>Restart Quiz</Button>
        </>
    );
}

export default Result;
