'use client';

import React from 'react';

const TABS = [
    { label: 'Tất cả' },
    { label: 'Chờ xác nhận' },
    { label: 'Chờ lấy hàng' },
    { label: 'Đang giao', count: 8 },
    { label: 'Đã giao' },
    { label: 'Trả hàng/Hoàn tiền/Hủy', count: 1 },
];

export default function OrderTabs({
    activeTab,
    onChange,
}: {
    activeTab: number;
    onChange: (index: number) => void;
}) {
    return (
        <div className="flex flex-wrap gap-4 border-b mb-6 text-sm">
            {TABS.map((tab, index) => (
                <button
                    key={tab.label}
                    onClick={() => onChange(index)}
                    className={`pb-2 border-b-2 font-medium transition-colors cursor-pointer ${
                        activeTab === index
                            ? 'border-orange-500 text-orange-500'
                            : 'border-transparent text-gray-700 hover:text-orange-500'
                    }`}
                >
                    {tab.label}
                    {tab.count && <span className="ml-1">({tab.count})</span>}
                </button>
            ))}
        </div>
    );
}
