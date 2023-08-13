import React, { useState, useEffect } from "react";
import "../App.css"
import logo from "../assets/logo1.svg";
import logo2 from "../assets/logo.png";
import { FaHome, FaHeart, FaUser } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const registration = () => {
    navigate('/register');
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const str = document.getElementById('searchBar').value;
    document.getElementById('searchBar').value = null;
    if (str) {
      localStorage.setItem('searchStr', str);
      props.setNewSearch(props.newSearch + 1);
      navigate('/search');
    }
  };

  const getUsername = async () => {
    const response = await fetch("http://127.0.0.1:8000/getuser", {
      method: 'GET',
      headers: { 'Authorization': localStorage.getItem('token') }
    });
    const jsonRes = await response.json();
    if (response.status === 200) {
      if (window.innerWidth > 768)
        document.querySelector('.name').innerHTML = jsonRes['username'];
      else
        document.querySelector('.nameSide').innerHTML = jsonRes['username'];
    }
    else {
      console.log(jsonRes.error);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('token'))
      props.setIsLogin(true);
    if (props.isLogin) {
      if (window.innerWidth > 768) {
        document.querySelector('.loginLink').style.display = 'none';
        document.querySelector('.dropdown').style.display = 'block';
        document.querySelector('.regIcon').style.display = 'none';
        document.querySelector('.myIcon').style.display = 'block';
        document.querySelector('.register').innerHTML = 'My Items';
      }
      else {
        document.querySelector('.loginLinkSide').style.display = 'none';
        document.querySelector('.usernameSide').style.display = 'block';
        document.querySelector('.regIconSide').style.display = 'none';
        document.querySelector('.myIconSide').style.display = 'block';
        document.querySelector('.logoutLinkSide').style.display = 'block';
        document.querySelector('.registerSide').innerHTML = 'My Items';
      }
      getUsername();
    }
    else {
      if (window.innerWidth > 768) {
        document.querySelector('.dropdown').style.display = 'none';
        document.querySelector('.loginLink').style.display = 'block';
        document.querySelector('.regIcon').style.display = 'block';
        document.querySelector('.myIcon').style.display = 'none';
        document.querySelector('.register').innerHTML = 'Register';
      }
      else {
        document.querySelector('.usernameSide').style.display = 'none';
        document.querySelector('.loginLinkSide').style.display = 'block';
        document.querySelector('.dropdown').style.display = 'none';
        document.querySelector('.regIconSide').style.display = 'block';
        document.querySelector('.myIconSide').style.display = 'none';
        document.querySelector('.logoutLinkSide').style.display = 'none';
        document.querySelector('.regIcon').style.display = 'block';
        document.querySelector('.registerSide').innerHTML = 'Register';
      }
    }
    // eslint-disable-next-line
  }, [props.isLogin]);

  const logout=()=>{
    props.setIsLogin(false);
    localStorage.removeItem('token');
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
              <Link to="/" onClick={toggleSidebar}>Home</Link>
            </div>
            <div className="sidebar-item">
              <p>Partners</p>
            </div>
            <div className="loginLinkSide sidebar-item">
              <MdLogout className="usern sidebar-icon" />
              <Link to="/login" onClick={toggleSidebar}>Login</Link>
            </div>
            <div className="usernameSide sidebar-item">
              <FaUser className="usern text-[18px]" />
              <Link to="/login" onClick={toggleSidebar} className="nameSide"></Link>
            </div>
            <div className="sidebar-item">
              <MdLogin className="regIconSide text-[17px] rotate-90" />
              <FaHeart className="myIconSide text-[18px]" style={{display: 'none'}} />
              <Link to="/register" onClick={registration && toggleSidebar} className="registerSide">Register</Link>
            </div>
            <div className="logoutLinkSide sidebar-item" style={{display: 'none'}}>
              <MdLogout className="usern sidebar-icon" />
              <span style={{cursor: 'pointer'}} onClick={logout}>Logout</span>
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
            <FaHome className="text-[17px]" />
            <Link to="/" className="text-[16px] font-semibold">Home</Link>
          </div>
          <div className="md:flex hidden  items-center gap-2 hover:bg-[#06529a] p-3 rounded-full ">
            <HiUserGroup className="text-[20px]" />
            <p className="text-[16px] font-semibold">Partners</p>
          </div>
        </div>
        {/* Middle */}
        <div className="searchDiv relative lg:flex items-center flex-1">
          <form className="relative flex-1" onSubmit={handleSearch}>
            <input type="search" placeholder="Search Walmart" id="searchBar" className="rounded-full py-1.5 pl-4 pr-10 outline-0 w-full pr-10 text-black" />
            <div className="absolute bg-[#ffc220] p-1.5 rounded-full right-1.5 top-1/2 transform -translate-y-1/2">
              <GoSearch className="text-black" />
            </div>
          </form>
        </div>

        {/* Right */}
        <div className="flex  items-center gap-x-2">
          <div className="loginLink flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full whitespace-nowrap desktopView">
            <MdLogout className="usern text-[20px] -rotate-90" />
            <Link to="/login" className="text-[16px] font-semibold">Login</Link>
          </div>
          <div className="dropdown">
            <a className="username dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <FaUser className="usern text-[20px]" />
              <span className="name text-[16px] font-semibold"></span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <span className="dropdown-item" style={{cursor: 'pointer'}} onClick={logout}>Logout</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full desktopView">
            <MdLogin className="regIcon text-[17px] rotate-90" />
            <FaHeart className="myIcon text-[20px]" style={{display: 'none'}} />
            <Link to="/register" className="register text-[16px] font-semibold" onClick={registration}>Register</Link>
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
