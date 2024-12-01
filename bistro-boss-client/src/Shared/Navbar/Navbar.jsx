import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navOptions = (
    <>
      <li>
        <NavLink to="/" className={({isActive}) => isActive ? 'text-yellow-400 capitalize' : 'text-white capitalize'}>
          home
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact us" className={({isActive}) => isActive ? 'text-yellow-400 capitalize' : 'text-white capitalize'}>
          contact us
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'text-yellow-400 capitalize' : 'text-white capitalize'}>
          home
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu" className={({isActive}) => isActive ? 'text-yellow-400 capitalize' : 'text-white capitalize'}>
          our menu
        </NavLink>
      </li>
      <li>
        <NavLink to="/shop/salad" className={({isActive}) => isActive ? 'text-yellow-400 capitalize' : 'text-white capitalize'}>
          our shop
        </NavLink>
      </li>
      <li>
        <NavLink to="/signIn" className={({isActive}) => isActive ? 'text-yellow-400 capitalize' : 'text-white capitalize'}>
          sign in
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-black bg-opacity-50 text-white z-10 fixed">
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
