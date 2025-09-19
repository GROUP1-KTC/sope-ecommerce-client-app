import { useEffect, useState } from 'react';
import type { Address, Province, District, Ward } from './types';
import CloseIcon from '@mui/icons-material/Close';

interface AddressModalProps {
    onClose: () => void;
    onAdd: (addr: Address) => void;
}

export default function AddressModal({ onClose, onAdd }: AddressModalProps) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        senderName: '',
        senderPhone: '',
        province: '',
        district: '',
        ward: '',
        street: '',
        country: 'Việt Nam',
    });

    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/p/')
            .then((r) => r.json())
            .then((data) => setProvinces(data))
            .catch(() => setProvinces([]));
    }, []);

    useEffect(() => {
        if (!form.province) return;
        fetch(`https://provinces.open-api.vn/api/p/${form.province}?depth=2`)
            .then((r) => r.json())
            .then((data) => setDistricts(data.districts || []))
            .catch(() => setDistricts([]));
        setForm((p) => ({ ...p, district: '', ward: '' }));
        setWards([]);
    }, [form.province]);

    useEffect(() => {
        if (!form.district) return;
        fetch(`https://provinces.open-api.vn/api/d/${form.district}?depth=2`)
            .then((r) => r.json())
            .then((data) => setWards(data.wards || []))
            .catch(() => setWards([]));
        setForm((p) => ({ ...p, ward: '' }));
    }, [form.district]);

    const handle = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm((p) => ({
            ...p,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const city =
            provinces.find((p) => p.code === parseInt(form.province))?.name ||
            '';
        const district =
            districts.find((d) => d.code === parseInt(form.district))?.name ||
            '';
        const ward =
            wards.find((w) => w.code === parseInt(form.ward))?.name || '';

        const addr: Address = {
            senderName: form.senderName,
            senderPhone: form.senderPhone,
            city,
            district,
            ward,
            street: form.street,
            country: 'Việt Nam',
        };

        setTimeout(() => {
            onAdd(addr);
            setLoading(false);
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                        Thêm địa chỉ lấy hàng
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400 cursor-pointer hover:text-gray-600 transition"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div>
                    <p className="text-sm text-gray-600 mb-4">
                        Vui lòng điền đầy đủ thông tin địa chỉ lấy hàng. Đây là
                        địa chỉ đơn vị vận chuyển sẽ liên hệ để lấy hàng.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm block mb-1">
                                Tên người gửi hàng
                            </label>
                            <input
                                name="senderName"
                                value={form.senderName}
                                onChange={handle}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm block mb-1">
                                Số điện thoại
                            </label>
                            <input
                                name="senderPhone"
                                value={form.senderPhone}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(
                                        /\D/g,
                                        '',
                                    );
                                    setForm((prev) => ({
                                        ...prev,
                                        senderPhone: numericValue,
                                    }));
                                }}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="text-sm block mb-1">
                                Tỉnh/Thành
                            </label>
                            <select
                                name="province"
                                value={form.province}
                                onChange={handle}
                                className="w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm text-gray-800 hover:shadow-md focus:outline-none focus:ring-1 focus:ring-black cursor-pointer transition-all"
                                required
                            >
                                <option value="">Chọn tỉnh</option>
                                {provinces.map((p) => (
                                    <option key={p.code} value={p.code}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm block mb-1">
                                Quận/Huyện
                            </label>
                            <select
                                name="district"
                                value={form.district}
                                onChange={handle}
                                className={`w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm text-gray-800 hover:shadow-md focus:outline-none focus:ring-1 focus:ring-black cursor-pointer transition-all ${
                                    !form.province
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                required
                                disabled={!form.province}
                            >
                                <option value="">Chọn quận</option>
                                {districts.map((d) => (
                                    <option key={d.code} value={d.code}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm block mb-1">
                                Phường/Xã
                            </label>
                            <select
                                name="ward"
                                value={form.ward}
                                onChange={handle}
                                className={`w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm text-gray-800 hover:shadow-md focus:outline-none focus:ring-1 focus:ring-black cursor-pointer transition-all ${
                                    !form.district
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                required
                                disabled={!form.district}
                            >
                                <option value="">Chọn phường</option>
                                {wards.map((w) => (
                                    <option key={w.code} value={w.code}>
                                        {w.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm block mb-1">
                            Địa chỉ chi tiết
                        </label>
                        <input
                            name="street"
                            value={form.street}
                            onChange={handle}
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="Số nhà, tên đường..."
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer disabled:opacity-50 transition"
                        >
                            {loading ? 'Đang thêm...' : 'Thêm địa chỉ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
