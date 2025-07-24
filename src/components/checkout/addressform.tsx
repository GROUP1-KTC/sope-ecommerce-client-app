import React from 'react';

type AddressFormData = {
    fullName: string;
    phone: string;
    cityDistrict: string;
    address: string;
    type: string;
};

type AddressFormProps = {
    addressFormData: AddressFormData;
    setAddressFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
    setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddressForm({
    addressFormData,
    setAddressFormData,
    setShowAddressForm,
}: AddressFormProps) {
    const handleAddressChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setAddressFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        const { fullName, phone, cityDistrict, address } = addressFormData;
        if (!fullName || !phone || !cityDistrict || !address) {
            alert('Vui lòng điền đầy đủ thông tin địa chỉ.');
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            alert('Số điện thoại phải có 10 chữ số.');
            return;
        }
        setShowAddressForm(false);
    };

    return (
        <form onSubmit={handleSubmitAddress} className="mt-4 space-y-4">
            <div className="flex space-x-4">
                <input
                    type="text"
                    name="fullName"
                    value={addressFormData.fullName}
                    onChange={handleAddressChange}
                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Họ và tên"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={addressFormData.phone}
                    onChange={handleAddressChange}
                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Số điện thoại"
                    required
                />
            </div>
            <select
                name="cityDistrict"
                value={addressFormData.cityDistrict}
                onChange={handleAddressChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
            >
                <option value="">Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</option>
                <option value="HCM">
                    TP. Hồ Chí Minh, Quận Bình Thạnh, Phường 25
                </option>
            </select>
            <input
                type="text"
                name="address"
                value={addressFormData.address}
                onChange={handleAddressChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Địa chỉ cụ thể"
                required
            />
            <div className="flex space-x-4">
                <select
                    name="type"
                    value={addressFormData.type}
                    onChange={handleAddressChange}
                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="Nhà Riêng">Nhà Riêng</option>
                    <option value="Văn Phòng">Văn Phòng</option>
                </select>
                <button
                    type="button"
                    className="w-1/2 bg-gray-200 border rounded px-3 py-2 cursor-pointer"
                >
                    + Thêm vị trí
                </button>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    className="bg-gray-200 px-4 py-2 rounded"
                    onClick={() => setShowAddressForm(false)}
                >
                    Trở Lại
                </button>
                <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                    Hoàn tất
                </button>
            </div>
        </form>
    );
}
