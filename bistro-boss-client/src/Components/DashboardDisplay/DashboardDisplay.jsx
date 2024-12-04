/* eslint-disable react/prop-types */


import SectionTitle from "../SectionHeading/SectionTitle";

const DashboardDisplay = ({
  subHeading,
  heading,
  bgColor,
  children,
  itemOne,
  itemTwo,
  itemThree,
}) => {
  return (
    <>
      <SectionTitle subHeading={subHeading} heading={heading} />
      <div className={`my-6 ${bgColor} md:mx-20 p-6`}>
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold uppercase font-serif">
            {/* total items: {data.length} */}
            {itemOne}
          </h2>
          <h2 className="text-2xl font-bold uppercase font-serif">{itemTwo}</h2>
          {itemThree}
        </div>
      {children}
      </div>
    </>
  );
};

export default DashboardDisplay;
