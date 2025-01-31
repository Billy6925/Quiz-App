import { useRouteError } from "react-router-dom";
import Navbar from "./Navbar";

function ErrorPage() {
const error = useRouteError();
console.error(error)

return(
    <>
    <header>
        <NavBar/>
    </header>
    <main>
        <h2>Error</h2>
<p>Oops! Something went wrong.</p>
    </main>
    </>
)
}
export default ErrorPage;