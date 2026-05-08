import { createBrowserRouter } from 'react-router-dom'
import Admin from '../pages/admin'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import ProtectedRoute from '../ProtectedRoute'
import { Children } from 'react'
import User from '../pages/user'

export const Router = createBrowserRouter([
    //ADMIN
    {
        element: <ProtectedRoute allowedRoles={[1]} />,
        children: [
            {
                path:'/admin',
                element:<Admin />
            },
        ]
    },
    //USER
    {
        element: <ProtectedRoute allowedRoles={[2]} />,
        children: [
            {
                path:'/user',
                element:<User />
            },
        ]
    },
    
    // public routes
    {
        path:'/',
        element:<Home />
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    }
])