'use client';
import { useEffect, useState } from 'react';
import AddressList from '~/components/address/AddressList';
import AddressFormModal from '~/components/address/AddAddressFormModal';
import {
    useDeleteAddressMutation,
    useGetUserAddressesQuery,
    useSetDefaultAddressMutation,
} from '~/features/address/addressApi';

const AddressManagementPage = () => {
    const { data: storedAddresses = [], error, isLoading } = useGetUserAddressesQuery();
    const [setDefault] = useSetDefaultAddressMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteAddress] = useDeleteAddressMutation();

    const handleSetDefault = async (id: string) => {
        await setDefault(id);
    };

    const handleDeleteAddress = async (id: string) => {
        try {
            await deleteAddress(id).unwrap();
            console.log("Deleted address", id);
        } catch (err) {
            console.error("Failed to delete address", err);
        }
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 pl-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="flex items-center justify-between text-xl font-semibold text-black uppercase mb-6">
                            <span>Quản lý địa chỉ</span>
                            <button
                                className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition hover:shadow-lg cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                + Thêm địa chỉ
                            </button>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="px-8">
                            <AddressList
                                addresses={storedAddresses}
                                onSetDefault={handleSetDefault}
                                onDelete={handleDeleteAddress}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <AddressFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => { }}
            />
        </div>
    );
};

export default AddressManagementPage;