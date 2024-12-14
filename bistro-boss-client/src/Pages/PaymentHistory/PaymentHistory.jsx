import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import DashboardDisplay from "../../Components/DashboardDisplay/DashboardDisplay";
import Loading from "../../Components/Loading/Loading";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxios()
    const {data:payments=[], isPending} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })
    if(isPending){
        return <Loading/>
    }
    return (
        <div className="w-full p-8 bg-slate-100">
            <DashboardDisplay
            subHeading={'At a glance'}
            heading={'payment history'}
            bgColor={"bg-white"}
        itemOne={`total item: ${payments?.length}`}
            >
                <div className="overflow-x-auto mt-4">
                          <table className="table">
                            {/* head */}
                            <thead className="bg-[#D1A054] text-white rounded-t-md">
                              <tr>
                                <th></th>
                                <th>EMAIL</th>
                                <th>CATEGORY</th>
                                <th>TOTAL PRICE</th>
                                <th>STATUS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* row  */}
                              {payments.map((item, idx) => (
                                <tr key={item?._id}>
                                  <th>{idx + 1}</th>
                                  <td>{item?.email}</td>
                                  <td>{item?.category}</td>
                                  <td>
                                    {item?.amount}$
                                  </td>
                                  <td className="">
                                    {item?.status}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
            </DashboardDisplay>
        </div>
    );
};

export default PaymentHistory;