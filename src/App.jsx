import Navbar from "./components/Navbar";
import CategorySelector from "./components/CategorySelector";
import QuizQuestions from "./components/QuizQuestion";
import QuizSummary from "./components/QuizSummary";
import Results from "./components/Results";
import {useState,useEffect} from "react";


function App(){
  const [category, setCategory] = useState([]);
  const [question, setQuestion] = useState([]);
  const [selectedCategory,setSelectedCategory]=usestate(null);
  const [userAnswers, setUserAnswers]=useState([];
    const [score, setScore]=useState(0);
  )
}
// categories from json
useEffect(()=>{
  fetch("http://localhost:3001/categories")
  .then((res)=>res.json())
  .then((data)=>setCategory(data))
  .catch((error)=>console.error("Error fetching categories", error));
},[]);

//fetch questions based on category selectut
useEffect(()=>{
  if(selectedCategory){
    fetch(`http://localhost:3001/questions?category=${selectedCategory}`)
    .then((res)=>res.json())
    .then((data)=>setQuestion(data))
    .catch((error)=>console.error("Error fetching questions", error));
}
},[selectedCategory]);


return (
  <Router>
    <Navbar />
    <Routes>
      <Router
      path="/categories"
      element={<CategorySelector categories={category} setSelectedCategory={setSelectedCategory} />}
      />
      <Route
      path="/qiuz"
      element={<QuizQuestions questions={question} setUserAnswers={setUserAnswers} />}
      />
      <Route path="/summary" element={<QuizSummary userAnswers={userAnswers} setScore={setScore} />} />
      <Route path="/results" element={<Results score={score} />} />
    </Routes>
  </Router>

);
export default App;