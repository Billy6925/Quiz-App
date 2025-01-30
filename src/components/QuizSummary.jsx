import React, {useState, useEffect} from "react";

function QuizSummary() {
    const [quizHistory, setQuizHistory] = useState([])

    useEffect(()=> {
        fetch("http://localhost:3000/questions")
        .then(response => response.json())
        .then(data => setQuizHistory(data))
        .catch(error => console.error('Error fetching quiz history:',error))
    },[])

    return(
        <>
<header>
    <NavBar/>
</header>
<main>
    
</main>

        </>
    )
}
export default QuizSummary;