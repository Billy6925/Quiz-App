import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [category, setCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    const resetQuiz = () => {
        setQuestions([]);
        setUserAnswers([]);
        setCategory(null);
    };

    return (
        <QuizContext.Provider
            value={{
                category,
                setCategory,
                questions,
                setQuestions,
                userAnswers,
                setUserAnswers,
                resetQuiz,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
