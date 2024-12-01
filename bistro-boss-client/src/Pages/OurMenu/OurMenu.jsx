import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ImageSectionContent from "../../Components/ImageSectionContent/ImageSectionContent";
import Loading from "../../Components/Loading/Loading";
import MenuLayout from "../../Components/MenuLayout/MenuLayout";
import SectionTitle from "../../Components/SectionHeading/SectionTitle";
import img from '../../assets/menu/banner3.jpg';
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';
import useFetch from "../../hooks/useFetch";


const OurMenu = () => {
    const [menus, loading] = useFetch('http://localhost:5000/menu');
    const offered = menus?.filter(menu => menu?.category === 'offered');
    const desserts = menus?.filter(menu => menu?.category === 'dessert');
    const pizzas = menus?.filter(menu => menu?.category === 'pizza');
    const salads = menus?.filter(menu => menu?.category === 'salad');
    const soups = menus?.filter(menu => menu?.category === 'soup');
    const navigate = useNavigate()
    const orderAction = (category) =>{
        navigate(`/shop/${category}`)
    }
    return (
        <>
            <ImageSectionContent bgImg={img} heading={'our menu'} textColor={'text-white'} bgColor={'bg-black bg-opacity-35'} description={"would you like to try a dish ?"}/>
            <SectionTitle subHeading={"Don't miss"} heading={'todays offer'}/>
            <section className="max-w-[1320px] mx-auto my-12">
                {
                    loading ? <Loading/> :
                    (
                        offered && <MenuLayout items={offered}/>
                    )
                }
                <div className="flex flex-col items-center my-4">
                    <Button action={orderAction} params={'salad'} btnName={"order your favorite food"} />
                </div>
            </section>
            <ImageSectionContent bgImg={dessertImg} heading={'desserts'} textColor={'text-white'} bgColor={'bg-black bg-opacity-35'} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}/>
            <section className="max-w-[1320px] mx-auto my-12">
                {
                    loading ? <Loading/> :
                    (
                        desserts && <MenuLayout items={desserts}/>
                    )
                }
                <div className="flex flex-col items-center my-4">
                    <Button action={orderAction} params={'dessert'} btnName={"order your favorite dessert"} />
                </div>
            </section>
            <ImageSectionContent bgImg={pizzaImg} heading={'pizzas'} textColor={'text-white'} bgColor={'bg-black bg-opacity-35'} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}/>
            <section className="max-w-[1320px] mx-auto my-12">
                {
                    loading ? <Loading/> :
                    (
                        pizzas && <MenuLayout items={pizzas}/>
                    )
                }
                <div className="flex flex-col items-center my-4">
                    <Button action={orderAction} params={'pizza'} btnName={"order your favorite pizza"} />
                </div>
            </section>
            <ImageSectionContent bgImg={saladImg} heading={'salads'} textColor={'text-white'} bgColor={'bg-black bg-opacity-35'} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}/>
            <section className="max-w-[1320px] mx-auto my-12">
                {
                    loading ? <Loading/> :
                    (
                        salads && <MenuLayout items={salads}/>
                    )
                }
                <div className="flex flex-col items-center my-4">
                    <Button action={orderAction} params={'salad'} btnName={"order your favorite salad"} />
                </div>
            </section>
            <ImageSectionContent bgImg={soupImg} heading={'soups'} textColor={'text-white'} bgColor={'bg-black bg-opacity-35'} description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}/>
            <section className="max-w-[1320px] mx-auto my-12">
                {
                    loading ? <Loading/> :
                    (
                        soups && <MenuLayout items={soups}/>
                    )
                }
                <div className="flex flex-col items-center my-4">
                    <Button action={orderAction} params={'soup'} btnName={"order your favorite soup"} />
                </div>
            </section>
        </>
    );
};

export default OurMenu;