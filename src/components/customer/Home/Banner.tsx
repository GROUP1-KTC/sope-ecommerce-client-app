'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const banners = [
    {
        bg: 'bg-gradient-to-br from-blue-900 to-blue-700',
        content: (
            <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
                <span className="text-4xl font-bold text-white">
                    Sope Shopping Live
                    <br />
                    Xuất sắc nhất
                </span>
                <span className="text-lg text-white mt-2">
                    Tận hưởng lợi ích tối đa !
                </span>
            </div>
        ),
        img: 'https://shop-phinf.pstatic.net/20250703_185/1751519723006NSNsz_PNG/EC87BCED9591EB9DBCEC9DB4EBB88C%2BEC8381EBB098EAB8B0%2BEAB2.png?type=a2304_jpg',
    },
    {
        bg: 'bg-orange-400',
        content: (
            <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
                <span className="text-4xl font-bold text-white">
                    LG Electronics
                </span>
                <span className="text-lg text-white">
                    Thiết bị gia dụng hot sẽ thay đổi trong mùa hè này, IT sale
                </span>
            </div>
        ),
        img: 'https://shop-phinf.pstatic.net/20250704_40/17516202403428uDWV_JPEG/E18481E185AEE18486E185A7E1848CE185AF%2BE18492E185A9E186.jpg?type=a2304_jpg',
    },
    {
        bg: 'bg-blue-600',
        content: (
            <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
                <span className="text-4xl font-bold text-white">
                    Thú cưng cũng cần mua sắm!
                    <br />
                    Lợi ích thành viên
                </span>
                <span className="text-lg text-white mt-2">
                    Giảm 50% cho các thương hiệu thú cưng phổ biến
                </span>
            </div>
        ),
        img: 'https://academyanimal.com/uploads/SiteAssets/411/images/news/yorkie-with-shopping-cart.png',
    },
    {
        bg: 'bg-black',
        content: (
            <div className="h-full flex flex-col justify-center pl-10 pr-4 py-6 relative z-20">
                <span className="text-4xl font-bold text-white">
                    Sope một lần hôm nay
                    <br />
                    Bạn muốn mua gì?
                </span>
                <span className="text-lg text-white mt-2">
                    Tận hưởng ưu đãi đặc biệt lên đến 50%!
                </span>
            </div>
        ),
        img: 'https://file.hstatic.net/200000472237/article/trang-web-ban-hang_1274e2e917854b8e8ec5874a7e355ede_grande.png',
    },
];

const AdsBanner = () => {
    // const { data: ads, isLoading } = useGetActiveAdsQuery();
    const [current, setCurrent] = useState(0);
    const [bannersPerView, setBannersPerView] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setBannersPerView(1);
            else if (window.innerWidth < 1024) setBannersPerView(2);
            else setBannersPerView(2);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const adsSafe = ads ?? [];
    // const totalSlides = Math.max(1, Math.ceil(adsSafe.length / bannersPerView));

    const totalSlides = Math.ceil(banners.length / bannersPerView);

    const prev = () => {
        setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const next = useCallback(() => {
        setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, [totalSlides]);

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, [next]);

    // 👇 render fallback trong JSX thay vì return sớm
    // if (isLoading) {
    //     return <div className="p-6 text-center">Đang tải quảng cáo...</div>;
    // }

    // if (adsSafe.length === 0) {
    //     return <div className="p-6 text-center">Không có quảng cáo nào</div>;
    // }

    return (
        <div className="w-full flex flex-col items-center py-6">
            <div className="w-full max-w-[1600px] relative overflow-hidden group">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        width: `${totalSlides * 100}%`,
                        transform: `translateX(-${current * (100 / totalSlides)}%)`,
                    }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideId) => (
                        <div key={slideId} className="flex w-full">
                            {/* {adsSafe */}
                            {banners
                                .slice(
                                    slideId * bannersPerView,
                                    slideId * bannersPerView + bannersPerView,
                                )
                                // .map((ad: AdsProgramDTO, index) => (
                                .map((banner, index) => (
                                    <div
                                        // key={ad.id}
                                        // style={{ width: `${100 / bannersPerView}%` }}
                                        // className="aspect-[16/9] rounded-3xl shadow-xl flex relative overflow-hidden mx-6 justify-between bg-gray-900"
                                        key={index}
                                        style={{
                                            width: `${100 / bannersPerView}%`,
                                        }}
                                        className={`aspect-[16/9] rounded-3xl shadow-xl flex relative overflow-hidden mx-6 justify-between ${banner.bg}`}
                                    >
                                        {/* {ad.productInfo?.defaultImage && ( */}
                                        {banner.img && (
                                            <Image
                                                // src={ad.productInfo.defaultImage}
                                                // alt={ad.productInfo.name}
                                                src={banner.img}
                                                alt="banner"
                                                fill
                                                className="object-cover z-10"
                                            />
                                        )}
                                        <div className="relative z-20 w-full h-full flex flex-col justify-center pl-8 bg-black/40">
                                            <span className="text-3xl font-bold text-white">
                                                {/* {ad.productInfo?.name} */}
                                                {banner.content}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            {banners.length % 2 !== 0 &&
                                slideId === totalSlides - 1 &&
                                banners.length % bannersPerView !== 0 && (
                                    <div className="w-1/2 h-64 mx-2" />
                                )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={prev}
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 group-hover:opacity-100 opacity-50 transition-all duration-150"
                    type="button"
                >
                    <ArrowBackIosNewIcon className="text-lg text-orange-500" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 group-hover:opacity-100 opacity-50 transition-all duration-150"
                    type="button"
                >
                    <ArrowForwardIosIcon className="text-lg text-orange-500" />
                </button>
            </div>
            <div className="flex gap-2 mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full ${current === index ? 'bg-black' : 'bg-gray-300'} inline-block`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdsBanner;
