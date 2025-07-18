'use client';

import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Link from 'next/link';

export default function MerchantSidebar({ setHeaderTitle }: { setHeaderTitle: (title: string) => void }) {
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
    const [activePath, setActivePath] = useState<string>('');

    const toggleItem = (index: number) => {
        setOpenItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const navItems = [
        {
            label: 'Order Management',
            icon: <ShoppingCartOutlinedIcon className="h-5 w-5 mr-3" />,
            children: [
                { label: 'All Order', href: '/seller/all-order' },
                { label: 'Order Delivery', href: '/seller/order-delivery' },
                {
                    label: 'Return/Refund or Cancellation Order',
                    href: '/seller/return-refund',
                },
                { label: 'Shipping Settings', href: '/seller/shipping-settings' },
            ],
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
                { label: 'Marketing Channel', href: '/seller/marketing-channel' },
                { label: 'Sope Advertising', href: '#ads' },
                { label: 'Live & Video', href: '#live' },
                { label: 'Shop Promotions', href: '#promotions' },
                { label: 'Shop Flash Sale', href: '#flash-sale' },
                { label: 'Shop Discount Code', href: '#discount' },
                { label: 'Sope Program', href: '#program' },
            ],
        },
        {
            label: 'Customer Service',
            icon: <RecommendOutlinedIcon className="h-5 w-5 mr-3" />,
            children: [
                { label: 'Chat Management', href: '#chat' },
                { label: 'Review Management', href: '#review' },
            ],
        },
        {
            label: 'Financial',
            icon: <PaymentsOutlinedIcon className="h-5 w-5 mr-3" />,
            children: [
                { label: 'Revenue', href: '#revenue' },
                { label: 'Sope Account Balance', href: '#balance' },
                { label: 'Bank Account', href: '#bank' },
            ],
        },
        {
            label: 'Data Analysis',
            icon: <QueryStatsIcon className="h-5 w-5 mr-3" />,
            children: [
                { label: 'Sales Analysis', href: '#sales' },
                { label: 'Operational Efficiency', href: '#efficiency' },
            ],
        },
        {
            label: 'Shop Management',
            icon: <StoreOutlinedIcon className="h-5 w-5 mr-3" />,
            children: [
                { label: 'Shop Profile', href: '#profile' },
                { label: 'Shop Decoration', href: '#decoration' },
                { label: 'Shop Setup', href: '#setup' },
            ],
        },
    ];

    return (
        <aside className="w-64 bg-white p-4 border-r border-gray-200 overflow-auto">
            <nav>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            {/* Toggle group */}
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full flex items-center justify-between py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                            >
                                <span className="flex items-center">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </span>
                                <span className='text-2xl' >{openItems[index] ? '▾' : '▸'}</span>
                            </button>

                            {/* Children */}
                            {item.children && openItems[index] && (
                                <ul className="ml-8 mt-1">
                                    {item.children.map((sub, subIndex) => (
                                        <li key={subIndex}>
                                            {sub.href.startsWith('/') ? (
                                                <Link
                                                    href={sub.href}
                                                    onClick={() => {
                                                        setActivePath(sub.href);
                                                        setHeaderTitle(sub.label);
                                                    }}
                                                    className={`block py-1 px-2 text-sm rounded-md ${activePath === sub.href
                                                        ? 'text-blue-500 bg-orange-100'
                                                        : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {sub.label}
                                                </Link>
                                            ) : (
                                                <a
                                                    href={sub.href}
                                                    onClick={() => {
                                                        setActivePath(sub.href);
                                                        setHeaderTitle(sub.label);
                                                    }}
                                                    className={`block py-1 px-2 text-sm rounded-md ${activePath === sub.href
                                                        ? 'text-blue-500 bg-orange-100'
                                                        : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {sub.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
