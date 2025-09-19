'use client';
import { useState } from 'react';
import CustomLink from '~/components/shared/loading/CustomLink';

const ChangePhonePage = () => {
    const [newPhone, setNewPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New phone:', newPhone);
        // TODO: call API đổi số điện thoại
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-[80vh] bg-gray-50 px-0 sm:px-4 md:px-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="text-xl font-semibold text-black uppercase">
                            Thay đổi số điện thoại
                        </div>
                        <div className="text-gray-600 mb-4">
                            Nhập số điện thoại mới để tiếp tục
                        </div>
                        <hr className="my-4 border-gray-300" />

                        <form onSubmit={handleSubmit} className="px-4 md:px-8">
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 text-sm font-bold w-1/4">
                                    Số điện thoại mới
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={newPhone}
                                    onChange={(e) =>
                                        setNewPhone(e.target.value)
                                    }
                                    placeholder="Nhập số điện thoại của bạn"
                                    className="w-2/3 p-2 border rounded"
                                />
                            </div>

                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 text-sm font-bold w-1/4"></label>
                                <CustomLink
                                    href="/account/profile/verify-phone"
                                    className="w-1/6 bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600 transition-colors duration-200 flex items-center justify-center text-center"
                                >
                                    Tiếp Theo
                                </CustomLink>
                            </div>

                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 text-sm font-bold w-1/4"></label>
                                <label className="flex items-center text-gray-700 text-sm">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="mr-2 accent-red-500"
                                    />
                                    Nhận thông tin khuyến mãi & cập nhật mới
                                    nhất qua SMS.
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePhonePage;
