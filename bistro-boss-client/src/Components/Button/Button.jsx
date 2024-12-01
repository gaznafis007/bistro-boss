/* eslint-disable react/prop-types */
const Button = ({ color, textColor, btnName, action, params }) => {
  return (
    <button
    onClick={params ? () => action(params) : action}
      className={`btn border-t-0 border-x-0 capitalize ${
        textColor ? textColor : "text-black hover:text-yellow-500"
      } border-b-2 ${
        color ? color : "border-b-black hover:bg-black"
      }`}
    >{btnName}</button>
  );
};

export default Button;
