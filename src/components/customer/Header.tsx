'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-[#ee4d2d] text-white w-full px-4 sm:px-8 md:px-20 lg:px-40 justify-between">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row justify-between items-center px-2 sm:px-8 py-2 text-xs sm:text-sm gap-2 md:gap-0">
                <div className="flex gap-2 sm:gap-3 items-center">
                    <Link href="#" className="">
                        Trở thành Người bán Naver
                    </Link>
                    <span className="">|</span>
                    <Link href="#" className="">
                        Tải ứng dụng
                    </Link>
                    <span className="">|</span>
                    <span className="">Kết nối</span>
                </div>
                <div className="flex gap-2 sm:gap-3 items-center">
                    <span className="flex items-center gap-1 sm:flex">
                        <span>🔔</span>
                        <Link href="/notification" className="">
                            Thông báo
                        </Link>
                    </span>
                    <span className="flex items-center gap-1 sm:flex">
                        <span>❓</span> Hỗ Trợ
                    </span>
                    <span className="flex items-center gap-1 sm:flex">
                        <span>🌐</span> Tiếng Việt
                    </span>
                    <Link href="/login" className="">
                        Đăng Nhập
                    </Link>
                </div>
            </div>
            {/* Main bar */}
            <div className="flex items-center px-2 sm:px-8 py-2 sm:py-4 gap-2 sm:gap-8 flex-col sm:flex-row">
                {/* Logo and Hamburger */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl sm:text-4xl">🛍️</span>
                        <Link href="/">
                            <h1 className="text-2xl sm:text-5xl font-extrabold text-green-600">
                                NAVER
                            </h1>
                        </Link>
                    </div>
                    {/* Hamburger menu for mobile */}
                    <button
                        className="sm:hidden text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>
                </div>
                {/* Search bar */}
                <div className="flex-1 flex border-blue-500 items-center w-full sm:w-auto mt-2 sm:mt-0">
                    <input
                        className="w-full px-2 sm:px-4 py-2 text-white"
                        placeholder="Tìm trong Shopee Mall"
                        type="text"
                    />
                    <button className="bg-white px-2 sm:px-4 py-2">🔍</button>
                </div>
                {/* Cart icon */}
                <Link href="/cart" className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                    <span className="text-2xl sm:text-3xl">🛒</span>
                </Link>
            </div>
            {/* Mobile menu placeholder */}
            {menuOpen && (
                <div className="sm:hidden bg-[#ee4d2d] px-4 py-2 flex flex-col gap-2">
                    <Link href="#" className="hover:underline">
                        Trở thành Người bán Naver
                    </Link>
                    <Link href="#" className="hover:underline">
                        Tải ứng dụng
                    </Link>
                    <Link href="/login" className="">
                        Đăng Nhập
                    </Link>
                    <Link href="/cart" className="">
                        Giỏ hàng
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
