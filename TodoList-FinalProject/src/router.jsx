import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Layout from "./pages/Layout";


export const router = createBrowserRouter([
    {
        path: '/signin', 
        element: <SignIn />
    },
    {
        path: 'signup',
        element: <SignUp />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]);
