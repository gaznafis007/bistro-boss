import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImgOne from '../../../assets/home/01.jpg'
import bannerImgTwo from '../../../assets/home/02.jpg'
import bannerImgThree from '../../../assets/home/03.png'
import bannerImgFour from '../../../assets/home/04.jpg'
import bannerImgFive from '../../../assets/home/05.png'
import bannerImgSix from '../../../assets/home/06.png'

const Header = () => {
    return (
        
            <Carousel showArrows={true}>
                <div>
                <img src={bannerImgTwo} />
                </div>
                <div>
                <img src={bannerImgOne} />
                </div>
                <div>
                    <img src={bannerImgThree} />
                </div>
                <div>
                    <img src={bannerImgFour} />
                </div>
                <div>
                    <img src={bannerImgFive} />
                </div>
                <div>
                    <img src={bannerImgSix} />
                </div>
            </Carousel>
        
    );
};

export default Header;