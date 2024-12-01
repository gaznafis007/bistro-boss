import Loading from '../../../Components/Loading/Loading';
import SectionTitle from '../../../Components/SectionHeading/SectionTitle';
import useFetch from '../../../hooks/useFetch';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [testimonials, loading] = useFetch('http://localhost:5000/review')
    return (
        <section className='max-w-[1320px] mx-auto'>
            <SectionTitle subHeading={'What Our CLient Say'} heading={'testimonials'}/>
            {
                loading ? <Loading></Loading> : (
                    testimonials && (
                        <Swiper navigation={true} modules={[Navigation]} className="mySwiper mb-12">
                            {
                                testimonials.map(item => (
                                    <SwiperSlide key={item?._id}>
                                        <div className="flex flex-col items-center p-8">
                                        <Rating className='max-w-40 my-12' value={item?.rating} readOnly/>
                                        <FaQuoteLeft size={42}/>
                                        <p className="my-8 text-center">{item?.details}</p>
                                        <h2 className="text-2xl text-center text-yellow-600">{item?.name}</h2>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )
                )
            }
        </section>
    );
};

export default Testimonials;