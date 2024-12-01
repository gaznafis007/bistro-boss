import { NavLink, useLoaderData } from "react-router-dom";
import ImageSectionContent from "../../Components/ImageSectionContent/ImageSectionContent";
import img from "../../assets/shop/banner2.jpg";
import Card from "../../Components/Card/Card";

const OurShop = () => {
    const categories = [
        'salad', 'pizza', 'soup', 'dessert', 'drinks'
    ]
    const menuData = useLoaderData();
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
                menuData.map(menu => <Card key={menu?._id} img={menu?.image} title={menu?.name} description={menu?.recipe} btn={'add to cart'} />)
            }
        </div>
      </section>
    </>
  );
};

export default OurShop;
