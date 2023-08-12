import React from "react";
import "../App.css"
import laptop from "../assets/laptop.png";
import Deals from "./Deals";
const Hero = () => {
  return (
    <div className="hero">
      <div className="flex flex-col md:flex-row items-center justify-between md:w-max xl:w-[70vw] mx-auto gap-4 pt-3">
        {/* Fist Deal */}
        <div className="w-4/5 h-[35rem] offer md:w-[30vw] relative rounded-[1rem] mt-3">
          <img src={laptop} alt="" className="absolute object-cover top-20 rounded-[1.8rem]" />
          <div className="offer-detail p-4 flex flex-col justify-between w-full bg-gray-100 rounded-[1rem]">
            <div className=" flex items-center justify-between pt-2">
              <p className="font-bold text-[20px] text-[]">Special Deals</p>
              <p className=" text-[#0071dc]">More info</p>
            </div>
            <div className="gap-4 pb-2 relative z-30">
              <div className="flex items-center justify-between">
                <div className="bg-[#ffc220] w-[7.5rem] flex items-center justify-center h-[2.5rem] rounded-full">
                  <a href="/" className="font-bold text-[16px]">BUY NOW</a>
                </div>
                <div className="h-full flex items-center ">
                  <p className="font-bold text-[26px]">$34.99</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="font-semibold ">Best sold laptop in 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Deal */}
        <div className="w-4/5 h-[35rem] offer md:w-[30vw] relative rounded-[1rem] mt-3">
          <img src={laptop} alt="" className="absolute object-cover top-20 rounded-[1.8rem] " />
          <div className="offer-detail p-4 flex flex-col justify-between w-full bg-gray-100 rounded-[1rem] ">
            <div className="flex items-center justify-between pt-2">
              <p className="font-bold text-[20px] text-[]">Special Deals</p>
              <p className="text-[#0071dc]">More info</p>
            </div>
            <div className="gap-4 pb-2 relative z-30">
              <div className="flex items-center justify-between">
                <div className="bg-[#ffc220] w-[7.5rem] flex items-center justify-center h-[2.5rem] rounded-full">
                  <a href="/" className="font-bold text-[16px]">BUY NOW</a>
                </div>
                <div className="h-full flex items-center ">
                  <p className="font-bold text-[26px]">$34.99</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="font-semibold">Best sold laptop in 2022</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/5 h-[35rem] offer md:w-[30vw] relative rounded-[1rem] mt-3">
          <img src={laptop} alt="" className="absolute object-cover top-20 rounded-[1.8rem]" />
          <div className="offer-detail p-4 flex flex-col justify-between w-full bg-gray-100 rounded-[1rem]">
            <div className=" flex items-center justify-between pt-2">
              <p className="font-bold text-[20px] text-[]">Special Deals</p>
              <p className=" text-[#0071dc]">More info</p>
            </div>
            <div className="  gap-4 pb-2 relative z-30">
              <div className="flex items-center justify-between">
                <div className="bg-[#ffc220] w-[7.5rem] flex items-center justify-center h-[2.5rem] rounded-full">
                  <a href="/" className="font-bold text-[16px]">BUY NOW</a>
                </div>
                <div className="h-full flex items-center ">
                  <p className="font-bold text-[26px]">$34.99</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="font-semibold ">Best sold laptop in 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Deals />
    </div>
  );
};

export default Hero;
