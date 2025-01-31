import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";

function QuizSummary() {
    const [category, setCategory] = useState([]);
    const [quizHistory, setQuizHistory] = useState([]); 

    useEffect(() => {
        fetch("http://localhost:3000/questions")
            .then(response => response.json())
            .then(data => {
                console.log('Fetched quiz history:', data); // Log the data to inspect its structure
                setQuizHistory(data || []); // Ensure it's an array
            })
            .catch(error => console.error('Error fetching quiz history:', error));

        fetch("http://localhost:3000/categories")
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    return (
        <>
            <header>
                <Navbar />
            </header>
            <div>
                <h2>Quiz Summary</h2>
                {quizHistory.map((quiz, index) => (
                    <main key={index}>
                        <h3>Quiz {quizHistory.length - index}</h3>
                        <p>Categories: {(quiz.categories || []).join(', ')}</p>
                        <p>Questions Completed {quiz.questionsCompleted || 0}</p>
                        <p>Correct Answers: {quiz.correctAnswers || 0}</p>
                        <ul>
                            {(quiz.answers || []).map((answer, index) => (
                                <li key={index}>
                                    question{index + 1}: {answer.userAnswer || 'N/A'} - Correct: {answer.correctAnswer || 'N/A'}
                                </li>
                            ))}
                        </ul>
                    </main>
                ))}
            </div>
        </>
    );
}

export default QuizSummary;