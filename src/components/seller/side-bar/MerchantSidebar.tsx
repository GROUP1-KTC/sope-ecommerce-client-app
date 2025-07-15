'use client';

import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export default function MerchantSidebar() {
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
                { label: 'All', href: '#all-orders' },
                { label: 'Order Delivery', href: '#delivery' },
                {
                    label: 'Return/Refund or Cancellation Order',
                    href: '#return',
                },
                { label: 'Shipping Settings', href: '#shipping' },
            ],
        },
        {
            label: 'Product Management',
            icon: <Inventory2OutlinedIcon className="h-5 w-5 mr-3" />,
            children: [
                { label: 'All Products', href: '#products' },
                { label: 'Add Product', href: '#add-product' },
            ],
        },
        {
            label: 'Marketing Channel',
            icon: <LocalOfferIcon className="h-5 w-5 mr-3" />,
            children: [
                { label: 'Marketing Channel', href: '#marketing' },
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
                                <span>{openItems[index] ? '▾' : '▸'}</span>
                            </button>

                            {/* Children */}
                            {item.children && openItems[index] && (
                                <ul className="ml-8 mt-1">
                                    {item.children.map((sub, subIndex) => (
                                        <li key={subIndex}>
                                            <a
                                                href={sub.href}
                                                onClick={() =>
                                                    setActivePath(sub.href)
                                                }
                                                className={`block py-1 px-2 text-sm rounded-md ${
                                                    activePath === sub.href
                                                        ? 'text-blue-500 bg-orange-100'
                                                        : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                                                }`}
                                            >
                                                {sub.label}
                                            </a>
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
