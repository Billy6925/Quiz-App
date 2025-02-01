import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';

export default function CategorySelector() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setCategory, setQuestions, resetQuiz } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    const handleCategorySelect = async (categoryId) => {
        try {
            resetQuiz();

            
            const response = await fetch(`http://localhost:3000/questions?categoryId=${categoryId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }

            const data = await response.json();

            // Debugging: Log the questions data to make sure it's filtered correctly
            console.log("Fetched questions:", data);

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
            {loading ? (
                <p>Loading categories...</p>
            ) : (
                <div>
                    {categories.length > 0 ? (
                        categories.map((cat, index) => (
                            <button key={index} onClick={() => handleCategorySelect(cat.id)}>
                                {cat.name}
                            </button>
                        ))
                    ) : (
                        <p>No categories available</p>
                    )}
                </div>
            )}
        </div>
    );
}
