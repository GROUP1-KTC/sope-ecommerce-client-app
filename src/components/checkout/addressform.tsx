import React from 'react';

type AddressFormData = {
    fullName: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
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
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setAddressFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { fullName, phone, city, district, ward, address } =
            addressFormData;

        if (!fullName || !phone || !city || !district || !ward || !address) {
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
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Họ tên & SĐT */}
            <div className="flex space-x-4">
                <input
                    type="text"
                    name="fullName"
                    value={addressFormData.fullName}
                    onChange={handleChange}
                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Họ và tên"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={addressFormData.phone}
                    onChange={handleChange}
                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Số điện thoại"
                    required
                />
            </div>

            {/* City / District / Ward */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                    type="text"
                    name="city"
                    value={addressFormData.city}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Tỉnh/Thành phố"
                    required
                />
                <input
                    type="text"
                    name="district"
                    value={addressFormData.district}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Quận/Huyện"
                    required
                />
                <input
                    type="text"
                    name="ward"
                    value={addressFormData.ward}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Phường/Xã"
                    required
                />
            </div>

            {/* Địa chỉ cụ thể */}
            <input
                type="text"
                name="address"
                value={addressFormData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Địa chỉ cụ thể (số nhà, tên đường...)"
                required
            />

            {/* Type & Button vị trí */}
            <div className="flex space-x-4">
                <select
                    name="type"
                    value={addressFormData.type}
                    onChange={handleChange}
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

            {/* Action Buttons */}
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
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                    Hoàn tất
                </button>
            </div>
        </form>
    );
}
