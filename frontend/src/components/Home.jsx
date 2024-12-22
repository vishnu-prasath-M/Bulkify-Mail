import logo from "../assets/images/logo1.png"
import ban from "../assets/images/ban.jpg"
import lgn from "../assets/images/linkedin.png"
import fb from "../assets/images/facebook.png"
import wh from "../assets/images/whatsapp.png"
import wel from "../assets/images/handshake.png"
import support from "../assets/images/support.png"
import joini from "../assets/images/join.png"
import { FaUserCog } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import "aos/dist/aos.css";
import Aos from "aos"
import { useState } from "react"

import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useEffect } from "react"

function Home() {

  const navigate =useNavigate()

  const [isVisible,setIsVisisble] = useState(false)
  
      const handleshow =()=>{
        setIsVisisble(!isVisible)
      }

  useEffect(function(){
    Aos.init({duration:1000,once:false})
  },[])

  function trial(){
    navigate("/bulk")
  }

  return (
    <div className="scroll-smooth transition-transform">
      {/* navbar section */}
      <nav className="flex bg-gray-100 justify-between shadow-xl items-center sticky top-0 z-10">
        {/* logo Section */}
        <div>
          <img className="w-48 p-2 max-sm:w-32" src={logo} alt="img" />
        </div>

        {/* nav section */}
        <div className="flex space-x-4 max-sm:hidden">
          <a className="border-b-2 border-transparent hover:border-blue-500 transition" href="#">Features</a>
          <a className="border-b-2 border-transparent hover:border-blue-500 transition" href="#About">About Us</a>
          <a className="border-b-2 border-transparent hover:border-blue-500 transition" href="#">Contact Us</a>
          <a className="border-b-2 border-transparent hover:border-blue-500 transition" href="#">Pricing</a>
        </div>


        {/* login signup section */}

        {isVisible && (<div className="flex flex-col gap-5 items-center absolute top-14 right-1">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 h-fit rounded-lg max-sm:text-sm">Login</button>
          <button className="bg-gray-400 hover:bg-blue-700 py-1 px-2 h-fit mr-2 rounded-lg text-white max-sm:text-sm">SignUp</button>
        </div>
        )}
        {/* user section */}
        <div>
        <FaUserCog className="w-24 hover:cursor-pointer" onClick={handleshow}/>
        </div>
      </nav>

      {/* trial section */}
      <div className="text-center min-h-screen font-mono p-20 text-2xl max-sm:text-lg">
        <h1 className="opacity-0 animate-fadeIn">Professional email sender with high deliverability!
       
        </h1>
        <div className="flex flex-col items-center justify-center">
          <img className="w-[70%] max-sm:w-80 mt-10" src={ban} alt="" />

          <button className="bg-green-500 hover:bg-green-600 hover:scale-95 rounded-md px-3 py-1 text-[20px] font-Gabarito text-md flex max-sm:text-sm max-sm:mt-6"onClick={trial}>Try Free Trial<LuSquareArrowOutUpRight className="ml-2 mt-1.5" /></button>
        </div>

      </div>

      {/* About Section */}
      <div className="text-center mt-32 max-sm:-mt-32" id="About" data-aos="fade-up">
        <h1 className="text-2xl font-bold max-sm:text-lg">About Us</h1>
        <div className="flex gap-20 ml-7 mr-7 mt-5 font-Gabarito max-sm:flex-col max-sm:text-sm max-sm:items-center">
          <div className="bg-gray-200 p-3 rounded-lg max-sm:w-56 shadow-lg h-48 flex flex-col items-center justify-center">
            <img className="w-[80px]" src={wel} />
            <p>Welcome to BulkifyMail,.We help businesses and individuals connect with their audience effortlessly through user-friendly tools</p>
            </div>
          <div className="bg-gray-200 p-3 rounded-lg max-sm:w-56 shadow-lg h-48 flex flex-col items-center justify-center">
          <img className="w-[80px]" src={support} />
            <p>Our mission is simple: to make email marketing easy, efficient, and impactful. With secure data handling, 24/7 support, and affordable plans</p>
          </div>
          <div className="bg-gray-200 p-3 rounded-lg max-sm:w-56 shadow-lg h-48 flex flex-col items-center justify-center">
          <img className="w-[80px]" src={joini} />
            <p>Join us today and transform the way you connect—because great emails build great relationships!</p>
          </div>
        </div>
      </div>

      {/* footer section */}
      <div className="bg-sky-950 mt-20 text-gray-200 flex flex-col">
        <div className="flex gap-20 p-5">
          <div className="ml-20">
            <h1 className="font-bold">Resources</h1>
            <div className="flex flex-col gap-2 underline">
              <a href="#">Blog</a>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>

          <div>
            <h1 className="font-bold">Help&Support</h1>
            <div className="flex flex-col gap-2 underline">
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
              <a href="#">FAQs</a>
              <a href="#">Pricing</a>
            </div>
          </div>

          
        </div>
        <div className="text-center mt-10 text flex justify-between">
            <p className="ml-8">&copy; 2024 Bulkify Mail. All rights reserved.</p>
              {/* social media */}
          <div className="flex items-center gap-3 pb-4 mr-5">
            <h1 className="font-bold">Follow Us On:</h1>
            <a href=""><img className="w-8" src={lgn} alt="" /></a>
            <a href=""><img className="w-8" src={fb} alt="" /></a>
            <a href=""><img className="w-8" src={wh} alt="" /></a>
          </div>
          </div>
      </div>




    </div>
  )
}
export default Home