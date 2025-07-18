'use client';

import React, { useState } from 'react';

const CITIES = [
    'Hà Nội',
    'Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'Lâm Đồng',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cao Bằng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
];

export default function SellerFaxForm() {
    const [formData, setFormData] = useState({
        businessType: 'personal',
        address: '',
        city: '',
        emails: [''],
        taxCode: '',
    });
    const [errors, setErrors] = useState({
        address: '',
        city: '',
        emails: [''],
        taxCode: '',
    });

    const businessOptions = [
        { value: 'personal', label: 'Personal' },
        { value: 'household', label: 'House hold' },
        { value: 'company', label: 'Company' },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        idx?: number,
    ) => {
        const { name, value, type } = e.target;
        if (name === 'emails' && typeof idx === 'number') {
            setFormData((prev) => {
                const newEmails = [...prev.emails];
                newEmails[idx] = value;
                return { ...prev, emails: newEmails };
            });
        } else if (type === 'radio') {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddEmail = () => {
        if (formData.emails.length < 5) {
            setFormData((prev) => ({ ...prev, emails: [...prev.emails, ''] }));
            setErrors((prev) => ({ ...prev, emails: [...prev.emails, ''] }));
        }
    };

    const handleRemoveEmail = (idx: number) => {
        if (formData.emails.length > 1) {
            setFormData((prev) => {
                const newEmails = prev.emails.filter((_, i) => i !== idx);
                return { ...prev, emails: newEmails };
            });
            setErrors((prev) => {
                const newErrors = prev.emails.filter((_, i) => i !== idx);
                return { ...prev, emails: newErrors };
            });
        }
    };

    return (
        <div className="min-h-screen-90 flex justify-center items-start ">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Business type
                    </label>
                    <div className="flex items-center space-x-6">
                        {businessOptions.map((option) => (
                            <label
                                key={option.value}
                                className="inline-flex items-center"
                            >
                                <input
                                    type="radio"
                                    name="businessType"
                                    value={option.value}
                                    className="form-radio text-orange-500"
                                    checked={
                                        formData.businessType === option.value
                                    }
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Địa chỉ đăng ký kinh doanh */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        * Besiness registration
                    </label>
                    <div className="mb-4">
                        <select
                            name="city"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            value={formData.city}
                            onChange={handleChange}
                        >
                            <option value="">Select city</option>
                            {CITIES.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                        {errors.city && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.city}
                            </p>
                        )}
                    </div>
                    <div className="relative mb-2">
                        <input
                            type="text"
                            name="address"
                            placeholder="address..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.address}
                            </p>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">
                        Business address: the address according to the business
                        registration certificate for companies, business
                        households, or according to identification documents
                        (CCCD/ID card) for individuals.
                    </p>
                </div>

                {/* Email nhận hóa đơn điện tử */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        * Email to receive electronic invoice
                    </label>
                    {formData.emails.map((email, idx) => (
                        <div
                            className="relative mb-2 flex items-center"
                            key={idx}
                        >
                            <input
                                type="email"
                                name="emails"
                                placeholder="Email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                value={email}
                                onChange={(e) => handleChange(e, idx)}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                {email.length}/100
                            </span>
                            {formData.emails.length > 1 && (
                                <button
                                    type="button"
                                    className="ml-2 text-red-500 hover:underline text-xs"
                                    onClick={() => handleRemoveEmail(idx)}
                                >
                                    Xóa
                                </button>
                            )}
                            {errors.emails[idx] && (
                                <p className="text-red-500 text-xs ml-2">
                                    {errors.emails[idx]}
                                </p>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddEmail}
                        className="flex items-center text-sm font-semibold mt-2 hover:underline"
                        disabled={formData.emails.length >= 5}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add Email ({formData.emails.length}/5)
                    </button>
                </div>

                {/* Mã số thuế */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        * Tax code
                    </label>
                    <div className="relative mb-2">
                        <input
                            type="text"
                            name="taxCode" // Đảm bảo name khớp với key trong formData
                            placeholder="Enter tax code"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            value={formData.taxCode}
                            onChange={handleChange}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                            {formData.taxCode.length}/14
                        </span>
                        {errors.taxCode && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.taxCode}
                            </p>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">
                        The tax code is the business tax code.{' '}
                        <a href="#" className="text-orange-500 hover:underline">
                            Learn more.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
