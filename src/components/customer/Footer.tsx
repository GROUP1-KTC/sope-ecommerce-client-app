// import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#fafafa] border-t border-[#f5f5f5] text-[#222] text-xs sm:text-sm mt-10 border border-red-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 border-b-2 border-red-800">
        {/* Customer Service */}
        <div>
        <h3 className="font-bold mb-2 ">CUSTOMER SERVICE</h3>
        <ul className="space-y-1">
            <li>Help Centre</li>
            <li>Shopee Blog</li>
            <li>Shopee Mall</li>
            <li>How To Buy</li>
            <li>How To Sell</li>
            <li>Payment</li>
            <li>Shopee Coins</li>
            <li>Shipping</li>
            <li>Return & Refund</li>
            <li>Contact Us</li>
            <li>Warranty Policy</li>
          </ul>
        </div>
        {/* About Shopee */}
        <div>
          <h3 className="font-bold mb-2">ABOUT SHOPEE</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Shopee Careers</li>
            <li>Shopee Policies</li>
            <li>Privacy Policy</li>
            <li>Shopee Mall</li>
            <li>Seller Centre</li>
            <li>Flash Deals</li>
            <li>Shopee Ambassador Programme</li>
            <li>Media Contact</li>
          </ul>
        </div>
        {/* Payment & Logistics */}
        <div>
          <h3 className="font-bold mb-2">PAYMENT</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            <div className="w-8 h-6 sm:w-10 bg-gray-200 flex items-center justify-center text-xs">VISA</div>
            <div className="w-8 h-6 sm:w-10 bg-gray-200 flex items-center justify-center text-xs">Master</div>
            <div className="w-8 h-6 sm:w-10 bg-gray-200 flex items-center justify-center text-xs">AMEX</div>
            <div className="w-8 h-6 sm:w-10 bg-gray-200 flex items-center justify-center text-xs">JCB</div>
            <div className="w-8 h-6 sm:w-10 bg-gray-200 flex items-center justify-center text-xs">SPay</div>
            <div className="w-8 h-6 sm:w-10 bg-gray-200 flex items-center justify-center text-xs">Trả góp</div>
          </div>
          <h3 className="font-bold mb-2">LOGISTICS</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <div className="w-12 h-6 sm:w-14 bg-gray-200 flex items-center justify-center text-xs">SPX</div>
            <div className="w-12 h-6 sm:w-14 bg-gray-200 flex items-center justify-center text-xs">J&T</div>
            <div className="w-12 h-6 sm:w-14 bg-gray-200 flex items-center justify-center text-xs">NinjaVan</div>
            <div className="w-12 h-6 sm:w-14 bg-gray-200 flex items-center justify-center text-xs">Viettel</div>
            <div className="w-12 h-6 sm:w-14 bg-gray-200 flex items-center justify-center text-xs">Grab</div>
            <div className="w-12 h-6 sm:w-14 bg-gray-200 flex items-center justify-center text-xs">Ahamove</div>
          </div>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="font-bold mb-2">FOLLOW US</h3>
          <ul className="space-y-1">
            {/* <li className="flex items-center gap-2"><Facebook size={35} /> Facebook</li>
            <li className="flex items-center gap-2"><Instagram size={35} /> Instagram</li>
            <li className="flex items-center gap-2"><Linkedin size={35} /> LinkedIn</li>
            <li className="flex items-center gap-2"><Github size={35} /> Github</li> */}
          </ul>
        </div>
        {/* Shopee App Download */}
        <div>
          <h3 className="font-bold mb-2">SHOPEE APP DOWNLOAD</h3>
          <div className="flex flex-col xs:flex-row gap-2 items-center">
            <img
              src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
              alt="QR Code"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-white p-1 rounded"
            />
            <div className="flex flex-col gap-2">
              <img
                src="https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0"
                alt="App Store"
                className="w-20 h-6 sm:w-24 object-contain bg-white rounded"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def"
                alt="Google Play"
                className="w-20 h-6 sm:w-24 object-contain bg-white rounded"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                alt="AppGallery"
                className="w-20 h-6 sm:w-24 object-contain bg-white rounded"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Copyright & Info */}
      <div className="border-t border-[#f5f5f5] py-6 text-center text-xs text-[#888]">
        <div className="mb-2">© 2025 Shopee. All Rights Reserved .</div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-2">
          <a
          href="/privacy-policy"
          >
          <span>PRIVACY POLICY</span>
          </a>
          <span className="hidden sm:inline">|</span>
          <span>TERM OF SERVICE</span>
          <span className="hidden sm:inline">|</span>
          <span>SHIPPING POLICY</span>
          <span className="hidden sm:inline">|</span>
          <span>VIOLATION</span>
        </div>

        <div className="my-3">
            <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/269d99f72b0ddacd.png"
                alt="Shopee Logo"
                className="mx-auto w-100 h-50"
            />
        </div>

        <div>345 HUTECH Vietnam</div>
        <div>© 2025 - Copyright belongs to KTC group 1 </div>
      </div>
    </footer>
  );
};

export default Footer; 