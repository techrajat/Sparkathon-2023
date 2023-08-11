import React from "react";
import "../app.css"
import wallpaper from "../assets/wallpaper.jpg";
import laptop from "../assets/laptop.png";
const Hero = () => {
  return (
    <div className=" ">
      <div className="flex item-center md:w-max xl:w-[70vw] mx-auto gap-5">
        {/* Fist Deal */}
        <div className="  relative h-[35rem] flex items-end justify-center rounded-[1rem] md:w-[60vw] overflow-hidden mt-4 w-screen mx-4 md:mx-0 desktopView">
          <img
            src={wallpaper}
            alt=""
            className="absolute object-cover w-full h-full  rounded-[1rem] "
          />
          <div className="grad absolute w-full  md:w-[70vw]    h-[35rem] p-4"></div>
          <div className="pb-12 text-[50px] lg:text-[62px] font-bold  text-white  ">
            <h1 className="relative z-20">Christmas Deals</h1>
          </div>
        </div>

        {/* Second Deal */}
        <div className="hidden w-full   h-[35rem]   md:flex   md:w-[30vw]  relative  rounded-[1rem] mt-4  ">
          <img
            src={laptop}
            alt=""
            className="absolute object-cover top-32    rounded-[1.8rem] "
          />
          <div className="   p-4 flex flex-col justify-between w-full bg-gray-100 rounded-[1rem] ">
            <div className=" flex items-center justify-between pt-2">
              <p className="font-bold text-[20px] text-[]">Special Deals</p>
              <p className=" text-[#0071dc]">More info</p>
            </div>
            <div className="  gap-4 pb-2 relative z-30">
              <div className="flex items-center justify-between">
                <div className="bg-[#ffc220] w-[7.5rem] flex items-center justify-center h-[2.5rem] rounded-full">
                  <p className="font-bold text-[16px]   ">BUY NOW</p>
                </div>
                <div className="h-full flex items-center ">
                  <p className="font-bold text-[26px] ">$34.99</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="font-semibold ">Best sold laptop in 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
