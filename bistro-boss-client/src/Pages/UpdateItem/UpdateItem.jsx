import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const UpdateItem = () => {
  const categories = ["salad", "soup", "pizza", "dessert", "drinks"];
  const { _id, name, category, price, recipe } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleUpdate = (data) => {
    setLoading(true)
    const img = data.image[0]
    const formData = new FormData();
    formData.append('image', img);
    axios.post( `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_API_KEY
    }`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res=>{
      const image = res.data.data.display_url;
      const menuItem = {
        name: data?.name,
        image,
        category: data?.category,
        recipe: data?.recipe,
        price: data?.price
      }
      axiosSecure.patch(`/menu/${_id}`, menuItem)
      .then(res =>{
        if(res.data?.modifiedCount > 0){
          setLoading(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item added successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/admin/allItems");
        }
      })
    })
  };
  return (
    <div className="bg-slate-100 w-full p-8">
      <h2 className="text-3xl text-center uppercase">update an item</h2>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="bg-slate-200 mt-6 p-6 w-full mx-2 md:w-2/3 md:mx-auto "
      >
        <div className="my-2">
          <label className="font-semibold inline-block mb-2 capitalize">
            recipe name*
          </label>
          <input
            {...register("name", { required: "Recipe Name Required" })}
            type="text"
            placeholder="Recipe name"
            defaultValue={name}
            className="input input-bordered w-full"
          />
          {errors?.name && (
            <p className="text-red-500 mt-2">{errors?.name?.message}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between space-x-2">
          <div className="my-2 w-full md:w-1/2">
            <label className="font-semibold inline-block mb-2 capitalize">
              category*
            </label>
            <select
              {...register("category", { required: "Category is Required" })}
              defaultValue={category}
              className="select select-bordered w-full capitalize"
            >
              <option disabled value="dummy">
                Category
              </option>
              {categories.map((category, idx) => (
                <option key={idx} className="capitalize" value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors?.category && (
              <p className="text-red-500 mt-2">{errors?.category?.message}</p>
            )}
          </div>
          <div className="my-2 w-full md:w-1/2">
            <label className="font-semibold inline-block mb-2 capitalize">
              price*
            </label>
            <input
              {...register("price", { required: "Price is Required" })}
              type="text"
              defaultValue={price}
              placeholder="Price"
              className="input input-bordered w-full"
            />
            {errors?.price && (
              <p className="text-red-500 mt-2">{errors?.price?.message}</p>
            )}
          </div>
        </div>
        <div className="my-2">
          <label className="font-semibold inline-block mb-2 capitalize">
            recipe details*
          </label>
          <textarea
            {...register("recipe", { required: "Details Required" })}
            type="text"
            placeholder="Recipe Details"
            defaultValue={recipe}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors?.recipe && (
            <p className="text-red-500 mt-2">{errors?.recipe?.message}</p>
          )}
        </div>
        <div className="my-2">
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-[#E8E8E8] w-full max-w-xs"
          />
          {errors?.image && (
            <p className="text-red-500 mt-2">{errors?.image?.message}</p>
          )}
        </div>
        <div className="my-2">
          <div className="capitalize w-32 bg-[#D1A054] px-3 justify-center items-center py-1 flex flex-row gap-1 text-white">
            {loading ? (
              "loading"
            ) : (
              <>
                <input
                  type="submit"
                  value="Add Item"
                  className="cursor-pointer"
                />
                <ImSpoonKnife />
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
