import { FaWallet } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading/Loading";

const UserDashboard = () => {
    const {user} = useAuth();
    const axiosSecure = useAxios();
    const {data:payment, isLoading} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    });
    if(isLoading){
        return <Loading/>
    }
  return (
    <section className="w-full p-8 bg-slate-100">
      <h2 className="text-3xl font-serif">Hi, Welcome Back!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <div className="flex rounded-md flex-row py-12 text-white space-x-2 items-center justify-center bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]">
          <FaWallet size={42} />
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl">205</h2>
            <p>Menu</p>
          </div>
        </div>
        <div className="flex rounded-md flex-row py-12 text-white space-x-2 items-center justify-center bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
          <AiFillShop size={42} />
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl">103</h2>
            <p>Shop</p>
          </div>
        </div>
        <div className="flex rounded-md flex-row py-12 text-white space-x-2 items-center justify-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
          <BiSolidPhoneCall size={42} />
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl">03</h2>
            <p>Contact</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-[#FFEDD5] flex flex-col items-center justify-center py-8 border-r border-[#D1A054]">
        <div className="bg-white rounded-full p-12 border border-[#D1A054]"></div>
            <h2 className="text-xl mt-2">{user?.displayName ? user?.displayName : user?.email}</h2>
        </div>
        <div className="w-full md:w-1/2 bg-[#FEF9C3] flex flex-col p-12">
        <h2 className="text-2xl uppercase font-serif"> your activities</h2>
        <ul className="capitalize mt-4">
            <li className="text-blue-400">orders: 6</li>
            <li className="text-green-400">reviews: 2</li>
            <li className="text-yellow-400">Bookings: 3</li>
            <li className="text-red-400">payments: {payment.length}</li>
        </ul>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
