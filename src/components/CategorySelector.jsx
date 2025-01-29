import { useState, useEffect, useContext } from 'react';
import { QuizContext } from '../App';

export default function CategorySelector() { 
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/categories')
          .then(res => res.json())
          .then(data => setCategories(data))
          .catch(error => console.error('Error:', error));
      }, []);

    return (
      <div>
        <h2>Select a Category</h2>
        <div>
        {categories.map(cat => (
        <button key={cat.id}>{cat.name}</button>
      ))}
        </div>
      </div>
    );
  }
  