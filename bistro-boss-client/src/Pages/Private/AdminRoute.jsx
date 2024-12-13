/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if(loading || isAdminLoading){
        return <Loading/>
    }
    if(user?.uid && isAdmin){
        return children
    }
    return <Navigate to={'/'} state={{from: location}} />;
};

export default AdminRoute;