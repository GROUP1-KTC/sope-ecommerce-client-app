'use client';

import '~/app/globals.css';
import React, { useState } from 'react';

import SettingSidebar from '~/components/seller/common/RightSettingSidebar';
import { usePathname } from 'next/navigation';
import SellerHeaderHome from '~/components/seller/common/SellerHeaderHome';
import MerchantSidebar from '~/components/seller/common/MerchantSidebar';

export default function SellerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [headerTitle, setHeaderTitle] = useState('');
    const pathname = usePathname();
    const isAddProductPage = pathname?.includes('/seller/add-product');

    if (isAddProductPage) {
        return (
            <>
                <SellerHeaderHome headerTitle={headerTitle} />
                <main className="flex-1 bg-[#fafbfc] p-6 overflow-y-auto">
                    {children}
                </main>
            </>
        );
    }

    return (
        <>
            <SellerHeaderHome headerTitle={headerTitle} />
            <div className="flex h-[calc(100vh-60px)]">
                <aside className="w-60 min-w-[200px] bg-white border-r border-gray-200">
                    <MerchantSidebar setHeaderTitle={setHeaderTitle} />
                </aside>
                <main className="flex-1 bg-[#fafbfc] p-6 overflow-y-auto">
                    {children}
                </main>
                <aside className="w-20 min-w-[60px] bg-white border-l border-gray-200">
                    <SettingSidebar />
                </aside>
            </div>
        </>
    );
}
