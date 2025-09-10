'use client';

import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HozAddressList from './HozAddressList';
import type { Address } from '~/types/address';
import { add } from 'lodash';

type AddressSectionProps = {
    selectedAddress: Address | null;
    setSelectedAddress: (addr: any) => void;
    userAddresses?: Address[];
};

export default function AddressSection({
    selectedAddress,
    setSelectedAddress,
    userAddresses,
}: AddressSectionProps) {
    const [showListAddress, setShowListAddress] = useState(false);

    const handleSelect = (address: Address) => {
        setSelectedAddress(address);
        setShowListAddress(false);
    };

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
                    setAddressFormData={handleSelect}
                    setShowListAddress={setShowListAddress}
                    addresses={userAddresses || []}
                />
            ) : (
                <div>
                    <p className="mt-2 text-gray-700 drop-shadow-sm">
                        {`${selectedAddress?.recipientName} (${selectedAddress?.phoneNumber})`}
                    </p>
                    <p className=" text-gray-700 drop-shadow-sm">
                        {`${selectedAddress?.street}, ${selectedAddress?.ward}, ${selectedAddress?.district}, ${selectedAddress?.city}`}
                    </p>
                </div>
            )}
        </div>
    );
}
