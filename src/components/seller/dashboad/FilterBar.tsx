'use client';

import { useState } from 'react';
import { DateFilter } from '../common/DateFilter';

interface FilterBarProps {
    onFilterChange?: (filters: {
        dateRange: { from: Date; to: Date };
        orderType: string;
    }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: new Date(),
        to: new Date(),
    });
    const [orderType, setOrderType] = useState<string>('ALL');

    const handleDateChange = (range: { from: Date; to: Date }) => {
        setDateRange(range);
        onFilterChange?.({ dateRange: range, orderType });
    };

    const handleOrderTypeChange = (value: string) => {
        setOrderType(value);
        onFilterChange?.({ dateRange, orderType: value });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 my-4 bg-white rounded shadow-md p-4 md:p-6">
            <div className="flex items-center gap-2">
                <DateFilter onDateChange={handleDateChange} />
            </div>

            <div className="md:ml-auto flex items-center gap-2 w-full md:w-auto">
                <label className="flex flex-col md:flex-row md:items-center gap-1 w-full md:w-auto">
                    <span className="text-sm font-medium">Loại đơn hàng:</span>
                    <select
                        value={orderType}
                        onChange={(e) => handleOrderTypeChange(e.target.value)}
                        className="border rounded px-2 py-1 cursor-pointer w-full md:w-auto"
                    >
                        <option value="ALL">Tất cả đơn</option>
                        <option value="PLACED">Đơn hàng đã đặt</option>
                        <option value="PAID">Đơn hàng đã thanh toán</option>
                    </select>
                </label>
            </div>
        </div>
    );
}
