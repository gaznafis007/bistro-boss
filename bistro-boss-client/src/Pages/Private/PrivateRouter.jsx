/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../hooks/useAuth";

const PrivateRouter = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <Loading/>
    }
    if(user?.uid){
        return children
    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>
};

export default PrivateRouter;