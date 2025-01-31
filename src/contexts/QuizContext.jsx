// QuizContext.jsx
import { createContext, useState } from 'react';

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [category, setCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setQuestions([]);
    };

    return (
        <QuizContext.Provider value={{
            category,
            setCategory,
            questions,
            setQuestions,
            currentQuestionIndex,
            setCurrentQuestionIndex,
            userAnswers,
            setUserAnswers,
            resetQuiz,
        }}>
            {children}
        </QuizContext.Provider>
    );
}