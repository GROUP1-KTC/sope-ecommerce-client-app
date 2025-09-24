'use client';

import type { JSX } from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import { useGetShopIdQuery } from '~/features/shop/shopApi';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

type NavItem = {
    label: string;
    icon: JSX.Element;
    href?: string;
    children?: { label: string; href: string }[];
};

export default function MerchantSidebar() {
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
    const [activePath, setActivePath] = useState<string>('');

    const pathname = usePathname();
    const router = useRouter();

    const { data: shopId } = useGetShopIdQuery();

    const navItems: NavItem[] = useMemo(
        () => [
            {
                label: 'Thống Kê',
                icon: <DashboardOutlinedIcon className="h-5 w-5 mr-3" />,
                href: '/seller',
            },
            {
                label: 'Quản Lý Đơn Hàng',
                icon: <ShoppingCartOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'Tất cả đơn hàng', href: '/seller/all-order' },
                    { label: 'Đơn hàng mới', href: '/seller/confirm-order' },
                ],
            },
            {
                label: 'Quản Lý Voucher',
                icon: <DiscountOutlinedIcon className="h-5 w-5 mr-3" />,
                href: '/seller/vouchers',
            },
            {
                label: 'Quản Lý Sản Phẩm',
                icon: <Inventory2OutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'Tất cả sản phẩm', href: '/seller/all-products' },
                    { label: 'Thêm sản phẩm', href: '/seller/add-product' },
                ],
            },
            {
                label: 'Dịch Vụ Khách Hàng',
                icon: <RecommendOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    {
                        label: 'Quản Lý Chat',
                        href: '/seller/chat-management',
                    },
                    {
                        label: 'Quản Lý Đánh Giá',
                        href: '/seller/review-management',
                    },
                ],
            },
            {
                label: 'Quản Lý Tài Chính',
                icon: <PaymentsOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'Doanh Thu', href: '/seller/turnover' },
                    {
                        label: 'Số Dư Tài Khoản Sope',
                        href: '/seller/account-balance',
                    },
                    { label: 'Tài Khoản Ngân Hàng', href: '/seller/bank' },
                ],
            },
            {
                label: 'Quản Lý Cửa Hàng',
                icon: <StoreOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'Thông Tin Cửa Hàng', href: '/seller/profile' },
                    { label: 'Trang Trí Cửa Hàng', href: '#decoration' },
                ],
            },
            {
                label: 'Live Stream',
                icon: <LiveTvIcon className="h-5 w-5 mr-3" />,
                href: `/live/seller/${shopId}`,
            },

            {
                label: 'Về Sope',
                icon: <ShoppingCartCheckoutIcon className="h-5 w-5 mr-3" />,
                href: `/`,
            },
        ],
        [shopId],
    );

    useEffect(() => {
        setActivePath(pathname);
        navItems.forEach((item, index) => {
            if (item.children?.some((sub) => sub.href === pathname)) {
                setOpenItems((prev) => ({ ...prev, [index]: true }));
            }
        });
    }, [pathname, navItems]);

    const toggleItem = (index: number) => {
        setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const handleNavigate = (href?: string) => {
        if (!href) return;
        router.push(href); // ✅ Điều hướng client-side
    };

    return (
        <aside className="w-58 bg-white overflow-auto">
            <nav>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item.children ? (
                                <>
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full flex items-center justify-between py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-500 cursor-pointer"
                                    >
                                        <span className="flex items-center">
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </span>
                                        <span>
                                            {openItems[index] ? '▾' : '▸'}
                                        </span>
                                    </button>

                                    {openItems[index] && (
                                        <ul className="ml-8 mt-1">
                                            {item.children.map(
                                                (sub, subIndex) => (
                                                    <li key={subIndex}>
                                                        <button
                                                            onClick={() =>
                                                                handleNavigate(
                                                                    sub.href,
                                                                )
                                                            }
                                                            className={`block w-full text-left py-1 px-2 text-sm rounded-md cursor-pointer ${
                                                                activePath ===
                                                                sub.href
                                                                    ? 'text-red-500 bg-orange-100'
                                                                    : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {sub.label}
                                                        </button>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={() => handleNavigate(item.href)}
                                    className={`w-full flex items-center py-2 cursor-pointer px-3 rounded-md text-left ${
                                        activePath === item.href
                                            ? 'text-red-500 bg-orange-100'
                                            : 'text-gray-700 hover:text-red-500 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
