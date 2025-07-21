'use client';

import React from 'react';

interface TrackingItem {
    date: string;
    detail: string;
}

interface OrderTrackingProps {
    tracking: TrackingItem[];
    receiver?: {
        name: string;
        phone: string;
        address: string;
    };
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ tracking, receiver }) => {
    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-6 px-6">
                <div className="md:w-1/3 bg-white">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Thông Tin Người Nhận</h3>
                    {receiver ? (
                        <ul className="text-sm text-gray-600 space-y-3">
                            <li><span className="font-medium">Tên:</span> {receiver.name}</li>
                            <li><span className="font-medium">SĐT:</span> {receiver.phone}</li>
                            <li><span className="font-medium">Địa chỉ:</span> {receiver.address}</li>
                        </ul>
                    ) : (
                        <p className="text-xl text-gray-500">Chưa có thông tin người nhận.</p>
                    )}
                </div>
                <div className="hidden md:flex items-center">
                    <div className="h-32 w-px bg-gray-200" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Lịch sử vận chuyển</h3>
                    <ul className="relative pl-8 border-l-2 border-gray-300 space-y-3">
                        {tracking.map((track, index) => (
                            <li key={index} className="relative text-sm text-gray-600 pl-4">
                                <span className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm"></span>
                                <span className="block font-medium">{track.date}</span>
                                <span>{track.detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default OrderTracking;
