'use client';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useChangePasswordMutation } from '~/features/auth/authApi';

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [message, setMessage] = useState('');
    const [changePassword] = useChangePasswordMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận không khớp.');
            return;
        }

        try {
            await changePassword({
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            }).unwrap();

            setMessage('Đổi mật khẩu thành công!');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err: any) {
            setMessage(err?.data?.message || 'Đổi mật khẩu thất bại.');
        }
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 pl-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="text-xl font-semibold text-black uppercase mb-2">
                            Đổi mật khẩu
                        </div>
                        <p className="text-sl text-gray-600 mb-4">
                            Để bảo mật tài khoản của bạn, không chia sẻ mật khẩu
                            với bất kỳ ai và sử dụng mật khẩu mạnh.
                        </p>
                        <hr className="my-4 border-gray-300" />

                        <form
                            onSubmit={handleSubmit}
                            className="max-w-md mx-auto space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu hiện tại
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword.current
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-red-300 pr-10"
                                    />
                                    <span
                                        className="absolute top-2/4 right-3 -translate-y-2/4 text-gray-600 cursor-pointer"
                                        onClick={() =>
                                            toggleVisibility('current')
                                        }
                                    >
                                        {showPassword.current ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu mới
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword.new
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-red-300 pr-10"
                                    />
                                    <span
                                        className="absolute top-2/4 right-3 -translate-y-2/4 text-gray-600 cursor-pointer"
                                        onClick={() => toggleVisibility('new')}
                                    >
                                        {showPassword.new ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Xác nhận mật khẩu mới
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword.confirm
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-red-300 pr-10"
                                    />
                                    <span
                                        className="absolute top-2/4 right-3 -translate-y-2/4 text-gray-600 cursor-pointer"
                                        onClick={() =>
                                            toggleVisibility('confirm')
                                        }
                                    >
                                        {showPassword.confirm ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </span>
                                </div>
                            </div>

                            {message && (
                                <p
                                    className={`text-sm ${
                                        message.startsWith('✅')
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition hover:shadow-md cursor-pointer"
                            >
                                Đổi mật khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
