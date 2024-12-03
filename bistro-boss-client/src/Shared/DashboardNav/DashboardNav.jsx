import { NavLink } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const DashboardNav = () => {
    const [data] = useCart()
    const navItems = <>
    <li>
        <NavLink to='/dashboard/home' className={({isActive})=> isActive ? 'text-white' : 'text-black'}>user home</NavLink>
    </li>
    <li>
        <NavLink to='/dashboard/reservation' className={({isActive})=> isActive ? 'text-white' : 'text-black'}>reservation</NavLink>
    </li>
    <li>
        <NavLink to='/dashboard/payment' className={({isActive})=> isActive ? 'text-white' : 'text-black'}>payment history</NavLink>
    </li>
    <li>
        <NavLink to='/dashboard/carts' className={({isActive})=> isActive ? 'text-white' : 'text-black'}>
        <div className="indicator">
            <span className="indicator-item text-sm indicator-bottom badge">
              {data.length}+
            </span>
            <div className="grid place-items-center">
              my cart
            </div>
          </div>
        </NavLink>
    </li>
    <li>
        <NavLink to='/dashboard/addReview' className={({isActive})=> isActive ? 'text-white' : 'text-black'}>add review</NavLink>
    </li>
    <li>
        <NavLink to='/dashboard/bookings' className={({isActive})=> isActive ? 'text-white' : 'text-black'}>my booking</NavLink>
    </li>
    </>
    const items = <>
    <li>
        <NavLink to={'/'}>home</NavLink>
    </li>
    <li>
        <NavLink to={'/menu'}>menu</NavLink>
    </li>
    <li>
        <NavLink to={'/shop/pizza'}>shop</NavLink>
    </li>
    <li>
        <NavLink to={'/contact'}>contact</NavLink>
    </li>
    </>
    return (
        <nav className='md:min-h-screen p-6 bg-[#D1A054]'>
            <h2 className="text-2xl text-center text-black uppercase font-bold">bistro boss</h2>
            <ul className='mt-4 text-center flex flex-col space-y-2 capitalize'>
                {navItems}
            </ul>
            <div className="divider divider-primary"></div>
            <ul className='mt-4 text-center flex flex-col space-y-2 capitalize'>
                {items}
            </ul>
        </nav>
    );
};

export default DashboardNav;