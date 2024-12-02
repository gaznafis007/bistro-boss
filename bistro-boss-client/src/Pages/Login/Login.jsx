import { Link, useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/others/authentication.png";
import img from "../../assets/others/authentication1.png";
import SubmitButton from "../../Components/SubmitButton/SubmitButton";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const [isDisabled, setIsDisabled] = useState(true)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const {login} = useAuth()
    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({email, password});
        login(email, password)
        .then(res => {
          console.log(res.user);
          navigate(from, {replace: true});
        })
    }
    const handleCaptcha = event =>{
        event.preventDefault();
        const captchaValue = event.target.value;
        if(validateCaptcha(captchaValue)){
            toast.success('Captcha validated')
            setIsDisabled(false);
        }
        else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Captcha validation failed, Please try again",
            });
        }
    }
    useEffect(() =>{
        loadCaptchaEnginge(6); 
    },[])
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="min-h-screen flex flex-col justify-center items-center"
    >
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="mx-12 flex flex-col md:flex-row items-center justify-between p-16 py-20 shadow-lg gap-16"
      >
        <div className="w-1/2">
          <img src={img} className="w-full" alt="auth-banner" />
        </div>
        <div className="w-1/3">
          <form onSubmit={handleLogin} className="flex flex-col w-full">
            <h2 className="text-2xl font-bold text-center capitalize">login</h2>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="capitalize mb-2">
                email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="capitalize mb-2">
                password
              </label>
              <input
                type="password"
                name= 'password'
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="my-2">
            <LoadCanvasTemplate/>
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="capitalize mb-2">
                Type the above captcha
              </label>
              <input
                type="text"
                name="captcha"
                onBlur={handleCaptcha}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            {
                !isDisabled && <SubmitButton boolean={isDisabled} name={"login"} />
            }
            <Link
              to="/register"
              className="text-[#D1A054] my-3 capitalize font-semibold text-center"
            >
              new here? create new account
            </Link>
            <p className="mt-4 text-center">Or sign in with</p>
          </form>
          <div className="flex flex-row justify-center items-center mt-2 gap-2">
            <div className="p-2 border border-black rounded-full hover:border-0 hover:bg-black hover:text-white">
              <FaFacebookF />
            </div>
            <div className="p-2 border border-black rounded-full hover:border-0 hover:bg-black hover:text-white">
              <FaGoogle/>
            </div>
            <div className="p-2 border border-black rounded-full hover:border-0 hover:bg-black hover:text-white">
              <FaGithub/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
