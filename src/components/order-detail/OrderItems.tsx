'use client';

import React from 'react';
import Image from 'next/image';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

type OrderItem = {
    id: string | number;
    imageUrl: string;
    name: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
};

interface OrderItemsProps {
    items: OrderItem[];
    shop: {
        name: string;
    };
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, shop }) => {
    return (
        <div className="mb-6">
            <div className="mb-4 flex items-center space-x-6">
                <StorefrontOutlinedIcon className="text-gray-600 mr-2" />

                <div className="flex space-x-6">
                    <p className="text-black font-semibold">{shop.name}</p>
                </div>
                <div className="flex items-center">
                    <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded hover:bg-orange-600 transition cursor-pointer flex items-center">
                        <span className="flex items-center">
                            <ChatOutlinedIcon
                                className="mr-1"
                                style={{ fontSize: 16 }}
                            />
                        </span>
                        Chat
                    </button>
                </div>
                <div className="flex items-center">
                    <button className="bg-white border text-gray-500 text-xs px-3 py-1 rounded hover:bg-gray-200 transition cursor-pointer flex items-center">
                        <span className="flex items-center">
                            <StorefrontOutlinedIcon
                                className="mr-1"
                                style={{ fontSize: 16 }}
                            />
                        </span>
                        Xem Shop
                    </button>
                </div>
            </div>
            <hr className="my-4 border-gray-300 " />
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Sản Phẩm
            </h2>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between mb-4 border-b pb-4"
                >
                    <div className="flex items-center gap-4">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                        />
                        <div>
                            <p className="text-gray-600">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                x{item.quantity}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-800">
                            {item.price.toLocaleString('vi-VN')}đ
                        </p>
                        {item.discount > 0 && (
                            <p className="text-red-600 line-through">
                                -{item.discount.toLocaleString('vi-VN')}đ
                            </p>
                        )}
                        <p className="text-gray-800 font-semibold">
                            {item.total.toLocaleString('vi-VN')}đ
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderItems;
