'use client';
import React, { useState } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const CoinTracker = () => {
    const [coinHistory] = useState([
        {
            id: 1,
            content: 'lorem ipsum dolor sit amet',
            date: '21-07-2025 09:55',
            amount: 100,
            status: 'received',
        },
        {
            id: 2,
            content: 'lorem ipsum dolor sit amet',
            date: '19-07-2025 10:00',
            amount: 100,
            status: 'used',
        },
        {
            id: 3,
            content: 'dailyCheckIn',
            date: '17-07-2025 19:01',
            amount: 100,
            status: 'received',
        },
        {
            id: 4,
            content: 'productReview',
            date: '17-07-2025 19:01',
            amount: 100,
            status: 'received',
        },
    ]);
    const [filter, setFilter] = useState('all');

    const filters = [
        { key: 'all', label: 'Tất cả lịch sử' },
        { key: 'received', label: 'Đã nhận' },
        { key: 'used', label: 'Đã sử dụng' },
    ];

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    const filteredHistory = coinHistory.filter(
        (item) => filter === 'all' || item.status === filter,
    );

    return (
        <div className=" mx-auto my-6  p-6 bg-white  rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-yellow-300 rounded-xl bg-yellow-50 shadow-sm mb-6">
                <div className="flex items-start md:items-center gap-3">
                    <MonetizationOnIcon
                        fontSize="large"
                        className="text-yellow-500 mt-1"
                    />
                    <h2 className="text-lg md:text-xl font-semibold text-yellow-700 leading-snug">
                        <span className="font-bold">600 Sope Xu</span> sẽ hết
                        hạn vào <span className="underline">31-08-2025</span>
                    </h2>
                </div>
                <button className="text-sm md:text-base px-4 py-2 cursor-pointer border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition duration-200">
                    Nhận thêm Xu!
                </button>
            </div>
            <div className="mb-6">
                <div className="md:hidden">
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="all">Tất cả lịch sử</option>
                        <option value="dailyCheckIn">Đăng nhập mỗi ngày</option>
                        <option value="productReview">Đánh giá sản phẩm</option>
                    </select>
                </div>
                <div className="hidden md:flex space-x-4">
                    {filters.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`px-4 py-2 cursor-pointer rounded-lg ${filter === key ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                {filteredHistory.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow sm:space-x-4"
                    >
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0 w-full sm:w-auto">
                            {item.status === 'used' ? (
                                <MonetizationOnIcon
                                    className="text-[#C0C0C0]"
                                    fontSize="large"
                                />
                            ) : (
                                <MonetizationOnIcon
                                    className="text-yellow-500"
                                    fontSize="large"
                                />
                            )}
                            <div className="flex-1">
                                <p className="font-semibold">{item.content}</p>
                                <p className="text-sm text-gray-500">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`${item.status === 'used' ? `text-black` : 'text-green-600'} font-bold text-xl sm:text-2xl`}
                        >
                            {item.status === 'used' ? '-' : '+'}
                            {item.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoinTracker;
