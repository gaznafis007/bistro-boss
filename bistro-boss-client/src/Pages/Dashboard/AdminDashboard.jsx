/* eslint-disable react/prop-types */
import {FaPeopleGroup} from 'react-icons/fa6'
import { FaWallet } from "react-icons/fa";
import {PiChefHatFill} from 'react-icons/pi'
import {MdLocalShipping} from 'react-icons/md';
import { useQueries } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Loading from '../../Components/Loading/Loading';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer } from 'recharts';


const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];
const AdminDashboard = () => {
    
    const axiosSecure = useAxios();
    const fetchMenu = async () =>{
        const {data} = await axiosSecure.get('/menu');
        return data;
    }
    const fetchUsers = async () =>{
        const {data} = await axiosSecure.get('/users');
        return data;
    }
    const fetchPayments = async() =>{
        const res = await axiosSecure.get('/payments');
        return res.data;
    }
    const fetchCarts = async() =>{
        const res = await axiosSecure.get('/carts');
        return res.data;
    }
    const fetchStats = async() =>{
        const res = await axiosSecure.get('/stats');
        return res.data;
    }
    const queries = useQueries({
        queries:[
            {
                queryKey: ['menu'],
                queryFn: fetchMenu
            },
            {
                queryKey: ['users'],
                queryFn: fetchUsers
            },
            {
                queryKey: ['payments'],
                queryFn: fetchPayments
            },
            {
                queryKey: ['carts'],
                queryFn: fetchCarts
            },
            {
                queryKey: ['stats'],
                queryFn: fetchStats
            }
        ]
    });
    const [menuQuery, userQuery, paymentQuery, cartQuery, statsQuery] = queries
    console.log(menuQuery.data, userQuery.data, paymentQuery.data, cartQuery.data, statsQuery.data);
    const revenue = paymentQuery?.data && paymentQuery?.data.reduce((sum, payment) => sum + parseFloat(payment?.amount),0).toFixed(2);
    // console.log(revenue)
    if(menuQuery?.isLoading || userQuery?.isLoading || paymentQuery?.isLoading || cartQuery.isLoading){
        return <Loading/>
    }
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };
      const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text className='text-sm' x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}
  return (
    <section className="w-full p-8 bg-slate-100">
      <h2 className="text-3xl font-serif">Hi, Welcome Back!</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6">
        <div className="flex rounded-md flex-row py-12 text-white space-x-2 items-center justify-center bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]">
          <FaWallet size={42} />
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl">{revenue}</h2>
            <p>Revenue</p>
          </div>
        </div>
        <div className="flex rounded-md flex-row py-12 text-white space-x-2 items-center justify-center bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
          <FaPeopleGroup size={42} />
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl">{userQuery?.data?.length}</h2>
            <p>Customers</p>
          </div>
        </div>
        <div className="flex rounded-md flex-row py-12 text-white space-x-2 items-center justify-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
          <PiChefHatFill size={42} />
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl">{menuQuery?.data?.length}</h2>
            <p>Products</p>
          </div>
        </div>
        <div className="flex rounded-md flex-row py-12 text-white space-x-2 items-center justify-center bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]">
          <MdLocalShipping size={42} />
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl">{cartQuery?.data?.length}</h2>
            <p>Orders</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-x-3 mt-4 bg-white p-3">
        <div className="w-full md:w-1/2">
        <BarChart
      width={500}
      height={300}
      data={statsQuery.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {statsQuery?.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        </div>
        <div className="w-full md:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={statsQuery?.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="revenue"
          >
            {statsQuery?.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
