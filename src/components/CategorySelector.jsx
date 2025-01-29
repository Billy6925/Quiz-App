import { useState } from 'react';

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
          <button>Category 1</button>
          <button>Category 2</button>
          <button>Category 3</button>
        </div>
      </div>
    );
  }
  