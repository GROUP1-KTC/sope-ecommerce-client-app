'use client';

import React, { useState } from 'react';
import type { Address } from '~/types/address';
import HorizontalAddressCard from '../address/HorizontalAddressCard';
import AddressFormModal from '../address/AddAddressFormModal';

type HozAddressListProps = {
    setAddressFormData: (data: any) => void;
    setShowListAddress: (show: boolean) => void;
    addresses?: Address[];
};

const HozAddressList = ({
    setAddressFormData,
    setShowListAddress,
    addresses,
}: HozAddressListProps) => {
    const [openModal, setOpenModal] = useState(false);

    const handleSelectAddress = (address: Address) => {
        setAddressFormData(address);
        setShowListAddress(false);
    };

    // Hàm khi thêm địa chỉ thành công
    const handleAddAddress = (newAddress: {
        id: number;
        name: string;
        phone: string;
        address: string;
        isDefault: boolean;
    }) => {
        addresses?.push({
            id: newAddress.id.toString(),
            recipientName: newAddress.name,
            phoneNumber: newAddress.phone,
            street: newAddress.address,
            ward: '',
            district: '',
            city: '',
            country: 'Việt Nam',
            isDefault: newAddress.isDefault,
        });
    };

    return (
        <div className="mt-3 space-y-3">
            {addresses?.map((address) => (
                <HorizontalAddressCard
                    key={address.id}
                    address={address}
                    onSelect={() => handleSelectAddress(address)}
                />
            ))}

            {/* Nút thêm địa chỉ */}
            <button
                onClick={() => setOpenModal(true)}
                className="w-full py-2 border border-dashed border-gray-400 rounded-lg text-gray-600 hover:text-red-500 hover:border-red-500 transition cursor-pointer"
            >
                + Thêm địa chỉ mới
            </button>

            {/* Modal thêm địa chỉ */}
            <AddressFormModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleAddAddress}
            />
        </div>
    );
};

export default HozAddressList;
