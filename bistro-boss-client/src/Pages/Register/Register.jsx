import { Link, useLocation, useNavigate } from "react-router-dom";
import SubmitButton from "../../Components/SubmitButton/SubmitButton";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import bg from "../../assets/others/authentication.png";
import img from "../../assets/others/authentication1.png";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/usePublicAxios";

const Register = () => {
  const {register:signUp, getProfile, googleLogin} = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from.pathname || '/'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic()
  const handleGoogleLogin = () =>{
    googleLogin()
    .then(res =>{
      const googleUser = res.user;
      axiosPublic.post(`/users?email=${googleUser?.email}`, {name: googleUser?.displayName, email: googleUser?.email})
      .then(res =>{
        if(res.data){
          navigate(from, {replace: true})
        }
      })
    })
  }
  const handleRegister = (userInfo) => {
    const user = {
      email: userInfo?.email,
      name: userInfo?.name
    }
    fetch(`http://localhost:5000/users?email=${userInfo?.email}`, {
      method: 'Post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.acknowledged){
    signUp(userInfo.email, userInfo?.password)
    .then(res => {
      console.log(res.user);
      if(res.user){
        getProfile(data?.name)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    })
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already exist!",
        });
      }
    })
    
  };
  

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="min-h-screen flex flex-col justify-center items-center"
    >
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="mx-12 flex flex-col md:flex-row-reverse items-center justify-between p-16 py-20 shadow-lg gap-16"
      >
        <div className="w-1/2">
          <img src={img} className="w-full" alt="auth-banner" />
        </div>
        <div className="w-1/3">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col w-full"
          >
            <h2 className="text-2xl font-bold text-center capitalize">
              sign up
            </h2>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="capitalize mb-2">
                name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("name", { required: "please provide your name" })}
              />
              {errors?.name && (
                <p className="text-red-500 capitalize mt-2">
                  {errors?.name?.message}
                </p>
              )}
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="capitalize mb-2">
                email
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "please provide email address",
                })}
              />
              {errors?.email && (
                <p className="text-red-500 mt-2 capitalize">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div className="my-2 flex flex-col">
              <label htmlFor="" className="capitalize mb-2">
                password
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Please provide password",
                  minLength: 6,
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Your password must contain at least one small letter, one capital letter, and a number",
                  },
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="text-red-500 mt-2 capitalize">
                  {errors?.password?.message}
                </p>
              )}
              {errors?.password?.type === "minLength" && (
                <p className="text-red-500 mt-2 capitalize">
                  password must be 6 characters long
                </p>
              )}
              {errors?.password?.type === "pattern" && (
                <p className="text-red-500 mt-2 capitalize">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <SubmitButton name={"sign up"} />
            <Link
              to="/login"
              className="text-[#D1A054] my-3 capitalize font-semibold text-center"
            >
              already registered? go to login
            </Link>
            <p className="mt-4 text-center">Or sign up with</p>
          </form>
          <div className="flex flex-row justify-center items-center mt-2 gap-2">
            <div className="p-2 border border-black rounded-full hover:border-0 hover:bg-black hover:text-white">
              <FaFacebookF />
            </div>
            <div onClick={handleGoogleLogin} className="p-2 border border-black rounded-full hover:border-0 hover:bg-black hover:text-white">
              <FaGoogle />
            </div>
            <div className="p-2 border border-black rounded-full hover:border-0 hover:bg-black hover:text-white">
              <FaGithub />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
