'use client';

import { useEffect, useState } from 'react';

type Filters = {
    status: string | null;
    shippingRateId: string | null;
    orderNumber: string;
};

const shippingProviders: Record<string, string> = {
    "MTJfMTdfMTU1OQ==": "GIAO HÀNG TIẾT KIỆM (tiết kiệm)",
    "MTNfN18xNjE4": "GIAO HÀNG NHANH (nhanh)",
    "MTFfN18xMTk1": "GIAO HÀNG TIẾT KIỆM (nhanh)",
};

export default function OrderFilters({
    filters,
    onFilterChange,
}: {
    filters: Filters;
    onFilterChange: (next: Filters) => void;
}) {
    const [local, setLocal] = useState<Filters>(filters);

    useEffect(() => {
        setLocal(filters);
    }, [filters]);

    function apply() {
        onFilterChange(local);
    }

    function reset() {
        const empty = { status: null, shippingRateId: null, orderNumber: '' };
        setLocal(empty);
        onFilterChange(empty);
    }

    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-3 items-start md:items-center mb-4">
            {/* Order Number */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Nhập Mã đơn hàng"
                    className="border rounded px-2 py-1 text-sm w-64"
                    value={local.orderNumber}
                    onChange={(e) =>
                        setLocal((s) => ({ ...s, orderNumber: e.target.value }))
                    }
                />
            </div>

            {/* Shipping Provider */}
            <div className="flex gap-2">
                <select
                    className="border rounded px-2 py-1 text-sm"
                    value={local.shippingRateId ?? ''}
                    onChange={(e) =>
                        setLocal((s) => ({
                            ...s,
                            shippingRateId: e.target.value || null,
                        }))
                    }
                >
                    <option value="">Đơn vị vận chuyển</option>
                    {Object.entries(shippingProviders).map(([id, label]) => (
                        <option key={id} value={id}>
                            {label}
                        </option>
                    ))}
                </select>

                <button
                    className="cursor-pointer bg-orange-500 text-white px-4 py-1 rounded text-sm"
                    onClick={apply}
                >
                    Áp dụng
                </button>
                <button className="cursor-pointer border px-4 py-1 rounded text-sm" onClick={reset}>
                    Đặt lại
                </button>
            </div>

            <div className="flex gap-2 md:ml-auto">
                <button className="cursor-pointer border px-4 py-1 rounded text-sm">Xuất</button>
                <button className="cursor-pointer border px-4 py-1 rounded text-sm">
                    Lịch sử Xuất Báo cáo
                </button>
            </div>
        </div>
    );
}
