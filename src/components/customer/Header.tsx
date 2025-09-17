'use client';

import { SearchIcon } from 'lucide-react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HelpIcon from '@mui/icons-material/Help';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// loi tookit
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import UserMenu from './Home/UserMenu';
import HeaderCartIconWithBadge from './HeaderCartIconWithBadge';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSearchSuggestQuery, useLogProductClickMutation } from '~/features/products/elasticApi';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '~/hooks/useTypes';
import { loadAuthUser } from '~/utils/authCookie';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const roles = loadAuthUser()?.roles || [];

    const isSeller = roles.includes('SELLER');

    const { data: products = [] } = useSearchSuggestQuery(
        searchTerm
            ? {
                _source: ['product_id', 'slug', 'name', 'default_image'],
                query: {
                    function_score: {
                        query: {
                            bool: {
                                should: [
                                    {
                                        match_phrase: {
                                            name: {
                                                query: searchTerm,
                                                boost: 5,
                                            },
                                        },
                                    },
                                    {
                                        match_phrase_prefix: {
                                            name: {
                                                query: searchTerm,
                                                boost: 4,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            name: {
                                                query: searchTerm,
                                                fuzziness: 'AUTO',
                                                boost: 2,
                                            },
                                        },
                                    },
                                    {
                                        match: {
                                            slug: {
                                                query: searchTerm,
                                                boost: 1,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                        boost_mode: 'sum',
                    },
                },
                size: 20,
                sort: [{ _score: 'desc' }],
            }
            : skipToken,
    );

    const [logClick] = useLogProductClickMutation();

    const handleClickProduct = (productId: string, keyword: string) => {
        console.log('check productId', productId)
        logClick({
            product_id: productId,
            keyword,
            timestamp: new Date().toISOString(),
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const trimmed = inputValue.trim();
            setSearchTerm(trimmed);
        }, 800);
        return () => clearTimeout(timeout);
    }, [inputValue]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmed = inputValue.trim();
            if (trimmed) {
                if (products.length > 0) {
                    router.push(`/search/${encodeURIComponent(trimmed)}`);
                } else {
                    setIsFocused(true);
                }
            }
        }
    };

    const handleSearch = () => {
        const trimmed = inputValue.trim();
        if (trimmed) {
            if (products.length > 0) {
                router.push(`/search/${encodeURIComponent(trimmed)}`);
            } else {
                setIsFocused(true);
            }
        }
    };

    return (
        <header className="relative bg-[#d0001a] text-white w-full z-50">
            {/* Top bar - only show on desktop */}
            <div className="hidden sm:flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-20 lg:px-40 py-1 text-xs sm:text-sm">
                <div className="flex gap-3 items-center">
                    <Link
                        href={isSeller ? '/seller' : '/create-shop'}
                        className="hover:text-yellow-200 transition"
                    >
                        {isSeller
                            ? 'Trang Bán Hàng'
                            : 'Trở thành Người bán Sope'}
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

                <div className="flex-1 mx-2 flex items-center relative">
                    <div className="flex-1 relative">
                        <input
                            value={inputValue}
                            onFocus={() => setIsFocused(true)}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={() =>
                                setTimeout(() => setIsFocused(false), 200)
                            }
                            className="w-full px-4 py-2 text-gray-800 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-300"
                            placeholder="Tìm kiếm trong Sope"
                            type="text"
                        />

                        {isFocused && inputValue && searchTerm && (
                            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 max-h-80 overflow-y-auto">
                                {products.length > 0 ? (
                                    products.map((p, index) => (
                                        <Link
                                            key={p.product_id || index}
                                            href={`/product-detail/${p.slug}`}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleClickProduct(p.product_id, searchTerm)}
                                        >
                                            <Image
                                                src={p.default_image}
                                                alt={p.name}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            <span className="text-sm text-gray-800">
                                                {p.name}
                                            </span>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-2 text-sm text-gray-500">
                                        Không có sản phẩm tương tự
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSearch}
                        className="bg-white px-4 py-2 rounded-r-md hover:bg-gray-100 transition-colors"
                    >
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
                    href={isSeller ? '/seller' : 'create-shop'}
                    className="hover:text-yellow-200 transition"
                >
                    {isSeller ? 'Trang Bán Hàng' : 'Trở thành Người bán Sope'}
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
