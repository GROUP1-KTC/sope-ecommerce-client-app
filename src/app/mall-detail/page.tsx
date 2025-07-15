'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProductFromCategory from '../product/ProductFromCategory';

// Mock Data
const mall = {
    logo: '/globe.svg',
    name: 'Coolmate - Official Store',
    products: 646,
    followers: '1.7tr',
    following: 273,
    rating: 4.9,
    ratingCount: '921.7k',
    responseRate: '100%',
    joinYears: 8,
};

const vouchers = [
    {
        id: 1,
        title: 'Giảm ₫20k',
        desc: 'Đơn Tối Thiểu ₫99k',
        expiry: '31.07.2025',
    },
    {
        id: 2,
        title: 'Giảm 10%',
        desc: 'Đơn Tối Thiểu ₫250k Giảm tối đa ₫40k',
        expiry: '31.07.2025',
    },
    {
        id: 3,
        title: 'Giảm ₫30k',
        desc: 'Đơn Tối Thiểu ₫349k',
        expiry: '14.07.2025',
    },
    {
        id: 4,
        title: 'Giảm ₫50k',
        desc: 'Đơn Tối Thiểu ₫499k',
        expiry: '14.07.2025',
    },
    {
        id: 5,
        title: 'Giảm ₫20k',
        desc: 'Đơn Tối Thiểu ₫99k',
        expiry: '31.07.2025',
    },
    {
        id: 6,
        title: 'Giảm 10%',
        desc: 'Đơn Tối Thiểu ₫250k Giảm tối đa ₫40k',
        expiry: '31.07.2025',
    },
    {
        id: 7,
        title: 'Giảm ₫30k',
        desc: 'Đơn Tối Thiểu ₫349k',
        expiry: '14.07.2025',
    },
    {
        id: 8,
        title: 'Giảm ₫50k',
        desc: 'Đơn Tối Thiểu ₫499k',
        expiry: '14.07.2025',
    },
    {
        id: 9,
        title: 'Giảm ₫20k',
        desc: 'Đơn Tối Thiểu ₫99k',
        expiry: '31.07.2025',
    },
    {
        id: 11,
        title: 'Giảm 10%',
        desc: 'Đơn Tối Thiểu ₫250k Giảm tối đa ₫40k',
        expiry: '31.07.2025',
    },
    {
        id: 12,
        title: 'Giảm ₫30k',
        desc: 'Đơn Tối Thiểu ₫349k',
        expiry: '14.07.2025',
    },
    {
        id: 13,
        title: 'Giảm ₫50k',
        desc: 'Đơn Tối Thiểu ₫499k',
        expiry: '14.07.2025',
    },
    {
        id: 14,
        title: 'Giảm ₫20k',
        desc: 'Đơn Tối Thiểu ₫99k',
        expiry: '31.07.2025',
    },
    {
        id: 15,
        title: 'Giảm 10%',
        desc: 'Đơn Tối Thiểu ₫250k Giảm tối đa ₫40k',
        expiry: '31.07.2025',
    },
    {
        id: 16,
        title: 'Giảm ₫30k',
        desc: 'Đơn Tối Thiểu ₫349k',
        expiry: '14.07.2025',
    },
    {
        id: 17,
        title: 'Giảm ₫50k',
        desc: 'Đơn Tối Thiểu ₫499k',
        expiry: '14.07.2025',
    },
];

const products = [
    {
        id: 1,
        name: 'Áo thể thao nam Coolmate Basic',
        price: 99000,
        image: '/next.svg',
        rating: 4.9,
        sold: '118,4k',
    },
    {
        id: 2,
        name: 'Quần thể thao nam 7inch Ultra Short',
        price: 169000,
        image: '/next.svg',
        rating: 4.9,
        sold: '121,6k',
    },
    {
        id: 3,
        name: 'Áo Polo thể thao nam ProMax S1 Logo Coolmate',
        price: 199000,
        image: '/next.svg',
        rating: 4.9,
        sold: '121,6k',
    },
    {
        id: 4,
        name: 'Combo 3 quần lót nam dáng Trunk Bamboo',
        price: 205000,
        image: '/next.svg',
        rating: 4.9,
        sold: '353,3k',
    },
    {
        id: 5,
        name: 'Set đồ bộ thể thao nam Áo Polo Promax S1',
        price: 349000,
        image: '/next.svg',
        rating: 4.9,
        sold: '3,6k',
    },
    {
        id: 6,
        name: 'Áo Polo thể thao nam Promax Sidefun',
        price: 209000,
        image: '/next.svg',
        rating: 4.9,
        sold: '121,9k',
    },
    {
        id: 7,
        name: 'Set đồ bộ thể thao nam Áo Polo Promax S1',
        price: 349000,
        image: '/next.svg',
        rating: 4.9,
        sold: '3,6k',
    },
    {
        id: 8,
        name: 'Áo Polo thể thao nam Promax Sidefun',
        price: 209000,
        image: '/next.svg',
        rating: 4.9,
        sold: '121,9k',
    },
    {
        id: 9,
        name: 'Set đồ bộ thể thao nam Áo Polo Promax S1',
        price: 349000,
        image: '/next.svg',
        rating: 4.9,
        sold: '3,6k',
    },
    {
        id: 10,
        name: 'Áo Polo thể thao nam Promax Sidefun',
        price: 209000,
        image: '/next.svg',
        rating: 4.9,
        sold: '121,9k',
    },
];

