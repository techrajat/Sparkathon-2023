import React, { useState, useEffect } from "react";
import "../App.css";
import { FaHome, FaHeart, FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setIsLogin(true);
    }
    // eslint-disable-next-line
  }, []);

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
    localStorage.setItem('searchStr', str);
    document.getElementById('searchBar').value = null;
    props.setNewSearch(props.newSearch + 1);
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch("http://127.0.0.1:8000/setstring", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": token
        },
        body: `str=${encodeURIComponent(str)}`
      });
      if (response.status === 200) {
        console.log("Search string updated")
      }
    }
    if (str) {
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
    if (props.isLogin) {
      if (window.innerWidth > 768) {
        document.querySelector('.loginLink').style.display = 'none';
        document.querySelector('.dropdown').style.display = 'block';
        document.querySelector('.register').style.display = 'none';
        document.querySelector('.payment').style.display = 'block';
      }
      else {
        document.querySelector('.loginLinkSide').style.display = 'none';
        document.querySelector('.usernameSide').style.display = 'block';
        document.querySelector('.logoutLinkSide').style.display = 'block';
        document.querySelector('.registerSide').style.display = 'none';
        document.querySelector('.paymentSide').style.display = 'block';
      }
      getUsername();
    }
    else {
      if (window.innerWidth > 768) {
        document.querySelector('.dropdown').style.display = 'none';
        document.querySelector('.loginLink').style.display = 'block';
        document.querySelector('.register').style.display = 'block';
        document.querySelector('.payment').style.display = 'none';
      }
      else {
        document.querySelector('.usernameSide').style.display = 'none';
        document.querySelector('.loginLinkSide').style.display = 'block';
        document.querySelector('.dropdown').style.display = 'none';
        document.querySelector('.logoutLinkSide').style.display = 'none';
        document.querySelector('.registerSide').style.display = 'block';
        document.querySelector('.paymentSide').style.display = 'none';
      }
    }
    // eslint-disable-next-line
  }, [props.isLogin]);

  const logout = () => {
    props.setIsLogin(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  const findItemsCart = async () => {
    const response = await fetch("http://127.0.0.1:8000/numcart", {
      method: 'GET',
      headers: { 'Authorization': localStorage.getItem('token') }
    });
    if (response.status === 200) {
      const jsonRes = await response.json();
      document.getElementById('numItems').innerHTML = jsonRes.numsItems;
    }
  };

  useEffect(() => {
    if (!props.isLogin) {
      document.getElementById('numItems').style.display = 'none';
    }
    else {
      document.getElementById('numItems').style.display = 'block';
      findItemsCart();
    }
    // eslint-disable-next-line
  }, [props.isLogin, props.numItemsCart]);

  return (
    <div>
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
              <p>Contact Us</p>
            </div>
            <div className="loginLinkSide sidebar-item">
              <MdLogout className="usern sidebar-icon" />
              <Link to="/login" onClick={toggleSidebar}>Login</Link>
            </div>
            <div className="usernameSide sidebar-item">
              <FaUser className="usern text-[18px]" />
              <Link to="/login" onClick={toggleSidebar} className="nameSide"></Link>
            </div>
            <div className="registerSide sidebar-item">
              <MdLogin className="regIcon text-[17px] rotate-90" />
              <Link to="/register" onClick={registration && toggleSidebar}>Register</Link>
            </div>
            <div className="paymentSide flex items-center gap-2 hover:bg-[#06529a] py-3 rounded-full desktopView">
              <FaHeart className="myIcon text-[20px]" />
              <Link to="/payment" className="text-[16px] font-semibold">My Items</Link>
            </div>
            <div className="logoutLinkSide sidebar-item" style={{ display: 'none' }}>
              <MdLogout className="usern sidebar-icon" />
              <span style={{ cursor: 'pointer' }} onClick={logout}>Logout</span>
            </div>
          </div>
        </div>
        {/* Mobile view ends */}

        {/* Left */}
        <div className="flex  items-center gap-x-3 shrink-0">
          <div className="p-2 rounded-full font-weight-bold fs-4 logo">
            VALUEMART
          </div>
          <div className="md:flex items-center gap-2 hidden hover:bg-[#06529a] p-3 rounded-full">
            <FaHome className="text-[17px]" />
            <Link to="/" className="text-[16px] font-semibold">Home</Link>
          </div>
          <div className="md:flex hidden  items-center gap-2 hover:bg-[#06529a] p-3 rounded-full ">
            <FiMail className="text-[20px]" />
            <p className="text-[16px] font-semibold">Contact Us</p>
          </div>
        </div>
        {/* Middle */}
        <div className="searchDiv relative lg:flex items-center flex-1">
          <form className="relative flex-1" onSubmit={handleSearch}>
            <input type="search" placeholder="Search here" id="searchBar" className="rounded-full py-1.5 pl-4 pr-10 outline-0 w-full pr-10 text-black" />
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
                <span className="dropdown-item" style={{ cursor: 'pointer' }} onClick={logout}>Logout</span>
              </li>
            </ul>
          </div>
          <div className="register flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full desktopView">
            <MdLogin className="regIcon text-[17px] rotate-90" />
            <Link to="/register" className="text-[16px] font-semibold" onClick={registration}>Register</Link>
          </div>
          <div className="payment flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full desktopView">
            <FaHeart className="myIcon text-[17px]" />
            <Link to="/payment" className="text-[16px] font-semibold">My Items</Link>
          </div>
          <div className="hover:bg-[#06529a] p-3 rounded-full relative">
            <Link to="/checkout">
              <AiOutlineShoppingCart className="w-7 h-7" />
              <span class="absolute top-2 right-0 transform translate-x-[-20%]  translate-y-0.1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs" id="numItems"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
