'use client';

import React from 'react';
import AddressCard from './AddressCard';

type Address = {
    id: number;
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
};

const AddressList = ({
    addresses,
    onSetDefault,
    onDelete,
}: {
    addresses: Address[];
    onSetDefault: (id: number) => void;
    onDelete: (id: number) => void;
}) => {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Địa chỉ đã lưu</h2>
            {addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            onSetDefault={onSetDefault}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Không có địa chỉ nào được thêm.</p>
            )}
        </div>
    );
};

export default AddressList;
