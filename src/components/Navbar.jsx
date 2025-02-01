import { Link } from 'react-router-dom';

export default function Navbar() {
    return(
        <nav>
          <ul>
          
           <li><Link to="/">Categories</Link></li>
          
           <li><Link to="/results">Results</Link></li>
           <li><Link to="/summary">Summary</Link></li>  
        
          </ul>
        </nav>
      );
  }
  