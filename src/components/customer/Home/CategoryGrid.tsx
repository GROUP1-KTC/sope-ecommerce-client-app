'use client';

import React, { useEffect, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const categories = [
    {
        name: 'Thời Trang Nam',
        img: 'https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b',
    },
    {
        name: 'Thời Trang Nữ',
        img: 'https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d',
    },
    {
        name: 'Điện Thoại & Phụ Kiện',
        img: 'https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca',
    },
    {
        name: 'Mẹ & Bé',
        img: 'https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e',
    },
    {
        name: 'Thiết Bị Điện Tử',
        img: 'https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5',
    },
    {
        name: 'Nhà Cửa & Đời Sống',
        img: 'https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f',
    },
    {
        name: 'Máy Tính & Laptop',
        img: 'https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d',
    },
    {
        name: 'Sắc Đẹp',
        img: 'https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72',
    },
    {
        name: 'Máy Ảnh & Máy Quay Phim',
        img: 'https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d',
    },
    {
        name: 'Sức Khỏe',
        img: 'https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747',
    },
    {
        name: 'Đồng Hồ',
        img: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260',
    },
    {
        name: 'Giày Dép Nữ',
        img: 'https://down-vn.img.susercontent.com/file/48630b7c76a7b62bc070c9e227097847',
    },
    {
        name: 'Giày Dép Nam',
        img: 'https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de',
    },
    {
        name: 'Túi Ví Nữ',
        img: 'https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52',
    },
];

const flashSales = [
    {
        name: 'Sữa Milo 180ml (thùng 48 hộp)',
        img: 'https://cdn.tgdd.vn/Products/Images/2945/86191/bhx/thung-48-hop-thuc-uong-lua-mach-milo-active-go-180ml-202404051117287495.jpg',
        price: 408000,
        discount: 22,
        soldPercent: 80,
    },
    {
        name: 'Combo Sữa Dưỡng Thể Vaseline 330ml',
        img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRDAqLFUA46zkuVLPtrRcBWRpZbnCgUxrnWLHl_Cf5NG8h2tAqq0p07uqspV-NObvTG04uPMgU2upAOv6hZEMNa5hYECXUd7qA6vYg49VzElWc9QWwNzWYi',
        price: 118000,
        discount: 21,
        soldPercent: 60,
    },
    {
        name: 'Bỉm Bobby Fresh XXL 56 Miếng',
        img: 'https://mommomcare.com/wp-content/uploads/2022/12/z3992343122381_452e2b1aa68ef1ba6ce5259b74639d6a.jpg',
        price: 810000,
        discount: 32,
        soldPercent: 90,
    },
    {
        name: 'Quần Short Nam Coolmate',
        img: 'https://n7media.coolmate.me/uploads/April2025/quan-shorts-summer-cool-7-inch-2-lop-_xanh_1.jpg',
        price: 359000,
        discount: 30,
        soldPercent: 50,
    },
    {
        name: 'Sữa Non Tăng Cân ColosBaby',
        img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRnxDCBb_2sEfzMIsLWIjOOIBuvPxtGfwfrKXHjMZnG56T4XtxRCy6KjuRYEdhGCkBzDbJrICXFfP7Ql0nP4MQRp6EFJtbYjPuh454Mvkp89s9svRntR-N2',
        price: 367500,
        discount: 29,
        soldPercent: 70,
    },
    {
        name: 'Kem Chống Nắng Centella',
        img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQOptiD2kJ3PWyyU6qFldOTzfycG98Ln7I_yRVih-87QjgEx5oesJCeneR7FMpzJKpdpRUotm11MGGX7b1Fjp6IFsH7TrFYKU8ExsETEnqbyBr2FtonR-Y77A',
        price: 329300,
        discount: 28,
        soldPercent: 40,
    },
    {
        name: 'Kem Chống Nắng Centella1',
        img: 'https://cdn.tgdd.vn/Products/Images/2945/86191/bhx/thung-48-hop-thuc-uong-lua-mach-milo-active-go-180ml-202404051117287495.jpg',
        price: 329300,
        discount: 28,
        soldPercent: 40,
    },
    {
        name: 'Kem Chống Nắng Centella2',
        img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRoZzumubNg7LMyxaTKNX8X_BFI9S7wGmMh_QZlfo7a4hgK9enyovz2fyKQ-mWU3r0hMOD3Y6L1oXwGlUElpc5hLQUMBBk7NtWoOvYHXLLRjkJSSOh91g-Lorl_xltsQGn4JOunBg&usqp=CAc',
        price: 329300,
        discount: 28,
        soldPercent: 40,
    },
    {
        name: 'Kem Chống Nắng Centella3',
        img: 'https://cdn.tgdd.vn/Products/Images/2945/86191/bhx/thung-48-hop-thuc-uong-lua-mach-milo-active-go-180ml-202404051117287495.jpg',
        price: 329300,
        discount: 28,
        soldPercent: 40,
    },
];

const ITEMS_PER_ROW = 10;

const CategoryGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [categoryAtStart, setCategoryAtStart] = useState(true);
    const [categoryAtEnd, setCategoryAtEnd] = useState(false);
    const [flashAtStart, setFlashAtStart] = useState(true);
    const [flashAtEnd, setFlashAtEnd] = useState(false);

    const handleScroll = (side: 'left' | 'right') => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        if (side === 'right') {
            containerRef.current.scrollBy({
                left: width / 2,
                behavior: 'smooth',
            });
        } else {
            containerRef.current.scrollBy({
                left: -width / 2,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const categoryContainer = containerRef.current;
        const flashContainer = flashRef.current;

        const handleCategoryScroll = () => {
            if (!categoryContainer) return;
            const { scrollLeft, scrollWidth, clientWidth } = categoryContainer;
            setCategoryAtStart(scrollLeft === 0);
            setCategoryAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };

        const handleFlashScrollEvent = () => {
            if (!flashContainer) return;
            const { scrollLeft, scrollWidth, clientWidth } = flashContainer;
            setFlashAtStart(scrollLeft === 0);
            setFlashAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };

        handleCategoryScroll();
        handleFlashScrollEvent();

        categoryContainer?.addEventListener('scroll', handleCategoryScroll);
        flashContainer?.addEventListener('scroll', handleFlashScrollEvent);

        return () => {
            categoryContainer?.removeEventListener(
                'scroll',
                handleCategoryScroll,
            );
            flashContainer?.removeEventListener(
                'scroll',
                handleFlashScrollEvent,
            );
        };
    }, []);

    const rows = [
        categories.slice(0, ITEMS_PER_ROW),
        categories.slice(ITEMS_PER_ROW, ITEMS_PER_ROW * 2),
    ];

    const formatPrice = (price: number) => {
        return `₫${price.toLocaleString('vi-VN')}`;
    };

    return (
        <>
            {/* CATEGORIES */}
            <div className="w-full flex justify-center bg-gray-50 py-4">
                <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative">
                    <h2 className="text-xl font-bold mb-4 pb-2 border-b">
                        DANH MỤC
                    </h2>
                    <div className="relative group">
                        {!categoryAtStart && (
                            <button
                                className="absolute -left-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                                onClick={() => handleScroll('left')}
                                aria-label="Scroll left"
                                type="button"
                            >
                                <ArrowBackIosNewIcon className="text-lg text-orange-500" />
                            </button>
                        )}
                        <div
                            ref={containerRef}
                            className="px-8"
                            style={{
                                scrollBehavior: 'smooth',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            <div className="min-w-max">
                                {rows.map((row, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className="flex flex-row mb-2 hover"
                                    >
                                        {row.map((cat, index) => (
                                            <a
                                                href="/product"
                                                key={cat.name}
                                                className="flex flex-col items-center mx-2 cursor-pointer w-24"
                                            >
                                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-100 mb-2 border border-gray-200 overflow-hidden">
                                                    <img
                                                        src={cat.img}
                                                        alt={cat.name}
                                                        className="w-18 h-18 object-contain"
                                                    />
                                                </div>
                                                <span className="text-xs text-center text-gray-700 font-medium leading-tight">
                                                    {cat.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <style jsx>{`
                            [ref='${containerRef.current}']::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {!categoryAtEnd && (
                            <button
                                className="absolute -right-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                                onClick={() => handleScroll('right')}
                                aria-label="Scroll right"
                                type="button"
                            >
                                <ArrowForwardIosIcon className="text-lg text-orange-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* SALES */}
            <div className="w-full flex justify-center bg-gray-50 py-4">
                <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b">
                        <h2 className="text-xl font-bold flex items-center text-red-500">
                            <span className="mr-2">⚡</span>FLASH SALES siêu hot
                            <span className="ml-4 text-black text-base font-medium rounded px-2 py-1">
                                <Countdown />
                            </span>
                        </h2>
                        <a
                            href="#"
                            className="text-sm text-orange-500 hover:underline"
                        >
                            Xem tất cả {'>'}
                        </a>
                    </div>
                    <div className="relative group">
                        {!flashAtStart && (
                            <button
                                className="absolute -left-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                                onClick={() => handleFlashScroll('left')}
                                aria-label="Scroll left"
                                type="button"
                            >
                                <ArrowBackIosNewIcon className="text-lg text-orange-500" />
                            </button>
                        )}
                        <div
                            ref={flashRef}
                            className="px-8"
                            style={{
                                scrollBehavior: 'smooth',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            <div className="flex min-w-max">
                                {flashSales.map((item, index) => (
                                    <div
                                        key={item.name + index}
                                        className="flex flex-col items-center shadow-xl rounded-lg m-2 p-2 w-48 min-w-[12rem] cursor-pointer hover:bg-orange-100 transition-colors duration-200"
                                    >
                                      
                                        <div className="w-36 h-36 flex items-center justify-center bg-white mb-2 rounded overflow-hidden ">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="text-sm font-semibold text-gray-800 text-center mb-1 line-clamp-2 min-h-[2.5rem]">
                                            {item.name}
                                        </div>
                                        <div className="text-lg font-bold text-red-500 mb-1">
                                            {formatPrice(item.price)}
                                        </div>
                                        <div className="flex items-center justify-center mb-1">
                                            <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                ĐANG BÁN CHẠY
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden mb-1">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-400 to-pink-400"
                                                style={{
                                                    width: `${item.soldPercent}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <style jsx>{`
                            [ref='${flashRef.current}']::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {!flashAtEnd && (
                            <button
                                className="absolute -right-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                                onClick={() => handleFlashScroll('right')}
                                aria-label="Scroll right"
                                type="button"
                            >
                                <ArrowForwardIosIcon className="text-lg text-orange-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryGrid;

// Countdown component
function Countdown() {
    const [time, setTime] = React.useState(60 * 60 + 55); // 1h 0m 55s
    React.useEffect(() => {
        if (time <= 0) return;
        const interval = setInterval(() => setTime((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [time]);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return (
        <span className="inline-flex items-center space-x-1">
            <span className="bg-black text-white rounded px-1 font-mono">
                {pad(h)}
            </span>
            <span>:</span>
            <span className="bg-black text-white rounded px-1 font-mono">
                {pad(m)}
            </span>
            <span>:</span>
            <span className="bg-black text-white rounded px-1 font-mono">
                {pad(s)}
            </span>
        </span>
    );
}

// Flash sale scroll LEFT -> RIGHT
const flashRef = React.createRef<HTMLDivElement>();
function handleFlashScroll(dir: 'left' | 'right') {
    if (!flashRef.current) return;
    const width = flashRef.current.offsetWidth;
    if (dir === 'right') {
        flashRef.current.scrollBy({ left: width / 2, behavior: 'smooth' });
    } else {
        flashRef.current.scrollBy({ left: -width / 2, behavior: 'smooth' });
    }
}
