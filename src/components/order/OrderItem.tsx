import React from 'react';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Image from 'next/image';

type Order = {
    id: number;
    customer: string;
    date: string;
    status: string;
    total: number | string;
    shop: {
        name: string;
        address: string;
    };
    product: {
        name: string;
        quantity: number;
        imageUrl: string;
    };
};

interface OrderItemProps {
    order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    return (
        <div className=" p-6 mb-4 rounded-lg shadow-sm bg-white">
            {/* Shop Information */}
            <div className="mb-4 flex items-center space-x-6">
                <StorefrontOutlinedIcon className="text-gray-600 mr-2" />

                <div className="flex space-x-6">
                    <p className="text-black font-semibold">
                        {order.shop.name}
                    </p>
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

                <div className="ml-auto">
                    <p className="text-green-600 font-semibold">
                        {order.status}
                    </p>
                </div>
            </div>

            <hr className="my-4 border-t border-gray-300" />

            {/* Product Information */}
            <div className="mb-4 flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <div>
                        <Image
                            width={40}
                            height={40}
                            src={order.product.imageUrl}
                            alt={order.product.name}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    </div>
                    <div>
                        <p className="text-black font-semibold ">
                            Sản phẩm: {order.product.name}
                        </p>
                        <p className="text-gray-600">
                            Số lượng: {order.product.quantity}
                        </p>
                        <p className="text-gray-600">Ngày đặt: {order.date}</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-800 font-normal text-right">
                        {order.total}
                    </p>
                </div>
            </div>

            <hr className="my-4 border-t border-gray-300" />

            <div className="flex mb-6 space-x-4 justify-end items-center">
                <p className="text-gray-600 flex items-center">
                    Thành tiền:
                    <span className="font-semibold text-orange-500 text-2xl ml-2">
                        {order.total}
                    </span>
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 justify-end">
                <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-700 cursor-pointer transition">
                    Mua lại
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer transition">
                    Liên hệ người bán
                </button>
            </div>
        </div>
    );
};

export default OrderItem;
