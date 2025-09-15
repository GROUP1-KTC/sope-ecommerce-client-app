'use client';

import '~/app/globals.css';
import React, { useState } from 'react';

import SettingSidebar from '~/components/seller/common/RightSettingSidebar';
import { usePathname } from 'next/navigation';
import SellerHeaderHome from '~/components/seller/common/SellerHeaderHome';
import MerchantSidebar from '~/components/seller/common/MerchantSidebar';

export default function SellerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const isAddProductPage = pathname?.includes('/seller/add-product');
    const isEidtProductPage = pathname?.includes('/seller/edit-product');
    const isOrderDetail = pathname?.includes('/seller/orders');
    const [showLeftSidebar, setShowLeftSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);

    if (isAddProductPage || isEidtProductPage || isOrderDetail) {
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
                <aside>
                    <MerchantSidebar />
                </aside>

                <main className="flex-1 p-2  overflow-y-auto">
                    {children}
                </main>

                <aside>
                    <SettingSidebar />
                </aside>
            </div>
        </div>
    );
}