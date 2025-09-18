'use client';

const TABS = [
    { label: 'Tất cả', status: null, key: 'ALL' },
    { label: 'Chờ xác nhận', status: 'PENDING', key: 'PENDING' },
    { label: 'Chờ lấy hàng', status: 'CONFIRMED', key: 'CONFIRMED' },
    { label: 'Đã giao', status: 'DELIVERED', key: 'DELIVERED' },
    { label: 'Đã hủy đơn', status: 'CANCELLED', key: 'CANCELLED' },
];

export default function OrderTabs({
    activeTab,
    onChange,
    counts,
}: {
    activeTab: number;
    onChange: (index: number, status: string | null) => void;
    counts: Record<string, number>;
}) {
    return (
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {TABS.map((tab, index) => (
                <button
                    key={tab.label}
                    onClick={() => onChange(index, tab.status)}
                    className={`pb-2 border-b-2 font-medium transition-colors cursor-pointer ${activeTab === index
                        ? 'border-red-500 text-red-500'
                        : 'border-transparent text-gray-700 hover:text-red-500 hover:border-red-500'
                        }`}
                >
                    {tab.label}
                    {counts[tab.key] ? ` (${counts[tab.key]})` : ''}
                </button>
            ))}
        </div>
    );
}
