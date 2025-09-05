'use client';

import React from 'react';
import type { Address } from '~/types/address';

const HorizontalAddressCard = ({
  address,
  onSelect,
}: {
  address: Address;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition">
      <div className="flex flex-col">
        <span className="text-gray-700 font-semibold">
          {address.recipientName}
        </span>
        <span className="text-sm text-gray-500">SĐT: {address.phoneNumber}</span>
        <span className="text-sm text-gray-500">
          {`${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
        </span>
      </div>

      <button
        className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
        onClick={() => onSelect(address.id)}
      >
        Chọn
      </button>
    </div>
  );
};

export default HorizontalAddressCard;
