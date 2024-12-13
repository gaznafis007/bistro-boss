import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
    const {user} = useAuth();
    const axiosSecure = useAxios();
    const {data:isAdmin, isPending:isAdminLoading} = useQuery({
        queryKey: ['admin', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/admin?email=${user?.email}`) 
            return res.data?.isAdmin
        }
    })

    return [isAdmin, isAdminLoading];
};

export default useAdmin;