'use client';

import { DateFilter } from '../common/DateFilter';

export default function FilterBar({}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 my-4 bg-white rounded shadow-md p-4 md:p-6">
            <div className="flex items-center gap-2">
                <DateFilter />
            </div>

            <div className="md:ml-auto flex items-center gap-2 w-full md:w-auto">
                <label className="flex flex-col md:flex-row md:items-center gap-1 w-full md:w-auto">
                    <span className="text-sm font-medium">Loại đơn hàng:</span>
                    <select className="border rounded px-2 py-1 cursor-pointer w-full md:w-auto">
                        <option value="">Đơn hàng đã đặt</option>
                        <option value="">Đơn hàng đã thanh toán</option>
                    </select>
                </label>
            </div>
        </div>
    );
}
