'use client';

import { SearchIcon } from 'lucide-react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from '@mui/icons-material/Groups';
import GetAppIcon from '@mui/icons-material/GetApp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HelpIcon from '@mui/icons-material/Help';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import UserMenu from './Home/UserMenu';
import HeaderCartIconWithBadge from './HeaderCartIconWithBadge';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="relative bg-[#d0001a] text-white w-full z-50">
            {/* Top bar - only show on desktop */}
            <div className="hidden sm:flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-20 lg:px-40 py-1 text-xs sm:text-sm">
                <div className="flex gap-3 items-center">
                    <Link href="#" className="hover:text-yellow-200 transition">
                        Trở thành Người bán Sope
                    </Link>
                    <span>|</span>
                    <Link href="#" className="hover:text-yellow-200 transition">
                        Tải ứng dụng
                    </Link>
                    <span>|</span>
                    <span>Kết nối</span>
                    <Link href="#" className="hover:text-yellow-200 transition">
                        <FacebookIcon style={{ fontSize: 20 }} />
                    </Link>
                    <Link href="#" className="hover:text-yellow-200 transition">
                        <InstagramIcon style={{ fontSize: 20 }} />
                    </Link>
                </div>
                <div className="flex gap-3 items-center">
                    <span className="flex items-center gap-1">
                        <NotificationsActiveIcon style={{ fontSize: 18 }} />
                        <Link
                            href="/notification"
                            className="hover:text-gray-400 transition"
                        >
                            Thông báo
                        </Link>
                    </span>
                    <span className="h-4 w-px bg-white" />
                    <span className="flex items-center gap-1">
                        <HelpIcon style={{ fontSize: 18 }} />
                        Hỗ Trợ
                    </span>
                    <span className="h-4 w-px bg-white" />
                    <span className="flex items-center gap-1">
                        <LanguageIcon style={{ fontSize: 18 }} />
                        Tiếng Việt
                    </span>
                    <span className="h-4 w-px bg-white" />
                    <UserMenu />
                </div>
            </div>

            {/* Main bar - always show */}
            <div className="flex items-center px-4 sm:px-8 md:px-20 lg:px-40 py-2 gap-4 justify-between">
                {/* Logo & Menu */}
                <div className="flex items-center gap-2">
                    <StorefrontIcon
                        style={{ fontSize: 40 }}
                        className="text-white"
                    />
                    <Link href="/" className="hover:text-yellow-200 transition">
                        <Image
                            src="/assets/logo/logo.svg"
                            alt="Sope Logo"
                            width={220}
                            height={94}
                            className="h-12 sm:h-16 w-auto"
                        />
                    </Link>
                </div>
                {/* Search bar */}
                <div className="flex-1 mx-2 flex items-center">
                    <input
                        className="w-full px-4 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-300"
                        placeholder="Tìm kiếm trong Sope"
                        type="text"
                    />
                    <button className="bg-white px-4 py-2 rounded-r-md hover:bg-gray-100 transition-colors">
                        <SearchIcon className="text-[#d0001a]" />
                    </button>
                </div>
                {/* Cart + Hamburger */}
                <HeaderCartIconWithBadge
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />
            </div>

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 sm:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Overlay làm mờ nền khi menu mở */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-[300px] bg-[#d0001a] text-white z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    } sm:hidden flex flex-col p-5 gap-3 rounded-l-xl shadow-lg`}
            >
                <div className="flex justify-end">
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-white text-2xl hover:text-yellow-200 transition cursor-pointer"
                        aria-label="Close menu"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <Link
                    href="#"
                    className="hover:bg-white/10 rounded px-2 py-1 transition flex items-center gap-2"
                >
                    <Image
                        src="/assets/logo/logo.svg"
                        alt="Sope Logo"
                        width={24}
                        height={24}
                        className="h-6 w-auto"
                    />
                    Trang chủ Sope
                </Link>
                <Link
                    href="#"
                    className="hover:bg-white/10 rounded px-2 py-1 transition"
                >
                    {' '}
                    <GroupsIcon className="mr-6" /> Trở thành Người bán
                </Link>
                <Link
                    href="#"
                    className="hover:bg-white/10 rounded px-2 py-1 transition"
                >
                    {' '}
                    <GetAppIcon className="mr-6" /> Tải ứng dụng
                </Link>

                <hr className="border-white/20 my-2" />

                {/* Nhóm 2 */}
                <Link
                    href="/notification"
                    className="hover:bg-white/10 rounded px-2 py-1 transition flex items-center gap-2"
                >
                    <NotificationsActiveIcon className="mr-6" /> Thông báo
                </Link>
                <div className="hover:bg-white/10 rounded px-2 py-1 transition cursor-pointer">
                    <HelpIcon className="mr-7" /> Hỗ trợ
                </div>
                <div className="hover:bg-white/10 rounded px-2 py-1 transition cursor-pointer">
                    <LanguageIcon className="mr-7" /> Tiếng Việt
                </div>

                <hr className="border-white/20 my-2" />

                {/* Nhóm 3 */}
                <Link
                    href="/login"
                    className="hover:bg-white/10 rounded px-2 py-1 transition"
                >
                    <AccountCircleIcon className="mr-6" /> Đăng Nhập
                </Link>

                <div className="flex gap-3 mt-auto pt-4">
                    <Link href="#">
                        <FacebookIcon fontSize="small" />
                    </Link>
                    <Link href="#">
                        <InstagramIcon fontSize="small" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
