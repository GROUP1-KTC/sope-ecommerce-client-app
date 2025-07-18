'use client';
import { useState } from 'react';

type FilterBarProps = {
    onShippingUnitChange: (unit: string) => void;
};

export default function FilterBar({ onShippingUnitChange }: FilterBarProps) {
    const [selectedFilter, setSelectedFilter] = useState('Order Code');
    const [shippingUnit, setShippingUnit] = useState('All');

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(e.target.value);
    };

    const handleShippingUnitChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = e.target.value;
        setShippingUnit(value);
        onShippingUnitChange(value);
    };

    return (
        <div className="flex gap-2 my-4">
            <select
                className="border rounded px-2 py-1"
                value={selectedFilter}
                onChange={handleFilterChange}
            >
                <option value="Order Code">Order Code</option>
                <option value="Product">Product</option>
                <option value="Buyer's Name">Buyer Name</option>
                <option value="Bill of Lading Code">Bill of Lading Code</option>
            </select>

            {selectedFilter === 'Order Code' && (
                <input
                    className="border rounded px-2 py-1 w-60"
                    placeholder="Enter order ID"
                />
            )}
            {selectedFilter === 'Product' && (
                <input
                    className="border rounded px-2 py-1 w-60"
                    placeholder="Enter the Product Name/SKU/SKU Classification"
                />
            )}
            {selectedFilter === "Buyer's Name" && (
                <input
                    className="border rounded px-2 py-1 w-60"
                    placeholder="Enter the Buyer's Name"
                />
            )}
            {selectedFilter === 'Bill of Lading Code' && (
                <input
                    className="border rounded px-2 py-1 w-60"
                    placeholder="Enter the Bill of Lading Code"
                />
            )}

            <div className="ml-auto flex gap-2">
                <label className="flex items-center gap-2">
                    Shipping Units:
                    <select
                        className="border rounded px-2 py-1"
                        value={shippingUnit}
                        onChange={handleShippingUnitChange}
                    >
                        <option value="All">All</option>
                        <option value="aaaaaaaaaaaaa">aaaaaaaaaaaaa</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                    </select>
                </label>

                <button className="border px-4 py-1 bg-gray-100 rounded hover:bg-gray-200 text-red-500 border-red-500">
                    Apply
                </button>
                <button className="border px-4 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-600">
                    Reset
                </button>
            </div>
        </div>
    );
}
