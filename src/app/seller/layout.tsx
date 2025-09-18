'use client';

import '~/app/globals.css';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import SellerHeaderHome from '~/components/seller/common/SellerHeaderHome';
import MerchantSidebar from '~/components/seller/common/MerchantSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function SellerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const isAddProductPage = pathname?.includes('/seller/add-product');
    const isEditProductPage = pathname?.includes('/seller/edit-product');
    const isOrderDetail = pathname?.includes('/seller/orders');

    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (isAddProductPage || isEditProductPage || isOrderDetail) {
        return (
            <>
                <div className="fixed top-0 left-0 w-full z-50">
                    <SellerHeaderHome />
                </div>
                <main className="flex-1 bg-[#fafbfc] p-4 overflow-y-auto">
                    {children}
                </main>
            </>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <SellerHeaderHome />

            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block p-2 bg-white border-r border-gray-200 overflow-y-auto">
                    <MerchantSidebar />
                </aside>

                <div className="md:hidden flex items-start p-2">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                        <MenuIcon />
                    </button>
                </div>

                <div
                    className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 md:hidden ${
                        sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                />

                <div
                    className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 md:hidden ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex justify-end p-2">
                        <button onClick={() => setSidebarOpen(false)} className="p-2">
                            <CloseIcon />
                        </button>
                    </div>
                    <MerchantSidebar />
                </div>

                <main className="flex-1 p-2 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
