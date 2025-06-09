import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./pages/Categories";


export const router = createBrowserRouter([
    {
        path: '/signin', 
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        element: <PrivateRoute redirectTo='/signin'/>,
        children: [
            {
                path: '/',
                element: <Layout />,
                children: [
                    {
                      index: true,
                      element: <Home />  
                    },
                    {
                        path: '/categories',
                        element: <Categories />
                    }
                ]
            }
        ]
    }
]);
