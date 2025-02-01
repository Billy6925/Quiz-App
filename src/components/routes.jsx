import ErrorPage from "./ErrorPage";
import QuizSummary from "./QuizSummary";
import QuizQuestion from "./QuizQuestion";
import Results from "./Results";
import CategorySelector from "./CategorySelector";

const routes = [
  {
    path: "/quizquestion",
    element: <QuizQuestion />,
    errorElement: <ErrorPage />
  },
  {
    path: "/quizsummary",
    element: <QuizSummary />,
    errorElement: <ErrorPage />
  },
  {
    path: "/results",
    element: <Results />,
    errorElement: <ErrorPage />
  },
  {
    path: "/categories",
    element: <CategorySelector />,
    errorElement: <ErrorPage />
  }
];

export default routes;