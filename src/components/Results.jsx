import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Result({ restartQuiz }) {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [results, setResults] = useState([]);

    const navigate = useNavigate(); // Navigation function

    // Fetch questions and user answers from localStorage
    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
        setUserAnswers(storedAnswers);

        const storedQuizData = JSON.parse(localStorage.getItem("lastQuizData"));
        if (storedQuizData) {
            setResults(storedQuizData.results || []);
        }

        fetch("http://localhost:3000/questions")
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
                calculateScore(data, storedAnswers);
            })
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    // Calculate score and percentage
    const calculateScore = (questions, userAnswers) => {
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

        const totalQuestions = questions.length;
        const calculatedPercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

        setScore(correctCount);
        setPercentage(calculatedPercentage.toFixed(2));
        setResults(resultsArray);
    };

    return (
        <>
            <h2>Final Score: {score} / {questions.length}</h2>
            <h2>Percentage: {percentage}%</h2>
            <h2>Results:</h2>
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

            {/* Buttons for navigation */}
            <Button variant="primary" onClick={() => navigate("/categories")}>
                Try Another Quiz
            </Button>
            <Button variant="secondary" onClick={() => navigate("/quiz-history")}>
                View Summary
            </Button>
            
           
        </>
    );
}

export default Result;
