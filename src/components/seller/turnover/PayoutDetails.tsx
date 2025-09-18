'use client';

import { useState } from 'react';
import TablePay from './TablePay';
import TableNotPaid from './TableNotPaid';
import { DateFilter } from '../common/DateFilter';
import type { OrderGroupShop } from '~/types/orders/order';

export default function PayoutDetails({
    orders = [],
}: {
    orders?: OrderGroupShop[];
}) {
    const [activeTab, setActiveTab] = useState<
        'Đã thanh toán' | 'Chưa thanh toán'
    >('Đã thanh toán');

    const paidOrders = orders.filter((o) => o.order.status === 'DELIVERED');
    const unpaidOrders = orders.filter((o) => o.order.status === 'CONFIRMED');

    const renderTable = () =>
        activeTab === 'Đã thanh toán' ? (
            <TablePay orders={paidOrders} />
        ) : (
            <TableNotPaid orders={unpaidOrders} />
        );

    return (
        <div className="space-y-4">
            <div className="text-lg font-semibold">Chi Tiết</div>

            <div className="flex border-b border-gray-300 pb-2 text-sm font-medium">
                {['Chưa thanh toán', 'Đã thanh toán'].map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-1 cursor-pointer ${
                            tab === activeTab
                                ? 'border-b-2 border-red-500 text-red-500'
                                : 'text-gray-500'
                        }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded text-sm">
                    <DateFilter
                        onDateChange={(range) =>
                            console.log('Selected range:', range)
                        }
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn hàng"
                        className="border rounded px-4 py-2 w-full md:w-64 text-sm border-gray-300 "
                    />
                    <button className="px-4 py-2 bg-gray-100 rounded text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer">
                        Xuất
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded">
                {renderTable()}
            </div>
        </div>
    );
}
