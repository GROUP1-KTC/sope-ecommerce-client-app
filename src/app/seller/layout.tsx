'use client';

import '~/app/globals.css';
import React, { useState } from 'react';

import SettingSidebar from '~/components/seller/common/RightSettingSidebar';
import { usePathname } from 'next/navigation';
import SellerHeaderHome from '~/components/seller/common/SellerHeaderHome';
import MerchantSidebar from '~/components/seller/common/MerchantSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function SellerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isAddProductPage = pathname?.includes('/seller/add-product');
    const [showLeftSidebar, setShowLeftSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);

    if (isAddProductPage) {
        return (
            <>
                <SellerHeaderHome />
                <main className="flex-1 bg-[#fafbfc] p-4 overflow-y-auto">
                    {children}
                </main>
            </>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <SellerHeaderHome />

            <div className="md:hidden flex justify-between px-4 py-2 bg-white border-b border-gray-200">
                <button
                    onClick={() => setShowLeftSidebar(!showLeftSidebar)}
                    className="text-gray-700"
                >
                    {showLeftSidebar ? <CloseIcon /> : <MenuIcon />}
                </button>
                <button
                    onClick={() => setShowRightSidebar(!showRightSidebar)}
                    className="text-gray-700"
                >
                    {showRightSidebar ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <aside
                    className={`
                        bg-white border-r border-gray-200
                        md:block md:w-60 md:min-w-[200px]
                        ${showLeftSidebar ? 'block' : 'hidden'}
                        w-60 absolute md:static z-20 h-full
                    `}
                >
                    <MerchantSidebar />
                </aside>

                <main className="flex-1 bg-[#fafbfc] p-4 overflow-y-auto">
                    {children}
                </main>

                <aside
                    className={`
                        bg-white border-l border-gray-200
                        md:block md:w-20 md:min-w-[60px]
                        ${showRightSidebar ? 'block' : 'hidden'}
                        w-20 absolute right-0 md:static z-20 h-full
                    `}
                >
                    <SettingSidebar />
                </aside>
            </div>
        </div>
    );
}
