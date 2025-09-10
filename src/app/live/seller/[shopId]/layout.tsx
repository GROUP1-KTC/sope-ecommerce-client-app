'use client';

import React from 'react';

export default function SellerLiveLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen w-screen bg-white overflow-hidden">
            {/* Phần children sẽ full màn hình */}
            {children}
        </div>
    );
}
