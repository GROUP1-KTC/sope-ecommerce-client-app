'use client';

import { SearchIcon } from 'lucide-react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Badge from '@mui/material/Badge';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-[#d0001a] text-white w-full px-4 sm:px-8 md:px-20 lg:px-40 justify-between">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row justify-between items-center px-2 sm:px-8 py-2 text-xs sm:text-sm gap-2 md:gap-0">
                <div className="flex gap-2 sm:gap-3 items-center">
                    <Link href="#" className="hover:text-yellow-200 transition">
                        Trang chủ Sope
                    </Link>
                    <Link href="#" className="hover:text-yellow-200 transition">
                        Trở thành Người bán Sope
                    </Link>
                    <span className="">|</span>
                    <Link href="#" className="hover:text-yellow-200 transition">
                        Tải ứng dụng
                    </Link>
                    <span className="">|</span>
                    <span>Kết nối</span>
                    <Link href="#" className="hover:text-yellow-200 transition">
                        <FacebookIcon style={{ fontSize: 20 }} />
                    </Link>
                    <Link href="#" className="hover:text-yellow-200 transition">
                        <InstagramIcon style={{ fontSize: 20 }} />
                    </Link>
                </div>
                <div className="flex gap-2 sm:gap-3 items-center">
                    <span className="flex items-center gap-1 sm:flex">
                        <span>🔔</span>
                        <Link
                            href="/notification"
                            className="hover:text-yellow-200 transition"
                        >
                            Thông báo
                        </Link>
                    </span>
                    <span className="h-4 w-px bg-white" />
                    <span className="flex items-center gap-1 sm:flex">
                        <span>❓</span> Hỗ Trợ
                    </span>
                    <span className="h-4 w-px bg-white" />
                    <span className="flex items-center gap-1 sm:flex">
                        <span>🌐</span> Tiếng Việt
                    </span>
                    <span className="h-4 w-px bg-white" />
                    <Link
                        href="/login"
                        className="hover:text-yellow-200 transition"
                    >
                        Đăng Nhập
                    </Link>
                </div>
            </div>
            {/* Main bar */}
            <div className="flex items-center px-2 sm:px-8 py-2 sm:py-2 gap-2 sm:gap-8 flex-col sm:flex-row">
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
                    <Link
                        href="/"
                        className="hover:text-yellow-200 transition flex items-center gap-2"
                    >
                        <StorefrontIcon
                            style={{ fontSize: 40 }}
                            className="text-white"
                        />
                        <span className="h-8 w-px bg-white mx-2" />

                        <Image
                            src="/assets/logo/logo.svg"
                            alt="Sope Logo"
                            width={220}
                            height={94}
                            className="h-12 sm:h-16 w-auto"
                        />
                    </Link>
                    {/* Hamburger menu for mobile */}
                    <button
                        className="sm:hidden text-3xl hover:text-yellow-200 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>
                </div>
                <div>
                    <div className="hidden sm:block flex-1 min-w-[248px]" />
                </div>
                {/* Search bar */}
                <div className="flex-1 ml-auto flex border-blue-500 items-center w-full sm:w-auto mt-2 sm:mt-0 p-2">
                    <input
                        className="w-full px-2 sm:px-4 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tìm kiếm trong Sope"
                        type="text"
                    />
                    <button className="bg-white px-2 sm:px-4 py-2 bordwer rounded-r-md hover:bg-gray-100 hover:cursor-pointer transition-colors">
                        <SearchIcon className="text-[#d0001a]" />
                    </button>
                </div>
                {/* Cart icon */}

                <Link
                    href="/cart"
                    className="ml-0 sm:ml-4 mt-2 sm:mt-0 flex items-center hover:text-yellow-200 transition"
                >
                    <Badge
                        badgeContent={9}
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#ffff',
                                color: '#d0001a',
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <ShoppingCartOutlinedIcon style={{ fontSize: 36 }} />
                    </Badge>
                </Link>
            </div>
            {/* Mobile menu placeholder */}
            {menuOpen && (
                <div className="sm:hidden bg-[#ee4d2d] px-4 py-2 flex flex-col gap-2">
                    <Link
                        href="#"
                        className="hover:underline hover:text-yellow-200 transition"
                    >
                        Trở thành Người bán Sope
                    </Link>
                    <Link
                        href="#"
                        className="hover:underline hover:text-yellow-200 transition"
                    >
                        Tải ứng dụng
                    </Link>
                    <Link
                        href="/login"
                        className="hover:text-yellow-200 transition"
                    >
                        Đăng Nhập
                    </Link>
                    <Link
                        href="/cart"
                        className="hover:text-yellow-200 transition"
                    >
                        Giỏ hàng
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
