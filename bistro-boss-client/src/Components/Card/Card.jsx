import Button from "../Button/Button";

/* eslint-disable react/prop-types */
const Card = ({img, title, description, btn, action}) => {
  return (
    <div className="card bg-base-200">
      <figure>
        <img
          src={img}
          alt="card-image"
          className="object-cover w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-center font-semibold text-xl">{title}</h2>
        <p className="text-center">{description}</p>
        <div className="card-actions justify-center">
          <Button action={action} btnName={btn}/>
        </div>
      </div>
    </div>
  );
};

export default Card;
