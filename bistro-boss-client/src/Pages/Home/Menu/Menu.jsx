import Button from "../../../Components/Button/Button";
import MenuLayout from "../../../Components/MenuLayout/MenuLayout";
import SectionTitle from "../../../Components/SectionHeading/SectionTitle";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../Components/Loading/Loading";

const Menu = () => {
    
    const [menuData, loading] = useFetch('http://localhost:5000/menu')
    const popularItems = menuData?.filter(item => item.category === 'popular');
    console.log(popularItems);
  return (
    <section className="max-w-[1320px] mx-auto my-4">
      <SectionTitle subHeading={"Check it out"} heading={"from our menu"} />
    {
        loading ? <Loading/> : ( popularItems && <MenuLayout items={popularItems}/>)
    }
      <div className="flex flex-col items-center mt-8">
        <Button btnName={"view full menu"} />
      </div>
    </section>
  );
};

export default Menu;
