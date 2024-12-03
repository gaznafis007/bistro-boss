import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';


const useCart = () => {
    const axiosSecure = useAxios();
    const {user} = useAuth()
    const {data, refetch, isLoading} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/carts?email=test@mail.com`);
            return res.data
        }
    });
    return [data, refetch, isLoading];
};

export default useCart;