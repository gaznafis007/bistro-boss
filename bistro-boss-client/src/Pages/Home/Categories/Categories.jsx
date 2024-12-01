import SectionTitle from "../../../Components/SectionHeading/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import slideOne from '../../../assets/home/slide1.jpg'
import slideTwo from '../../../assets/home/slide2.jpg'
import slideThree from '../../../assets/home/slide3.jpg'
import ImageSectionContent from "../../../Components/ImageSectionContent/ImageSectionContent";
import img from '../../../assets/home/chef-service.jpg'

const Categories = () => {
    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.'
  return (
    <section className="max-w-[1320px] mx-auto">
      <SectionTitle
        subHeading={"From 11:00 am to 10:00 pm"}
        heading={"order online"}
      />
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper my-8"
      >
        <SwiperSlide>
            <div className="flex flex-col items-center">
            <img src={slideOne} alt="categoryImage" />
            <h2 className="-mt-16 uppercase text-white text-2xl">salads</h2>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="flex flex-col items-center">
            <img src={slideTwo} alt="categoryImage" />
            <h2 className="-mt-16 uppercase text-white text-2xl">pizzas</h2>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="flex flex-col items-center">
            <img src={slideThree} alt="categoryImage" />
            <h2 className="-mt-16 uppercase text-white text-2xl">soups</h2>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="flex flex-col items-center">
            <img src={slideOne} alt="categoryImage" />
            <h2 className="-mt-16 uppercase text-white text-2xl">salads</h2>
            </div>
        </SwiperSlide>
      </Swiper>
      <div className="my-16">
      <ImageSectionContent bgImg={img} heading={'bistro boss'} description={description} />
      </div>
    </section>
  );
};

export default Categories;
