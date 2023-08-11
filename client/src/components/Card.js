import React from "react";

const Card = ({ photo, title, price }) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img src={photo} alt="" className="w-52 h-56 rounded-[1rem]" />
      <div className="flex justify-between w-[13rem]">
        <p className="font-bold text-[13px] ">
          {title + "Rapid Charger & Stylus Pen  "}
        </p>
        <p className="font-bold">{price}</p>
      </div>
    </div>
  );
};

export default Card;
