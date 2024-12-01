/* eslint-disable react/prop-types */
const MenuLayout = ({ items}) => {
 
  return (
    <div className="grid md:grid-cols-2 gap-4 my-4">
      {items.map((item) => (
        <div key={item._id} className="flex flex-row justify-between space-x-4">
          <div className="bg-slate-400 rounded-tr-full rounded-b-full w-1/3">
            <img src={item?.image} className="w-full rounded-tr-full rounded-b-full" alt="recipeImage" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl uppercase">
              {item?.name} ------------------
            </h3>
            <p className="mt-2">{item?.recipe}</p>
          </div>
          <h2 className="text-xl text-yellow-500">${item?.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default MenuLayout;
