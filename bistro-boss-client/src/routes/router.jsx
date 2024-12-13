import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main/Main'
import Home from '../Pages/Home/Home'
import OurMenu from '../Pages/OurMenu/OurMenu'
import OurShop from '../Pages/OurShop/OurShop'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Dashboard from '../Layout/Dashboard/Dashboard'
import Cart from '../Pages/Cart/Cart'
import PrivateRouter from '../Pages/Private/PrivateRouter'
import AllUser from '../Pages/AllUser/AllUser'
import AdminRoute from '../Pages/Private/AdminRoute'
import AllItems from '../Pages/AllItems/AllItems'
import AddItem from '../Pages/AddItem/AddItem'
import UpdateItem from '../Pages/UpdateItem/UpdateItem'


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
        element: <PrivateRouter><Dashboard/></PrivateRouter>,
        children: [
            {
                path: '/dashboard/carts',
                element: <Cart/>
            },
            {
                path: '/dashboard/admin/users',
                element: <AdminRoute><AllUser/></AdminRoute>
            },
            {
                path: '/dashboard/admin/allItems',
                element: <AdminRoute><AllItems/></AdminRoute>
            },
            {
                path: '/dashboard/admin/addItem',
                element: <AdminRoute><AddItem/></AdminRoute>
            },
            {
                path: '/dashboard/admin/updateItem/:id',
                element: <AdminRoute><UpdateItem/></AdminRoute>,
                loader: ({params})=> fetch(`http://localhost:5000/menu/${params?.id}`)
            }
        ]
    }
])