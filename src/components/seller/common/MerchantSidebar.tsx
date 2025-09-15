'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

export default function MerchantSidebar() {
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
    const [activePath, setActivePath] = useState<string>('');

    const pathname = usePathname();

    const navItems = useMemo(
        () => [
            {
                label: 'Order Management',
                icon: <ShoppingCartOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'All Order', href: '/seller/all-order' },
                    { label: 'New Order', href: '/seller/confirm-order' },
                ],
            },
            {
                label: 'Voucher Management',
                icon: <DiscountOutlinedIcon className="h-5 w-5 mr-3" />,
                href: '/seller/vouchers',
            },
            {
                label: 'Product Management',
                icon: <Inventory2OutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'All Products', href: '/seller/all-products' },
                    { label: 'Add Product', href: '/seller/add-product' },
                ],
            },
            {
                label: 'Marketing Channel',
                icon: <LocalOfferIcon className="h-5 w-5 mr-3" />,
                children: [
                    {
                        label: 'Marketing Channel',
                        href: '/seller/marketing-channel',
                    },
                    { label: 'Shop Promotions', href: '#promotions' },
                    { label: 'Shop Flash Sale', href: '#flash-sale' },
                    { label: 'Shop Discount Code', href: '#discount' },
                ],
            },
            {
                label: 'Customer Service',
                icon: <RecommendOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    {
                        label: 'Chat Management',
                        href: '/seller/chat-management',
                    },
                    {
                        label: 'Review Management',
                        href: '/seller/review-management',
                    },
                ],
            },
            {
                label: 'Financial',
                icon: <PaymentsOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'Revenue', href: '/seller/turnover' },
                    {
                        label: 'Sope Account Balance',
                        href: '/seller/account-balance',
                    },
                    { label: 'Bank Account', href: '/seller/bank' },
                ],
            },
            {
                label: 'Shop Management',
                icon: <StoreOutlinedIcon className="h-5 w-5 mr-3" />,
                children: [
                    { label: 'Shop Profile', href: '/seller/profile' },
                    { label: 'Shop Decoration', href: '#decoration' },
                ],
            },
        ],
        [],
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

    return (
        <aside className="w-58 bg-white border-r border-gray-200 overflow-auto">
            <nav>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item.children ? (
                                <>
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full flex items-center justify-between py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-500"
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
                                                        <a
                                                            href={sub.href}
                                                            className={`block py-1 px-2 text-sm rounded-md ${
                                                                activePath ===
                                                                sub.href
                                                                    ? 'text-red-500 bg-orange-100'
                                                                    : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {sub.label}
                                                        </a>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <a
                                    href={item.href}
                                    className={`w-full flex items-center py-2 px-3 rounded-md ${
                                        activePath === item.href
                                            ? 'text-red-500 bg-orange-100'
                                            : 'text-gray-700 hover:text-red-500 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
