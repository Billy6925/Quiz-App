import { useState } from 'react';

export default function CategorySelector() { 
    const [categories, setCategories] = useState([]);

    
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
  