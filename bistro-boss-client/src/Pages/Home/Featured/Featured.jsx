import Button from "../../../Components/Button/Button";
import SectionTitle from "../../../Components/SectionHeading/SectionTitle";
import img from '../../../assets/home/featured.jpg';

const Featured = () => {
    return (
        <section style={{ backgroundImage: `url(${img})`}} className="w-full mb-16">
            <div className="bg-black w-full bg-opacity-45 py-10 px-12">
            <SectionTitle subHeading={'Check it out'} heading={'from our menu'} textColor={'text-white'} borderColor={'border-y-white'}/>
            <div className="max-w-[1320px] mx-auto flex flex-row justify-center space-x-6">
                <div className="w-1/4">
                    <img src={img} alt="featured-image" className="w-full rounded-md" />
                </div>
                <div className="flex flex-col w-1/3">
                    <h2 className="text-lg text-white">
                    March 20, 2023
                    <br />
                    WHERE CAN I GET SOME?
                    </h2>
                    <p className="mt-2 text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <div className="flex flex-col md:w-48 justify-start mt-2">
                    <Button color={'bg-transparent border-b-black'} textColor={'text-white hover:text-yellow-500'} btnName={'read more'}/>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Featured;