import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaCartArrowDown } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const [data] = useCart();
  const handleLogout = () => {
    logout().then(() => {
      Swal.fire("Logout successfully");
    });
  };
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 capitalize" : "text-white capitalize"
          }
        >
          home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact us"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 capitalize" : "text-white capitalize"
          }
        >
          contact us
        </NavLink>
      </li>
      <li>
        <NavLink
          to={isAdmin ? '/dashboard/admin/home' : "/dashboard/home"}
          className={({ isActive }) =>
            isActive ? "text-yellow-400 capitalize" : "text-white capitalize"
          }
        >
          dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 capitalize" : "text-white capitalize"
          }
        >
          our menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop/salad"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 capitalize" : "text-white capitalize"
          }
        >
          our shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/carts"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 capitalize" : "text-white capitalize"
          }
        >
          {
            user?.uid ? 
            (
              <div className="indicator">
            <span className="indicator-item indicator-sm indicator-bottom badge badge-error">
              {data?.length}+
            </span>
            <div className="grid place-items-center">
              <FaCartArrowDown size={28} />
            </div>
          </div>
            )
            : 
            <FaCartArrowDown size={28} />
          }
        </NavLink>
      </li>
      <li>
        {user?.uid ? (
          <p className="text-white hover:text-yellow-400">
            {user?.displayName}
          </p>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 capitalize" : "text-white capitalize"
            }
          >
            sign in
          </NavLink>
        )}
      </li>
      {user?.uid && (
        <li>
          <span
            onClick={handleLogout}
            className="capitalize hover:text-red-400"
          >
            sign out
          </span>
        </li>
      )}
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
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
    </div>
  );
};

export default Navbar;