const tabs = [
    'Dạo',
    'Sản phẩm',
    'Sản phẩm mới',
    'Combo - Set đồ giá tốt',
    'Đồ thể thao nữ',
    'Đồ thể thao nam',
    'Đồ lót mặc nhà',
    'Đồ hằng ngày',
    'Dự án xã hội',
    'Sự kiện',
    'Phụ kiện',
];

const MallDetail = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="ml-10 bg-gray-50 min-h-screen align-item justify-between pb-10">
            {/* Mall Header */}
            <div className="bg-white shadow p-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <img
                    src={mall.logo}
                    alt="Mall Logo"
                    className="w-24 h-24 rounded-full object-contain border"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{mall.name}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                        <span>
                            Sản Phẩm:{' '}
                            <b className="text-black">{mall.products}</b>
                        </span>
                        <span>
                            Đang Theo:{' '}
                            <b className="text-black">{mall.following}</b>
                        </span>
                        <span>
                            Người Theo Dõi:{' '}
                            <b className="text-black">{mall.followers}</b>
                        </span>
                        <span>
                            Đánh Giá:{' '}
                            <b className="text-black">
                                {mall.rating} ({mall.ratingCount} Đánh Giá)
                            </b>
                        </span>
                        <span>
                            Tỉ Lệ Phản Hồi Chat:{' '}
                            <b className="text-black">{mall.responseRate}</b>
                        </span>
                        <span>
                            Tham Gia:{' '}
                            <b className="text-black">
                                {mall.joinYears} Năm Trước
                            </b>
                        </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                            + Theo Dõi
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Chat
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white mt-4 px-6 border-b flex gap-6 overflow-x-auto">
                {tabs.map((tab, idx) => (
                    <button
                        key={tab}
                        className={`py-4 font-medium border-b-2 transition-colors ${activeTab === idx ? 'border-red-500 text-red-500' : 'border-transparent text-gray-700'}`}
                        onClick={() => setActiveTab(idx)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Vouchers */}
            <div className="bg-white mt-4 mx-6 p-4 rounded shadow flex gap-4 overflow-x-auto">
                {vouchers.map((voucher) => (
                    <div
                        key={voucher.id}
                        className="border border-red-200 bg-red-50 rounded p-4 min-w-[220px] flex flex-col justify-between"
                    >
                        <div>
                            <div className="font-bold text-red-500 text-lg">
                                {voucher.title}
                            </div>
                            <div className="text-gray-700 text-sm mb-2">
                                {voucher.desc}
                            </div>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                            <span className="text-xs text-gray-400">
                                HSD: {voucher.expiry}
                            </span>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                                Lưu
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Product Recommendations */}
            <div className="mt-8 mx-6">
                <h2 className="text-lg font-semibold mb-4">GỢI Ý CHO BẠN</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded shadow p-4 flex flex-col hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-contain mb-3"
                            />
                            <div className="font-medium mb-1 line-clamp-2 min-h-[48px]">
                                {product.name}
                            </div>
                            <div className="text-red-500 font-bold text-lg mb-1">
                                ₫{product.price.toLocaleString()}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 gap-2">
                                <span>⭐ {product.rating}</span>
                                <span>Đã bán {product.sold}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 mx-auto max-w-6xl">
                <div className="text-4xl font-extrabold text-center bg-black text-white rounded-lg py-4 mb-6 tracking-wide">
                    TÌM SẢN PHẨM THEO BỘ MÔN THỂ THAO
                </div>
                <img
                    src="https://down-spe-vn.img.susercontent.com/vn-11134210-7ras8-malj5if2w0rb86.webp"
                    alt="Banner các bộ môn thể thao"
                    className="w-full rounded-xl shadow-lg object-cover"
                />
            </div>

            <ProductFromCategory />
        </div>
    );
};

export default MallDetail;
