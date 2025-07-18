// components/seller/turnover/TransactionFilters.tsx
'use client';
import React, { useState } from 'react';
import { DateFilter } from '../common/DateFilter';

export default function TransactionFilters() {
    const [cashFlow, setCashFlow] = useState('all');

    return (
        <div className="flex flex-col gap-4">
            <div className="mb-6">
                <span className="block text-base font-semibold text-gray-800 mb-2">
                    Thời gian phát sinh giao dịch
                </span>
                <div className="flex items-center gap-2">
                    <DateFilter onDateChange={(range) => console.log(range)} />
                </div>
            </div>
            <div className="mb-6">
                <span className="block text-base font-semibold text-gray-800 mb-2">
                    Dòng tiền
                </span>
                <div className="flex gap-2">
                    {[
                        { label: 'Tất cả', value: 'all' },
                        { label: 'Tiền vào', value: 'in' },
                        { label: 'Tiền ra', value: 'out' },
                    ].map((item) => (
                        <button
                            key={item.value}
                            onClick={() => setCashFlow(item.value)}
                            className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                                cashFlow === item.value
                                    ? 'bg-blue-100 border-blue-400 text-blue-700 font-medium'
                                    : 'text-gray-600 hover:border-gray-400 hover:text-gray-800'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <span className="block text-base font-semibold text-gray-800 mb-3">
                    Loại giao dịch
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                    {[
                        'Doanh Thu Đơn Hàng',
                        'Điều chỉnh',
                        'Cấn trừ Số dư TK Sope',
                        'Giá trị hoàn được ghi nhận',
                        'Rút Tiền',
                    ].map((label) => (
                        <label
                            key={label}
                            className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900" // Thêm cursor và hover
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600 rounded"
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 justify-end">
                <button className="border rounded px-4 py-2 text-sm text-gray-700">
                    Thiết lập lại
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 text-sm">
                    Áp dụng
                </button>
            </div>
        </div>
    );
}
