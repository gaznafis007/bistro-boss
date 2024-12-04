import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';


const useCart = () => {
    const axiosSecure = useAxios();
    const {user} = useAuth()
    const {data=[], refetch, isLoading, isPending} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data
        }
    });
    return [data, refetch, isLoading, isPending];
};

export default useCart;