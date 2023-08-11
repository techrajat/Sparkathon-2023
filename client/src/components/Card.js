import React from "react";

const Card = ({ photo, title }) => {
  return (
    <div className="deal flex flex-col items-center justify-center ">
      <a href="/">
        <img src={photo} alt="" className="w-52 h-56 rounded-[1rem]" />
        <div className="flex flex-col items-center mt-2">
          <p className="font-bold text-[13px] text-center">
            {title}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Card;