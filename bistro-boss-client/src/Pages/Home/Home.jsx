
import Categories from "./Categories/Categories";
import ChefsRecommendation from "./ChefsRecommendation/ChefsRecommendation";
import Featured from "./Featured/Featured";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
    return (
        <>
            <Header/>
            <Categories/>
            <Menu/>
            <ChefsRecommendation/>
            <Featured/>
            <Testimonials/>
        </>
    );
};

export default Home;