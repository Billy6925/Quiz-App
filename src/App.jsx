import { QuizProvider } from './contexts/QuizContext';

import Navbar from "./components/Navbar";
import CategorySelector from "./components/CategorySelector";
import QuizQuestions from "./components/QuizQuestion";
import QuizSummary from "./components/QuizSummary";
import Results from "./components/Results";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <QuizProvider>
            <Router>
                <Navbar />
                <Routes>
                <Route path="/" element={<CategorySelector />} />
                    <Route path="/quiz" element={<QuizQuestions />} />
                    <Route path="/summary" element={<QuizSummary />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/" element={<CategorySelector />} />
                </Routes>
            </Router>
        </QuizProvider>
    );
}

export default App;