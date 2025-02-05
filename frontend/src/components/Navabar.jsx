import { useState } from "react";
import { FaBars, FaTimes, FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo1.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="flex md:flex-row  bg-gray-100 justify-between shadow-xl items-center sticky top-0 z-10 p-4">
      {/* Logo Section */}
      <div>
        <img className="w-48 p-2 max-sm:w-48" src={logo} alt="img" />
      </div>

      {/* Menu Icon for Small Screens */}
      <div className="md:hidden flex items-center">
        {menuOpen ? (
          <FaTimes className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
        ) : (
          <FaBars className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Navigation Section - Side Navbar with Animation */}
      <div
        className={`max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:h-full max-sm:w-64 max-sm:bg-white max-sm:flex max-sm:flex-col max-sm:items-center max-sm:shadow-lg max-sm:transition-transform max-sm:duration-300 ${menuOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"} md:flex md:flex-row md:space-x-4`}
      >
        <FaTimes className="max-sm:block hidden absolute top-4 right-4 text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
        <a className="border-b-2 border-transparent hover:border-blue-500 transition p-2 " href="#">Features</a>
        <a className="border-b-2 border-transparent hover:border-blue-500 transition p-2" href="#About">About Us</a>
        <a className="border-b-2 border-transparent hover:border-blue-500 transition p-2" href="#">Contact Us</a>
        <Link className="border-b-2 border-transparent hover:border-blue-500 transition p-2" to="/pricing">
  Pricing
</Link>
        
        {/* Login/Signup Buttons for Small Screens */}
        <div className="md:hidden flex flex-col items-center gap-3 mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-lg">Login</button>
          <button className="bg-gray-400 hover:bg-blue-700 py-1 px-4 rounded-lg text-white">Sign Up</button>
        </div>
      </div>

      {/* User Section */}
      <div className="relative max-sm:hidden">
        <FaUserCog className="text-2xl cursor-pointer" onClick={() => setUserMenuOpen(!userMenuOpen)} />
        {userMenuOpen && (
          <div className="absolute top-10 right-0 bg-white shadow-lg p-3 rounded-lg flex flex-col gap-3 w-[120px]">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-lg">Login</button>
            <button className="bg-gray-400 hover:bg-blue-700 py-1 px-4 rounded-lg text-white">Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
