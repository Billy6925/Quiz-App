import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';

export default function CategorySelector() {
    const [categories, setCategories] = useState([]);
    const { setCategory, setQuestions, resetQuiz } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleCategorySelect = async (categoryId) => {
        try {
            resetQuiz();
            const response = await fetch(`http://localhost:3000/questions?categoryId=${categoryId}`);
            const data = await response.json();
            setQuestions(data);
            setCategory(categoryId);
            navigate('/quiz');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Select a Category</h2>
            <div>
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => handleCategorySelect(cat.id)}>
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}