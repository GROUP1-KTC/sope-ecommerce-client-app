'use client';
import { useState } from 'react';
import AddressList from '~/components/address/AddressList';
import AddressFormModal from '~/components/address/AddAddressFormModal';

type Address = {
    id: number;
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
};

const AddressManagementPage = () => {
    const [storedAddresses, setStoredAddresses] = useState<Address[]>([
        {
            id: 1,
            name: 'Pham',
            phone: '0901234567',
            address: '123 Đường ABC, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
            isDefault: true,
        },
        {
            id: 2,
            name: 'Nguyen',
            phone: '0912345678',
            address: '456 Đường XYZ, Phường 3, Quận 3, TP. Hồ Chí Minh',
            isDefault: false,
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddAddress = (newAddress: Address) => {
        if (newAddress.isDefault) {
            setStoredAddresses((prev) => [
                ...prev.map((addr) => ({ ...addr, isDefault: false })),
                newAddress,
            ]);
        } else {
            setStoredAddresses((prev) => [...prev, newAddress]);
        }
        setIsModalOpen(false);
    };

    const handleSetDefault = (id: number) => {
        setStoredAddresses((prev) =>
            prev.map((addr) => ({
                ...addr,
                isDefault: addr.id === id ? true : false,
            })),
        );
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 pl-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="flex items-center justify-between text-xl font-semibold text-black uppercase mb-6">
                            <span>Quản lý địa chỉ</span>
                            <button
                                className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition hover:shadow-lg cursor-pointer"
                                onClick={openModal}
                            >
                                + Thêm địa chỉ
                            </button>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="px-8">
                            <AddressList
                                addresses={storedAddresses}
                                onSetDefault={handleSetDefault}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AddressFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleAddAddress}
            />
        </div>
    );
};

export default AddressManagementPage;
