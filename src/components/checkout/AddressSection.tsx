import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddressForm from './addressform';

type AddressFormData = {
    fullName: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    address: string;
    type: string;
};

type AddressSectionProps = {
    addressFormData: AddressFormData;
    setAddressFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
    showAddressForm: boolean;
    setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddressSection({
    addressFormData,
    setAddressFormData,
    showAddressForm,
    setShowAddressForm,
}: AddressSectionProps) {
    return (
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <LocationOnIcon className="text-red-500 mr-2 drop-shadow-sm" />
                    <span className="font-semibold drop-shadow-sm">
                        Địa Chỉ Nhận Hàng
                    </span>
                </div>
                <button
                    className="text-blue-500 underline hover:text-red-600 drop-shadow-sm cursor-pointer"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                >
                    Thay Đổi
                </button>
            </div>

            {showAddressForm ? (
                <AddressForm
                    addressFormData={addressFormData}
                    setAddressFormData={setAddressFormData}
                    setShowAddressForm={setShowAddressForm}
                />
            ) : (
                <p className="mt-2 text-gray-700 drop-shadow-sm">
                    {`${addressFormData.fullName} (${addressFormData.phone}), ${addressFormData.address}, ${addressFormData.ward}, ${addressFormData.district}, ${addressFormData.city}`}
                </p>
            )}
        </div>
    );
}
