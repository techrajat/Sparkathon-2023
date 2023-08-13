import React from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';

function Offer(props) {
    const navigate = useNavigate();

    const viewOffer=()=>{
        localStorage.setItem('selectedItem', props.article_id);
        navigate('/itemdesc');
    };

    return (
        <div className="w-4/5 h-[35rem] offer md:w-[30vw] relative rounded-[1rem] mt-3">
            <img src={props.image} alt="" className="absolute object-cover top-20 rounded-[1.8rem]" />
            <div className="offer-detail p-4 flex flex-col justify-between w-full bg-gray-100 rounded-[1rem]">
                <div className=" flex items-center justify-between pt-2">
                    <p className="font-bold text-[20px] text-[]">Special Deals</p>
                    <p style={{cursor: 'pointer'}} className=" text-[#0071dc]" onClick={viewOffer}>More info</p>
                </div>
                <div className="gap-4 pb-2 relative z-30">
                    <div className="flex items-center justify-between">
                        <div className="bg-[#ffc220] w-[7.5rem] flex items-center justify-center h-[2.5rem] rounded-full">
                            <span style={{cursor: 'pointer'}} className="font-bold text-[16px]" onClick={viewOffer}>BUY NOW</span>
                        </div>
                        <div className="h-full flex items-center ">
                            <p className="font-bold text-[26px]">&#8377;{props.price}</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <p className="font-semibold ">Best sold {props.prod_name} in 2023</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offer;