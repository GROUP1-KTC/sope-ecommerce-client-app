'use client';
import { useState } from 'react';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useAlertStore } from '~/store/zustand/alertStore';

const PrivacySettingsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteAccount = () => {
        useAlertStore.getState().showAlert({
            severity: 'error',
            message: 'Yêu cầu xóa tài khoản đã được gửi!',
        });
        setIsModalOpen(false);
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 pl-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <h2 className="text-xl uppercase font-semibold text-black mb-4">
                            Privacy Settings
                        </h2>
                        <hr className="mb-6 border-gray-300" />
                        <div className="flex justify-between items-center px-12">
                            <p className="text-xl text-gray-700 font-medium">
                                Yêu cầu xóa tài khoản
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition hover:shadow-md cursor-pointer"
                            >
                                Xóa bỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative border-4 border-red-500">
                        <h3 className="text-lg font-semibold mb-4 text-center text-red-600">
                            Xác nhận xóa tài khoản
                        </h3>
                        <p className="text-gray-600 text-sl text-center mb-6">
                            Bạn có chắc chắn muốn xóa tài khoản của mình? Thao
                            tác này không thể hoàn tác.
                        </p>
                        <div className="flex justify-center mb-4">
                            <NoAccountsIcon
                                className="text-red-600"
                                style={{ fontSize: 80 }}
                            />
                        </div>
                        <hr className="border-red-500" />
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer shadow-sm"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow-sm transition cursor-pointer"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivacySettingsPage;
