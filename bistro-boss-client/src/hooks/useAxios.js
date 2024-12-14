import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import useAuth from './useAuth';
const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-roan-delta.vercel.app'
})
const useAxios = () => {
    const {logout} = useAuth();
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('accessToken')
        config.headers.authorization = `Bearer ${token}`;
        return config
    },function (error){
        return Promise.reject(error)
    })
    axiosSecure.interceptors.response.use(function(response){
        return response
    }, async (error) =>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logout();
            navigate('/');
        }
    })

    return axiosSecure;
};

export default useAxios;