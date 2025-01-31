import {React} from "react";
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from "./components/routes.jsx"
import './index.css';


// Define your routes
const router = createBrowserRouter(routes);

const root =ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />);