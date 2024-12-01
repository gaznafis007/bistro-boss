/* eslint-disable react/prop-types */

const SectionTitle = ({ subHeading, heading, borderColor, textColor }) => {
  return (
    <>
      <h3 className={`text-yellow-500 text-center`}>--- {subHeading} ---</h3>
      <h1
        className={`text-xl mt-2 mb-4 w-1/6 mx-auto text-center border-y-2 ${
          borderColor ? borderColor : "border-y-slate-400"
        } ${textColor ? textColor : "text-black"} py-2 px-4 uppercase`}
      >
        {heading}
      </h1>
    </>
  );
};

export default SectionTitle;
