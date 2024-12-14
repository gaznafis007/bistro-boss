import SectionTitle from "../../../Components/SectionHeading/SectionTitle";
import Card from "../../../Components/Card/Card";
import img from "../../../assets/home/slide1.jpg";

const ChefsRecommendation = () => {
  // const {user} = useAuth();
  // const axiosSecure = useAxios();
  // const [refetch] = useCart();
  // const [cartLoading, setCartLoading] = useState(false);
  // const navigate = useNavigate()
  // const handleSaveCart = (item) =>{
  //       setCartLoading(true)
  //       if(user?.uid){
  //         const cart = {
  //           email: user?.email,
  //           menuId: item?._id,
  //           name: item?.name,
  //           img: item?.image,
  //           price: item?.price,
  //           category: item?.category
  //         }
  //         console.log(cart);
  //         axiosSecure.post('/carts', cart)
  //         .then(res =>{
  //           if(res.data.acknowledged){
  //             Swal.fire("Item added to cart");
  //             setCartLoading(false)
  //             refetch()
  //           }
  //           else{
  //             Swal.fire({
  //               icon: "error",
  //               title: "Oops...",
  //               text: "Something went wrong!",
  //             });
  //             setCartLoading(false)
  //           }
  //         })
          
  //       }
  //       else{
  //         Swal.fire({
  //           title: "Please login for add to cart",
  //           // showDenyButton: true,
  //           showCancelButton: true,
  //           confirmButtonText: "Login",
  //         }).then((result) => {
  //           /* Read more about isConfirmed, isDenied below */
  //           if (result.isConfirmed) {
  //             navigate('/login')
  //           } else if (result.isDenied) {
  //             ''
  //           }
  //         });
  //       }
  //     }
  return (
    <section className="max-w-[1320px] mx-auto my-12">
      <SectionTitle subHeading={"Should try"} heading={"CHEF RECOMMENDS"} />
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Card
          img={img}
          title={"Caeser Salad"}
          description={
            "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          }
          btn={"add to cart"}
        />
        <Card
          img={img}
          title={"Caeser Salad"}
          description={
            "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          }
          btn={"add to cart"}
        />
        <Card
          img={img}
          title={"Caeser Salad"}
          description={
            "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          }
          btn={"add to cart"}
        />
      </div>
    </section>
  );
};

export default ChefsRecommendation;
