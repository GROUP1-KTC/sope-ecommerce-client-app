'use client';
import Link from 'next/link';
import { useState } from 'react';
import CustomLink from '~/components/shared/loading/CustomLink';

const ChangeEmailPage = () => {
    const [newEmail, setNewEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('New email:', newEmail);
        // TODO: call API đổi email
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-[80vh] bg-gray-50 px-0 sm:px-4 md:px-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="text-xl font-semibold text-black uppercase">
                            Thay đổi địa chỉ email
                        </div>
                        <div className="text-gray-600 mb-4">
                            Nhập địa chỉ email mới để tiếp tục
                        </div>
                        <hr className="my-4 border-gray-300" />

                        <form onSubmit={handleSubmit} className="px-4 md:px-8">
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 text-sm font-bold w-1/4">
                                    Địa chỉ email mới
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                    placeholder="Đăng nhập vào địa chỉ email của bạn"
                                    className="w-2/3 p-2 border rounded"
                                />
                            </div>

                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 text-sm font-bold w-1/4"></label>
                                <CustomLink
                                    href="/account/profile/verify-email"
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
                                    Gửi tôi thông tin xu hướng, chương trình
                                    khuyến mãi & cập nhật mới nhất.
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeEmailPage;
