import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import ImageSectionContent from "../../Components/ImageSectionContent/ImageSectionContent";
import img from "../../assets/shop/banner2.jpg";
import Card from "../../Components/Card/Card";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import useCart from "../../hooks/useCart";


const OurShop = () => {
    const categories = [
        'salad', 'pizza', 'soup', 'dessert', 'drinks'
    ]
    const [,refetch,] = useCart()
    const [cartLoading, setCartLoading] = useState(false);
    const menuData = useLoaderData();
    const {user} = useAuth();
    const axiosSecure = useAxios()
    const navigate = useNavigate()
    const handleSaveCart = (item) =>{
      setCartLoading(true)
      if(user?.uid){
        const cart = {
          email: user?.email,
          menuId: item?._id,
          name: item?.name,
          img: item?.image,
          price: item?.price,
          category: item?.category
        }
        console.log(cart);
        axiosSecure.post('/carts', cart)
        .then(res =>{
          if(res.data.acknowledged){
            Swal.fire("Item added to cart");
            setCartLoading(false)
            refetch()
          }
          else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            setCartLoading(false)
          }
        })
        
      }
      else{
        Swal.fire({
          title: "Please login for add to cart",
          // showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Login",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate('/login')
          } else if (result.isDenied) {
            ''
          }
        });
      }
    }
  return (
    <>
      <ImageSectionContent
        bgImg={img}
        heading={"our shop"}
        description={"would you like to try a dish?"}
        bgColor={"bg-black bg-opacity-35"}
        textColor={"text-white"}
      />
      <section className="max-w-[1320px] mx-auto mb-12">
        <div className="flex flex-row space-x-6 justify-center mt-16 mb-8">
            {
                categories.map(category => (
                    <NavLink key={category} to={`/shop/${category}`} className={({isActive}) => isActive ? 'text-yellow-500 pb-2 border-b-2 border-b-yellow-500 uppercase' : 'text-slate-600 uppercase'}>{category}</NavLink>
                ))
            }
        </div>
        <div className="grid md:grid-cols-3 gap-4 justify-center">
            {
                menuData.map(menu => <Card key={menu?._id} action={handleSaveCart} actionParam={menu} img={menu?.image} title={menu?.name} description={menu?.recipe} btn={cartLoading ? 'Loading' : 'add to cart'} />)
            }
        </div>
      </section>
    </>
  );
};

export default OurShop;
