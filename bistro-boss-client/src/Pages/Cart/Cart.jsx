
import SectionTitle from "../../Components/SectionHeading/SectionTitle";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import useCart from "../../hooks/useCart";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useState } from "react";


const Cart = () => {
 
  const [data, refetch, isLoading] = useCart()
  const [loading, setLoading] = useState(false)
  const axiosSecure = useAxios()
  if(isLoading){
    return <Loading/>
  }
  const handleDelete = item =>{
    setLoading(true)
    axiosSecure.delete(`/carts/${item?._id}`)
    .then(res =>{
        if(res.data.deletedCount > 0){
            setLoading(false);
            Swal.fire('item deleted successfully!');
            refetch();
        }
    })
  }
  const price = data.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="bg-slate-100 w-full p-8">
      <SectionTitle subHeading={"My Cart"} heading={"wanna add more?"} />
      <div className="my-6 bg-white md:mx-20 p-6">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold uppercase font-serif">
            total items: {data.length}
          </h2>
          <h2 className="text-2xl font-bold uppercase font-serif">
            total price: ${price}
          </h2>
          <Link
            to="/dashboard/payment"
            className="capitalize text-white bg-[#D1A054] p-2 rounded-md"
          >
            pay
          </Link>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] text-white rounded-t-md">
              <tr>
                <th></th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {data.map((item, idx) => (
                <tr key={item?._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item?.img} alt="item-image" />
                      </div>
                    </div>
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td className="">
                    {
                        loading ? 'loading' : <FaTrash className="text-red-600 text-center cursor-pointer"  onClick={() => handleDelete(item)} size={18} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
