'use client'

import React, { useState } from "react";

const banners = [
  {
    bg: "bg-gradient-to-br from-blue-900 to-blue-700",
    content: (
      <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
        <span className="text-4xl font-bold text-white">Naver Shopping Live<br/>Best Awards</span>
        <span className="text-lg text-white mt-2">Live maximum benefits + additional accrual!</span>
      </div>
    ),
    img: "https://shop-phinf.pstatic.net/20250703_185/1751519723006NSNsz_PNG/EC87BCED9591EB9DBCEC9DB4EBB88C%2BEC8381EBB098EAB8B0%2BEAB2.png?type=a2304_jpg",
  },
  {
    bg: "bg-orange-400",
    content: (
      <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
        <span className="text-4xl font-bold text-white">LG Electronics Summer Peak</span>
        <span className="text-lg text-white">Hot home appliances that will change this summer, IT sale</span>
      </div>
    ),
    img: "https://shop-phinf.pstatic.net/20250704_40/17516202403428uDWV_JPEG/E18481E185AEE18486E185A7E1848CE185AF%2BE18492E185A9E186.jpg?type=a2304_jpg",
  },
  {
    bg: "bg-blue-600",
    content: (
      <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
        <span className="text-4xl font-bold text-white">My dog and cat too<br/>Membership benefits!</span>
        <span className="text-lg text-white mt-2">50% off popular pet brands</span>
      </div>
    ),
    img: "https://shop-phinf.pstatic.net/20250703_142/1751509026934BSOch_PNG/EB84A4ED948CEC8AA4%2BED9988%2BECB59CEC8381EB8BA8_ED858DEC8.png?type=a2304_jpg",
  },
  {
    bg: "bg-black",
    content: (
      <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
        <span className="text-4xl font-bold text-white">Nenet once today<br/>Would you like to do it?</span>
        <span className="text-lg text-white mt-2">Membership starts at 4,900 won per month</span>
      </div>
    ),
    img: "https://shop-phinf.pstatic.net/20250703_239/17515023748273J7Gd_PNG/ED8EABEB9DBCEC9DB4ECA795EC9C84ED81AC%2BECB59CEC8381EB8B.png?type=a2304_jpg",
  },
];

const BANNERS_PER_VIEW = 2;

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(banners.length / BANNERS_PER_VIEW);

  const prev = () => setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <div className="w-full flex flex-col items-center py-6">
      <div className="w-full max-w-[1600px] relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${current * (100 / totalSlides)}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((key,slideId) => (
            <div key={slideId} className="flex w-full">
              {banners.slice(slideId * BANNERS_PER_VIEW, slideId * BANNERS_PER_VIEW + BANNERS_PER_VIEW).map((banner, index) => (
                <div
                  key={index}
                  className={`w-1/2 h-84 rounded-3xl shadow-xl flex relative overflow-hidden mx-6 justify-between ${banner.bg}`}
                >
                  {/* Hình ảnh phủ full banner */}
                  {banner.img && (
                    <img src={banner.img} alt="banner" className="absolute inset-0 w-full h-full object-cover z-10" />
                  )}
                  {/* Nội dung chữ đè lên hình ảnh */}
                  <div className="relative z-20 w-full h-full flex items-center">
                    {banner.content}
                  </div>
                </div>
              ))}
              {/* Nếu số lượng banner lẻ, thêm ô trống */}
              {banners.length % 2 !== 0 && slideId === totalSlides - 1 && banners.length % BANNERS_PER_VIEW !== 0 && (
                <div className="w-1/2 h-64 mx-2" />
              )}
            </div>
          ))}
        </div>
        {/* Nút điều hướng */}
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-100 z-30 border border-gray-200">
          &#8592;
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-100 z-30 border border-gray-200">
          &#8594;
        </button>
      </div>
      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalSlides }).map((_key, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${current === index ? "bg-black" : "bg-gray-300"} inline-block`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner; 