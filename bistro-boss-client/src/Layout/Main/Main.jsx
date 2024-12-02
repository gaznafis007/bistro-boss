import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const pathName = location?.pathname;
  const isLoginOrRegister = pathName === "/login" || pathName === "/register";

  return (
    <>
      {!isLoginOrRegister && <Navbar />}
      <Outlet />
      {!isLoginOrRegister && <Footer />}
    </>
  );
};

export default Main;
