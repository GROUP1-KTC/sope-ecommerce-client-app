'use client';
import { useEffect, useState } from 'react';
import type { TempAddress } from '~/types/address';

type Province = { code: number; name: string };
type District = { code: number; name: string };
type Ward = { code: number; name: string };

type TempAddressSectionProps = {
    onChange: (address: TempAddress) => void;
};

const TempAddressSection = ({ onChange }: TempAddressSectionProps) => {
    const [addressData, setAddressData] = useState<TempAddress>({
        fullName: '',
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

    useEffect(() => {
        onChange(addressData);
    }, [addressData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setAddressData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin nhận hàng</h2>

            <div className="space-y-4">
                {/* Họ tên */}
                <div className="flex items-center">
                    <label className="w-1/4 text-sm font-bold">Họ tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={addressData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nhập họ tên"
                        className="w-3/4 p-2 border border-gray-300 rounded focus:border-black"
                        required
                    />
                </div>

                {/* Phone */}
                <div className="flex items-center">
                    <label className="w-1/4 text-sm font-bold">
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={addressData.phone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                        className="w-3/4 p-2 border border-gray-300 rounded focus:border-black"
                        required
                    />
                </div>

                {/* Province */}
                <div className="flex items-center">
                    <label className="w-1/4 text-sm font-bold">
                        Tỉnh/Thành phố
                    </label>
                    <select
                        name="province"
                        value={addressData.province}
                        onChange={handleInputChange}
                        className="w-3/4 p-2 border border-gray-300 rounded focus:border-black"
                        required
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provinces.map((p) => (
                            <option key={p.code} value={p.code}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* District */}
                <div className="flex items-center">
                    <label className="w-1/4 text-sm font-bold">
                        Quận/Huyện
                    </label>
                    <select
                        name="district"
                        value={addressData.district}
                        onChange={handleInputChange}
                        disabled={!addressData.province}
                        className="w-3/4 p-2 border border-gray-300 rounded focus:border-black"
                        required
                    >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((d) => (
                            <option key={d.code} value={d.code}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ward */}
                <div className="flex items-center">
                    <label className="w-1/4 text-sm font-bold">Phường/Xã</label>
                    <select
                        name="ward"
                        value={addressData.ward}
                        onChange={handleInputChange}
                        disabled={!addressData.district}
                        className="w-3/4 p-2 border border-gray-300 rounded focus:border-black"
                        required
                    >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((w) => (
                            <option key={w.code} value={w.code}>
                                {w.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Detailed Address */}
                <div className="flex items-center">
                    <label className="w-1/4 text-sm font-bold">
                        Địa chỉ chi tiết
                    </label>
                    <input
                        type="text"
                        name="detailedAddress"
                        value={addressData.detailedAddress}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ chi tiết"
                        className="w-3/4 p-2 border border-gray-300 rounded focus:border-black"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default TempAddressSection;
