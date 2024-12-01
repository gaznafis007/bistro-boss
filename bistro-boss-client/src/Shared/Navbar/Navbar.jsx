import { Link } from "react-router-dom";

const Navbar = () => {
  const navOptions = (
    <>
      <li>
        <Link to="/" className="text-white capitalize">
          home
        </Link>
      </li>
      <li>
        <Link to="/contact us" className="text-white capitalize">
          contact us
        </Link>
      </li>
      <li>
        <Link to="/dashboard" className="text-white capitalize">
          home
        </Link>
      </li>
      <li>
        <Link to="/menu" className="text-white capitalize">
          our menu
        </Link>
      </li>
      <li>
        <Link to="/shop" className="text-white capitalize">
          our shop
        </Link>
      </li>
      <li>
        <Link to="/signIn" className="text-white capitalize">
          sign in
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-black opacity-50 text-white z-10 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Bistro Boss</a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navOptions}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
