import lgn from "../assets/images/linkedin.png";
import fb from "../assets/images/facebook.png";
import wh from "../assets/images/whatsapp.png";

function Footer () {

    return (
        <div className="bg-sky-950 mt-28 text-gray-200 flex flex-col">
        <div className="flex gap-20 p-5">
          <div className="ml-20 max-sm:ml-10">
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
        <div className="text-center mt-10 text flex justify-between max-sm:flex-col max-sm:items-center">
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
    )
}

export default Footer