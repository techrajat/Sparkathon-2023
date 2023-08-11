import React, { useState } from "react";
import "../app.css"
import logo from "../assets/logo1.svg";
import logo2 from "../assets/logo.png";
import { FaLayerGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      <div className="bg-[#0071dc] px-3 py-2 lg:px-8 text-white flex justify-between items-center">
        {/* Mobile view starts*/}
        {/* Hamburger Icon */}
        <div className="hamburger-icon mobileView" onClick={toggleSidebar}>
          <div className={`hamburger ${isSidebarOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-content">
            <div className="sidebar-item">
              <p>Sections</p>
            </div>
            <div className="sidebar-item">
              <p>Partners</p>
            </div>
            <div className="sidebar-item">
              <MdLogin className="sidebar-icon" />
              <p>Register</p>
            </div>
            <div className="sidebar-item">
              <MdLogout className="sidebar-icon" />
              <p>Sign In</p>
            </div>
          </div>
        </div>
        {/* Mobile view ends */}

        {/* Left */}
        <div className="flex  items-center gap-x-3 shrink-0">
          <div className="hover:bg-[#06529a] p-2 rounded-full">
            <img src={logo} alt="" className="desktopView h-12" />
            <img src={logo2} alt="" className="mobileView h-8" />
          </div>

          <div className="md:flex items-center gap-2 hidden hover:bg-[#06529a] p-3 rounded-full">
            <FaLayerGroup className="text-[17px]" />
            <p className="text-[16px] font-semibold">Sections</p>
          </div>
          <div className="md:flex hidden  items-center gap-2 hover:bg-[#06529a] p-3 rounded-full ">
            <HiUserGroup className="text-[20px]" />
            <p className="text-[16px] font-semibold">Partners</p>
          </div>
        </div>
        {/* Middle */}
        <div className="searchDiv relative lg:flex items-center flex-1">
          <div className="relative flex-1">
            <input type="search" id="searchBar" className="rounded-full py-1.5 px-4 outline-0 w-full pr-10 text-black" />
            <div className="absolute bg-[#ffc220] p-1.5 rounded-full right-1.5 top-1/2 transform -translate-y-1/2">
              <GoSearch className="text-black" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex  items-center gap-x-2">
          <div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full desktopView">
            <MdLogin className="text-[17px] rotate-90" />
            <p className="text-[16px] font-semibold">Register</p>
          </div>
          <div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full whitespace-nowrap desktopView">
            <MdLogout className="text-[20px] -rotate-90" />
            <p className="text-[16px] font-semibold">Sign in</p>
          </div>
          <div className="hover:bg-[#06529a] p-3 rounded-full">
            <AiOutlineShoppingCart className="w-7 h-7" />
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="desktopView">
        <div className="bg-[#0071dc] mt-[1px] text-white px-3 py-2 lg:px-8 flex items-center gap-6">
          <div className="flex items-center gap-1 hover:underline">
            <BsPhone />
            <p className="text-[15px] font-bold">Place an order on the App</p>
          </div>
          <div className="flex items-center gap-1 hover:underline">
            <BiWorld />
            <p className="text-[15px] hover:underline">Guwahati India</p>
          </div>
          <p className="hidden md:flex hover:underline">Deals on Phones</p>
          <p className="hidden md:flex font-bold hover:underline">
            $499 OFF on Laptops
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
