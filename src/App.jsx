import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import CategorySelector from "./components/CategorySelector";
import QuizQuestions from "./components/QuizQuestion";
import QuizSummary from "./components/QuizSummary";
import Results from "./components/Results";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    const [category, setCategory] = useState([]);
    const [question, setQuestion] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);

    // Fetch categories from JSON
    useEffect(() => {
        fetch("http://localhost:3001/categories")
            .then((res) => res.json())
            .then((data) => setCategory(data))
            .catch((error) => console.error("Error fetching categories", error));
    }, []);

    // Fetch questions based on selected category
    useEffect(() => {
        if (selectedCategory) {
            fetch(`http://localhost:3001/questions?category=${selectedCategory}`)
                .then((res) => res.json())
                .then((data) => setQuestion(data))
                .catch((error) => console.error("Error fetching questions", error));
        }
    }, [selectedCategory]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/categories"
                    element={<CategorySelector categories={category} setSelectedCategory={setSelectedCategory} />}
                />
                <Route
                    path="/quiz"
                    element={<QuizQuestions questions={question} setUserAnswers={setUserAnswers} />}
                />
                <Route path="/summary" element={<QuizSummary userAnswers={userAnswers} setScore={setScore} />} />
                <Route path="/results" element={<Results score={score} />} />
            </Routes>
        </Router>
    );
}

export default App;
