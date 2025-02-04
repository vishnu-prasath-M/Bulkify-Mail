import Navbar from "./Navabar"

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
import Footer from "./Footer"

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
      <Navbar />

      {/* trial section */}
      <div className="text-center min-h-screen font-mono p-20 text-2xl max-sm:text-lg">
        <h1 className="opacity-0 animate-fadeIn">Professional email sender with high deliverability!
       
        </h1>
        <div className="flex flex-col items-center justify-center">
          <img className="w-[70%] max-sm:w-[400px] max-sm:h-[250px] mt-10" src={ban} alt="" />

          <button className="bg-green-500 hover:bg-green-600 hover:scale-95 rounded-lg px-3 py-2 text-[20px] font-Gabarito text-md flex max-sm:text-sm max-sm:mt-6 max-sm:rounded-xl"onClick={trial}>Try Free Trial<LuSquareArrowOutUpRight className="ml-2 mt-1.5 max-sm:mt-0.5" /></button>
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
      <Footer />

    </div>
  )
}
export default Home