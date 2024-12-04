import { useQuery } from "@tanstack/react-query";
import DashboardDisplay from "../../Components/DashboardDisplay/DashboardDisplay";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaUsers } from "react-icons/fa";

const AllUser = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(false);
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleAdmin = item =>{
    axiosSecure.patch(`/users`, item)
    .then(res=>{
        if(res.data.modifiedCount > 0){
            Swal.fire('Updated Successfully!');
            refetch()
        }
    })
  }
  const handleDelete = (item) => {
    setLoading(true)
    axiosSecure.delete(`/users/${item?._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        setLoading(false)
        Swal.fire("Deleted Successfully!");
        refetch();
      }
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-slate-100 w-full p-8">
      <DashboardDisplay
        subHeading={"Hurry up"}
        heading={"manage all user"}
        bgColor={"bg-white"}
        itemOne={`total user: ${users?.length}`}
      >
        <div className="overflow-x-auto mt-4">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-white rounded-t-md">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {users.map((item, idx) => (
              <tr key={item?._id}>
                <th>{idx + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>
                  {item?.role === "admin" ? (
                    "admin"
                  ) : (
                    <button onClick={() =>handleAdmin(item)} className="bg-[#D1A054] p-2 text-white">
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td className="">
                  {loading ? (
                    "loading"
                  ) : (
                    <FaTrash
                      className="text-red-600 text-center cursor-pointer"
                      onClick={() => handleDelete(item)}
                      size={18}
                    />
                  )}
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

export default AllUser;
