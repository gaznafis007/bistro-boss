import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main/Main'
import Home from '../Pages/Home/Home'
import OurMenu from '../Pages/OurMenu/OurMenu'
import OurShop from '../Pages/OurShop/OurShop'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Dashboard from '../Layout/Dashboard/Dashboard'
import Cart from '../Pages/Cart/Cart'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path: '/menu',
                element: <OurMenu/>
            },
            {
                path: '/shop/:category',
                element: <OurShop/>,
                loader: ({params}) => fetch(`http://localhost:5000/menu/${params.category}`)
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard/>,
        children: [
            {
                path: '/dashboard/carts',
                element: <Cart/>
            }
        ]
    }
])