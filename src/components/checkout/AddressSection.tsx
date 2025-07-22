import React, { Dispatch, SetStateAction } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddressForm from '~/components/checkout/addressform';

type AddressFormData = {
    fullName: string;
    phone: string;
    cityDistrict: string;
    address: string;
    type: string;
};

interface AddressSectionProps {
    addressFormData: AddressFormData;
    setAddressFormData: Dispatch<SetStateAction<AddressFormData>>;
    showAddressForm: boolean;
    setShowAddressForm: Dispatch<SetStateAction<boolean>>;
}

export default function AddressSection({
    addressFormData,
    setAddressFormData,
    showAddressForm,
    setShowAddressForm,
}: AddressSectionProps) {
    return (
        <div className="mb-6 p-4 border rounded">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <LocationOnIcon className="text-red-500 mr-2" />
                    <span className="font-semibold">Địa Chỉ Nhận Hàng</span>
                </div>
                <button
                    className="text-blue-500 underline"
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
                <p className="mt-2">{addressFormData.address}</p>
            )}
        </div>
    );
}
