// src/contexts/QuizContext.js
import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestions([]);
    setCategory(null);
  };

  return (
    <QuizContext.Provider value={{
      category,
      setCategory,
      questions,
      setQuestions,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      score,
      setScore,
      resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};