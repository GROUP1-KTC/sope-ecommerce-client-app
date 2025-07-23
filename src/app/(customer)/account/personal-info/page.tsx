'use client';
import { useState } from 'react';

const MAX_ADDRESS_LENGTH = 200;

const PersonalInfoPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        cccd: '',
        address: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        cccd: '',
        address: '',
    });

    const validate = () => {
        const newErrors: any = { fullName: '', cccd: '', address: '' };
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ và tên không được để trống.';
            isValid = false;
        } else if (formData.fullName.trim().split(' ').length < 2) {
            newErrors.fullName = 'Vui lòng nhập đầy đủ họ và tên.';
            isValid = false;
        }

        if (!formData.cccd.trim()) {
            newErrors.cccd = 'Số CCCD không được để trống.';
            isValid = false;
        } else if (!/^\d{12}$/.test(formData.cccd)) {
            newErrors.cccd = 'Số CCCD phải gồm đúng 12 chữ số.';
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Địa chỉ không được để trống.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'address' && value.length > MAX_ADDRESS_LENGTH) return;

        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        // TODO: Gửi thông tin về backend
        alert('Gửi thông tin thành công!');
    };

    const isFormValid =
        formData.fullName && formData.cccd && formData.address &&
        !errors.fullName && !errors.cccd && !errors.address;

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 pl-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <h2 className="text-xl uppercase font-semibold text-black mb-1">Thông tin cá nhân</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Vui lòng đảm bảo nội dung bạn cung cấp trùng khớp với thông tin trên CCCD của bạn
                        </p>
                        <hr className="mb-6 border-gray-300" />

                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                            <div className="flex items-start gap-4">
                                <label className="w-1/5 text-sm font-medium text-gray-700 mt-2">Họ và tên</label>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Họ và tên đầy đủ trên CCCD"
                                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-red-500  ${errors.fullName ? 'border-red-500' : ''
                                            }`}
                                        required
                                    />
                                    {errors.fullName && (
                                        <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <label className="w-1/5 text-sm font-medium text-gray-700 mt-2">Số CCCD</label>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="cccd"
                                        value={formData.cccd}
                                        onChange={handleChange}
                                        placeholder="Số định danh cá nhân trên CCCD"
                                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-red-500 ${errors.cccd ? 'border-red-500' : ''
                                            }`}
                                        required
                                    />
                                    {errors.cccd && (
                                        <p className="text-sm text-red-600 mt-1">{errors.cccd}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <label className="w-1/5 text-sm font-medium text-gray-700 mt-2">Địa chỉ</label>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Địa chỉ Nơi thường trú trên CCCD"
                                        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-red-500 ${errors.address ? 'border-red-500' : ''
                                            }`}
                                        required
                                    />
                                    <div className="text-right text-sm text-gray-500 mt-1">
                                        {formData.address.length}/{MAX_ADDRESS_LENGTH}
                                    </div>
                                    {errors.address && (
                                        <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <label className="w-1/5 text-sm font-medium text-gray-700 mt-2"></label>
                                <button
                                    type="submit"
                                    disabled={!isFormValid}
                                    className={`px-6 py-2 rounded text-white transition ${isFormValid
                                        ? 'bg-red-600 hover:bg-red-700 hover:shadow cursor-pointer'
                                        : 'bg-red-200 cursor-not-allowed'
                                        }`}
                                >
                                    Xác Nhận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoPage;
