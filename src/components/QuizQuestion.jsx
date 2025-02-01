import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from '../contexts/QuizContext';
const QuizQuestion = () => {
    const { questions } = useContext(QuizContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            const { currentIndex: savedIndex, userAnswers: savedAnswers } = JSON.parse(savedState);
            setCurrentIndex(savedIndex);
            setUserAnswers(savedAnswers);
            setSelectedAnswer(savedAnswers[savedIndex] || "");
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && questions.length > 0) {
            localStorage.setItem('quizState', JSON.stringify({
                currentIndex,
                userAnswers,
            }));
        }
    }, [currentIndex, userAnswers, questions, loading]);

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);
        setShowError(false);
        const newAnswers = [...userAnswers];
        newAnswers[currentIndex] = option;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (!selectedAnswer) {
            setShowError(true);
            return;
        }
        
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(userAnswers[currentIndex + 1] || "");
            setShowError(false);
        } else {
            completeQuiz();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedAnswer(userAnswers[currentIndex - 1] || "");
            setShowError(false);
        }
    };

    const completeQuiz = () => {
        setCompleted(true);
        localStorage.setItem("lastQuizData", JSON.stringify({
            questions: questions,
            results: questions.map((q, index) => ({
                question: q.question,
                userAnswer: userAnswers[index],
                correctAnswer: q.correctAnswer,
                isCorrect: userAnswers[index] === q.correctAnswer
            }))
        }));
        localStorage.removeItem('quizState');
        navigate("/results");
    };

    if (loading) return <div>Loading questions...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!questions || questions.length === 0) return <div>No questions available</div>;

    const progress = ((currentIndex + 1) / questions.length) * 100;
    const currentQuestion = questions[currentIndex];

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progress}%` }} 
                    />
                </div>
                <div className="text-center mt-2 text-gray-600">
                    Question {currentIndex + 1} of {questions.length}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
                {showError && (
                    <div className="text">
                        Please answer the question before proceeding!
                    </div>
                )}
                <ul className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <li key={index}>
                            <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => handleAnswerSelection(option)}
                                    className="mr-3"
                                />
                                <span>{option}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default QuizQuestion;