'use client'
import Link from "next/link";
import React, { useRef } from "react";

const brands = [
  { name: "COOLMATE", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-m02qx1cjpd655f&quot" },
  { name: "POLOMANOR", img: "https://down-vn.img.susercontent.com/file/vn-50009109-c600fb68d67e7e5164bc646f0bb1e229" },
  { name: "GUZADO", img: "https://down-vn.img.susercontent.com/file/21c730c26e8d3a6fab107a6ea75c057a" },
  { name: "LADOS", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c3xr1p6lro11" },
  { name: "5S FASHION", img: "https://down-vn.img.susercontent.com/file/573699fb35b480bae467c33e237bef2b" },
  { name: "PEALO", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c43i4c5n78fb" },
  { name: "TORANO", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c2ih4ogjw444" },
  { name: "TEELAB", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c3jxhza8j628" },
  { name: "JBAGY", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f" },
  { name: "ROWAY", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f" },
  { name: "ONOFF", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c41vh3z644eb" },
  { name: "CLOUDY", img: "https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c4c82kq6r857" },
];

const Mall = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: "left" | "right") => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    if (dir === "right") {
      containerRef.current.scrollBy({ left: width, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: -width, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-50 py-8">
      <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-red-500">SHOPEE MALL</h2>
          <a href="#" className="text-sm text-red-500 hover:underline flex items-center">Xem tất cả <span className="ml-1">&gt;</span></a>
        </div>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-gray-100"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            
            <div className="flex ">
              {brands.map((brand, index) => (
                <div key={index} className="flex flex-col ">
                  <Link href="/mall-detail">
                    <div className="w-40 h-40 flex items-center justify-center rounded  mb-2 border border-gray-200 overflow-hidden">
                      <img
                        src={brand.img}
                        alt={brand.name}
                        className="w-100 h-100 object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    <span className="text-sm text-center text-gray-800 font-semibold leading-tight">
                      {brand.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-gray-100"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mall;
