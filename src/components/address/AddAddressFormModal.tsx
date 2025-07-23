'use client';
import type { FormEvent } from 'react';
import { useState, useEffect } from 'react';

type Province = { code: number; name: string };
type District = { code: number; name: string };
type Ward = { code: number; name: string };

type AddressData = {
    name: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    detailedAddress: string;
    isDefault: boolean;
};

type AddressFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newAddress: {
        id: number;
        name: string;
        phone: string;
        address: string;
        isDefault: boolean;
    }) => void;
};

const AddressFormModal = ({
    isOpen,
    onClose,
    onSubmit,
}: AddressFormModalProps) => {
    const [addressData, setAddressData] = useState<AddressData>({
        name: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        detailedAddress: '',
        isDefault: false,
    });
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/p/')
            .then((res) => res.json())
            .then((data) => setProvinces(data))
            .catch((err) => console.error('Lỗi khi lấy tỉnh/thành phố:', err));
    }, []);

    useEffect(() => {
        if (addressData.province) {
            fetch(
                `https://provinces.open-api.vn/api/p/${addressData.province}?depth=2`,
            )
                .then((res) => res.json())
                .then((data) => setDistricts(data.districts || []))
                .catch((err) => console.error('Lỗi khi lấy quận/huyện:', err));
            setAddressData((prev) => ({ ...prev, district: '', ward: '' }));
            setDistricts([]);
            setWards([]);
        }
    }, [addressData.province]);

    useEffect(() => {
        if (addressData.district) {
            fetch(
                `https://provinces.open-api.vn/api/d/${addressData.district}?depth=2`,
            )
                .then((res) => res.json())
                .then((data) => setWards(data.wards || []))
                .catch((err) => console.error('Lỗi khi lấy phường/xã:', err));
            setAddressData((prev) => ({ ...prev, ward: '' }));
            setWards([]);
        }
    }, [addressData.district]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setAddressData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const provinceName =
            provinces.find((p) => p.code === parseInt(addressData.province))
                ?.name || '';
        const districtName =
            districts.find((d) => d.code === parseInt(addressData.district))
                ?.name || '';
        const wardName =
            wards.find((w) => w.code === parseInt(addressData.ward))?.name ||
            '';
        const fullAddress = `${addressData.detailedAddress}, ${wardName}, ${districtName}, ${provinceName}`;

        const newAddress = {
            id: Math.floor(Math.random() * 1000) + 1,
            name: addressData.name,
            phone: addressData.phone,
            address: fullAddress,
            isDefault: addressData.isDefault,
        };

        onSubmit(newAddress);
        setAddressData({
            name: '',
            phone: '',
            province: '',
            district: '',
            ward: '',
            detailedAddress: '',
            isDefault: false,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg p-10 w-full max-w-2xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Thêm địa chỉ mới</h2>
                    <button
                        className="text-red-500 hover:text-red-700 text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center">
                        <label className="block text-gray-700 text-sm font-bold w-1/4">
                            Họ tên
                        </label>
                        <input
                            className="w-3/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            type="text"
                            name="name"
                            value={addressData.name}
                            onChange={handleInputChange}
                            placeholder="Nhập họ tên"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="block text-gray-700 text-sm font-bold w-1/4">
                            Số điện thoại
                        </label>
                        <input
                            className="w-3/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            type="tel"
                            name="phone"
                            value={addressData.phone}
                            onChange={handleInputChange}
                            placeholder="Nhập số điện thoại"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="block text-gray-700 text-sm font-bold w-1/4">
                            Tỉnh/Thành phố
                        </label>
                        <select
                            className="w-3/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition"
                            name="province"
                            value={addressData.province}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Chọn Tỉnh/Thành phố</option>
                            {provinces.map((province) => (
                                <option
                                    key={province.code}
                                    value={province.code}
                                >
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="block text-gray-700 text-sm font-bold w-1/4">
                            Quận/Huyện
                        </label>
                        <select
                            className="w-3/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition"
                            name="district"
                            value={addressData.district}
                            onChange={handleInputChange}
                            required
                            disabled={!addressData.province}
                        >
                            <option value="">Chọn Quận/Huyện</option>
                            {districts.map((district) => (
                                <option
                                    key={district.code}
                                    value={district.code}
                                >
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="block text-gray-700 text-sm font-bold w-1/4">
                            Phường/Xã
                        </label>
                        <select
                            className="w-3/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer transition"
                            name="ward"
                            value={addressData.ward}
                            onChange={handleInputChange}
                            required
                            disabled={!addressData.district}
                        >
                            <option value="">Chọn Phường/Xã</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="block text-gray-700 text-sm font-bold w-1/4">
                            Địa chỉ chi tiết
                        </label>
                        <input
                            className="w-3/4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            type="text"
                            name="detailedAddress"
                            value={addressData.detailedAddress}
                            onChange={handleInputChange}
                            placeholder="Nhập địa chỉ chi tiết (số nhà, đường)"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="block text-gray-700 text-sm font-bold w-1/4">
                            Mặc định
                        </label>
                        <div className="w-3/4 flex items-center">
                            <input
                                id="isDefault"
                                className="peer sr-only"
                                type="checkbox"
                                name="isDefault"
                                checked={addressData.isDefault}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="isDefault"
                                className="cursor-pointer w-10 h-6 bg-gray-300 rounded-full relative transition-colors duration-200 peer-checked:bg-red-500"
                            >
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4"></span>
                            </label>
                            <span className="ml-3 text-sm text-gray-600">
                                Đặt làm mặc định
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-1/6 hover:shadow-lg transition cursor-pointer"
                        >
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressFormModal;
