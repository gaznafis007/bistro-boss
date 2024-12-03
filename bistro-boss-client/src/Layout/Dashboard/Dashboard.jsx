
import { Outlet } from 'react-router-dom';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const Dashboard = () => {
    return (
        <div className='flex flex-col md:flex-row'>
            <DashboardNav/>
            <Outlet/>
        </div>
    );
};

export default Dashboard;