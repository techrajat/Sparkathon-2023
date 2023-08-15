import React from "react";
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
  const navigate = useNavigate();

  const viewItem=()=>{
    localStorage.setItem('selectedItem', props.article_id);
    console.log(localStorage.getItem('selectedItem'))
    navigate('/itemdesc');
  };

  return (
    <div className="deal flex flex-col items-center justify-center" onClick={viewItem} style={{cursor: 'pointer'}}>
      <img src={props.image} alt="" className="w-52 h-56 rounded-[1rem]" />
      <div className="flex flex-col items-center mt-2">
        <span className="font-bold text-[15px]">&#8377; {props.price}</span>
        <p className="text-center">
          {props.title.length <= 15 && props.title}
          {props.title.length > 15 && props.title.slice(0, 15) + "..."}
        </p>
      </div>
    </div>
  );
};

export default Card;