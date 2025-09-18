'use client';

import { useState } from 'react';
import Image from 'next/image';
import CustomLink from '~/components/shared/loading/CustomLink';
import { useResetPasswordMutation, useSendForgotPasswordOtpMutation } from '~/features/auth/authApi';
import { useAlertStore } from '~/store/zustand/alertStore';
import { useRouter } from 'next/navigation';
const RecoverPassword = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
    });

    const [loading, setLoading] = useState(false);

    const [sendOtp] = useSendForgotPasswordOtpMutation();
    const [resetPassword] = useResetPasswordMutation();

    const [step, setStep] = useState<'email' | 'reset'>('email');
    const [otp, setOtp] = useState('');

    const router = useRouter();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'email':
                if (!value) error = 'Email is required';
                else if (!emailRegex.test(value)) error = 'Invalid email format';
                break;
        }
        return error;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const forgotPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: validateField('email', input.email),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        try {
            console.log('Login successfully with', input);
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const handleSendOtp = async () => {
        if (!input.email) return setErrors({ email: 'Email không được để trống' });
        setLoading(true);
        try {
            await sendOtp({ email: input.email }).unwrap();
            setStep('reset');
        } catch (err: any) {
            setErrors({ email: err?.data?.message || 'Lỗi khi gửi OTP' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !input.password) return;
        setLoading(true);
        try {
            await resetPassword({ email: input.email, otp, newPassword: input.password }).unwrap();
            useAlertStore.getState().showAlert({
                            severity: 'success',
                            message: 'Đổi mật khẩu thành công!',
                        });
            setStep('email');
            setInput({ email: '', password: '' });
            setOtp('');
            await new Promise((resolve) => setTimeout(resolve, 3000));
            router.push('/login');
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] bg-[#d0001a] text-gray-900 flex justify-center">
            <div className="max-w-screen-lg mx-8 bg-white sm:rounded-lg flex justify-center flex-1">
                <div className="w-4/7 bg-[#d0001a] text-center hidden lg:flex items-center justify-center flex-col">
                    <Image
                        src="/assets/logo/logo.svg"
                        alt="Sope Logo"
                        width={300}
                        height={130}
                        className="h-24 sm:h-48 w-auto"
                    />
                    <p className="text-white text-xl font-semibold mt-4">
                        Leading e-commerce platform in District 7, HCM City
                    </p>
                </div>
                <div className="bg-gray-50 flex-1">
                    <div className="min-h-[85vh] bg-[#d0001a] flex flex-col items-center justify-center px-4">
                        <div className="max-w-[600px] w-full">
                            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                <h1 className="text-slate-900 text-center text-3xl font-semibold">
                                    Recover Password
                                </h1>

                                {step === 'reset' ? (
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                                OTP
                                            </label>
                                            <input
                                                name="otp"
                                                type="text"
                                                className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                                New Password
                                            </label>
                                            <input
                                                name="password"
                                                type="password"
                                                className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                                                placeholder="Enter new password"
                                                value={input.password}
                                                onChange={changeEventHandler}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleResetPassword}
                                            disabled={loading}
                                            className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer flex justify-center items-center gap-2"
                                        >
                                            {loading && (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                </svg>
                                            )}
                                            Reset Password
                                        </button>


                                        <span className="text-slate-900 text-sm !mt-6 text-center block">
                                            Nhập sai email?{' '}
                                            <button
                                                type="button"
                                                onClick={() => setStep('email')}
                                                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                            >
                                                Quay lại
                                            </button>
                                        </span>
                                    </div>
                                ) : (
                                    <form onSubmit={forgotPasswordHandler} className="mt-6 space-y-6">
                                        <div>
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                                Email
                                            </label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="email"
                                                    type="text"
                                                    required
                                                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                                    placeholder="Enter email"
                                                    value={input.email}
                                                    onChange={changeEventHandler}
                                                    onBlur={handleBlur}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#bbb"
                                                    stroke="#bbb"
                                                    className="w-4 h-4 absolute right-4"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle cx="10" cy="7" r="6"></circle>
                                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                                                </svg>
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-3">{errors.email}</p>
                                            )}
                                        </div>

                                        <div className="!mt-6">
                                            <button
                                                type="button"
                                                onClick={handleSendOtp}
                                                disabled={loading}
                                                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer flex justify-center items-center gap-2"
                                            >
                                                {loading && (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                    </svg>
                                                )}
                                                Send me a reset password email
                                            </button>

                                        </div>

                                        <span className="text-slate-900 text-sm !mt-6 text-center w-full block">
                                            Đã nhớ mật khẩu?{' '}
                                            <CustomLink
                                                href="/login"
                                                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                            >
                                                Đăng nhập tại đây
                                            </CustomLink>
                                        </span>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword;
