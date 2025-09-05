'use client';

import React, { useState } from 'react';
import type { Address } from '~/types/address';
import HorizontalAddressCard from '../address/HorizontalAddressCard';
import AddressFormModal from '../address/AddAddressFormModal';

type HozAddressListProps = {
  setAddressFormData: (data: any) => void;
  setShowListAddress: (show: boolean) => void;
};

const HozAddressList = ({ setAddressFormData, setShowListAddress }: HozAddressListProps) => {
  // Mock data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      recipientName: 'Nguyễn Văn A',
      phoneNumber: '0909123456',
      street: '123 Nguyễn Trãi',
      ward: 'Phường 5',
      district: 'Quận 1',
      city: 'TP.HCM',
      country: 'Việt Nam',
      isDefault: true,
    },
    {
      id: '2',
      recipientName: 'Trần Thị B',
      phoneNumber: '0988777666',
      street: '456 Lê Lợi',
      ward: 'Phường 7',
      district: 'Quận 3',
      city: 'TP.HCM',
      country: 'Việt Nam',
      isDefault: false,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handleSelect = (id: string) => {
    const selected = addresses.find((a) => a.id === id);
    if (selected) {
      // Map sang AddressFormData
      setAddressFormData({
        fullName: selected.recipientName,
        phone: selected.phoneNumber,
        address: selected.street,
        ward: selected.ward,
        district: selected.district,
        city: selected.city,
        type: selected.isDefault ? 'default' : 'other',
      });
      setShowListAddress(false);
    }
  };

  // Hàm khi thêm địa chỉ thành công
  const handleAddAddress = (newAddress: {
    id: number;
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
  }) => {
    setAddresses((prev) => [
      ...prev,
      {
        id: newAddress.id.toString(),
        recipientName: newAddress.name,
        phoneNumber: newAddress.phone,
        street: newAddress.address,
        ward: '',
        district: '',
        city: '',
        country: 'Việt Nam',
        isDefault: newAddress.isDefault,
      },
    ]);
  };

  return (
    <div className="mt-3 space-y-3">
      {addresses.map((address) => (
        <HorizontalAddressCard
          key={address.id}
          address={address}
          onSelect={handleSelect}
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
