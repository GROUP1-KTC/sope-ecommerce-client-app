'use client';
import React from 'react';
import AddressCard from './AddressCard';
import type { Address } from '~/types/address';  

const AddressList = ({
  addresses,
  onSetDefault,
  onDelete,
}: {
  addresses: Address[];
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
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
