'use client';

import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HozAddressList from './HozAddressList';

type AddressFormData = {
    fullName: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    type: string;
};

export default function AddressSection() {
    // Mock dữ liệu mặc định
    const [addressFormData, setAddressFormData] = useState<AddressFormData>({
        fullName: 'Nguyễn Văn A',
        phone: '0909123456',
        city: 'TP.HCM',
        district: 'Quận 1',
        ward: 'Phường 5',
        address: '123 Nguyễn Trãi',
        type: 'default',
    });

    const [showListAddress, setShowListAddress] = useState(false);

    return (
        <div className="w-full mx-auto mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <LocationOnIcon className="text-red-500 mr-2 drop-shadow-sm" />
                    <span className="font-semibold drop-shadow-sm">
                        Địa Chỉ Nhận Hàng
                    </span>
                </div>
                <button
                    className="text-black-500 underline hover:text-red-600 drop-shadow-sm cursor-pointer"
                    onClick={() => setShowListAddress(!showListAddress)}
                >
                    Thay Đổi
                </button>
            </div>

            {showListAddress ? (
                <HozAddressList
                    setAddressFormData={setAddressFormData}
                    setShowListAddress={setShowListAddress}
                />
            ) : (
                <div>
                    <p className="mt-2 text-gray-700 drop-shadow-sm">
                        {`${addressFormData.fullName} (${addressFormData.phone})`}
                    </p>
                    <p className=" text-gray-700 drop-shadow-sm">
                        {`${addressFormData.address}, ${addressFormData.ward}, ${addressFormData.district}, ${addressFormData.city}`}
                    </p>
                </div>
            )}
        </div>
    );
}
