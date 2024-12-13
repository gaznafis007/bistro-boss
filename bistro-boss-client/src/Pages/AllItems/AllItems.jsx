import { useQuery } from "@tanstack/react-query";
import DashboardDisplay from "../../Components/DashboardDisplay/DashboardDisplay";
import useAxiosPublic from "../../hooks/usePublicAxios";
import Loading from "../../Components/Loading/Loading";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(false)
  const { data: items = [],refetch, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      return res.data;
    },
  });
  const handleDelete = (item) => {
    setLoading(true);
    axiosSecure.delete(`/menu/${item?._id}`)
    .then(res => {
        if(res.data.deletedCount > 0){
            setLoading(false)
            refetch();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Item Deleted Successfully!",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-slate-100 w-full p-8">
      <DashboardDisplay
        subHeading={"Hurry up"}
        heading={"manage all items"}
        bgColor={"bg-white"}
        itemOne={`total item: ${items?.length}`}
      >
        <div className="overflow-x-auto mt-4">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] text-white rounded-t-md">
              <tr>
                <th></th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {items.map((item, idx) => (
                <tr key={item?._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item?.image} alt="item-image" />
                      </div>
                    </div>
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td>
                    <Link to={`/dashboard/admin/updateItem/${item?._id}`}>
                    <FaEdit size={32}  className="bg-[#D1A054] p-2 rounded-sm cursor-pointer text-center text-white text-lg" />
                    </Link>
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

export default AllItems;
