import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';

export default function CategorySelector() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCategory, setQuestions, resetQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
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
      setQuestions(data);
      setCategory(categoryId);
      navigate('/quiz');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Select a Category</h2>
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <button
                key={cat.id || index}
                onClick={() => handleCategorySelect(cat.id)}
                className="p-4 bg-white border-2 border-blue-500 rounded-lg hover:bg-blue-50 
                         transition-colors duration-200 text-lg font-medium"
              >
                {cat.name}
              </button>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No categories available</p>
          )}
        </div>
      )}
    </div>
  );
}