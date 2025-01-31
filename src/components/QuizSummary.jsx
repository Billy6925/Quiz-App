import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";

function QuizSummary() {
    const [quizHistory, setQuizHistory] = useState([]);

    useEffect(() => {
        // Fetch quiz history from localStorage
        const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
        setQuizHistory(Array.isArray(storedHistory) ? storedHistory.reverse() : []);
    }, []);

    return (
        <>
            <header>
                
            </header>
            <div>
                <h2>Quiz Summary</h2>
                {quizHistory.length > 0 ? (
                    quizHistory.map((quiz, index) => (
                        <main key={index}>
                            <h3>Quiz {quizHistory.length - index}</h3>
                            <p>Categories: {(quiz.categories && Array.isArray(quiz.categories)) ? quiz.categories.join(', ') : "No categories available"}</p>
                            <p>Questions Completed: {quiz.questionsCompleted || (quiz.answers ? quiz.answers.length : 0)}</p>
                            <p>Correct Answers: {quiz.correctAnswers || (quiz.answers ? quiz.answers.filter(a => a.isCorrect).length : 0)}</p>
                            <ul>
                                {(quiz.answers && Array.isArray(quiz.answers)) ? quiz.answers.map((answer, idx) => (
                                    <li key={idx}>
                                        Question {idx + 1}: {answer.userAnswer || 'N/A'} - Correct: {answer.correctAnswer || 'N/A'}
                                    </li>
                                )) : <li>No answers recorded.</li>}
                            </ul>
                        </main>
                    ))
                ) : (
                    <p>No quiz history available. Take a quiz to see your results here!</p>
                )}
            </div>
        </>
    );
}

export default QuizSummary;
