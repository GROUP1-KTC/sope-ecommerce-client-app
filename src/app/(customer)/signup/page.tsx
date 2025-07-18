'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

const Signup = () => {
    const [input, setInput] = useState({
        email: '',
        verificationCode: '',
        password: '',
        confirmPassword: '',
    });

    const [step, setStep] = useState(1); // Track current step: 1 (email), 2 (verification code), 3 (passwords)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({
        email: '',
        verificationCode: '',
        password: '',
        confirmPassword: '',
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const codeRegex = /^\d{6}$/; // 6-digit code

    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'email':
                if (!value) error = 'Email is required';
                else if (!emailRegex.test(value))
                    error = 'Invalid email format';
                break;
            case 'verificationCode':
                if (!value) error = 'Verification code is required';
                else if (!codeRegex.test(value))
                    error = 'Code must be 6 digits';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                break;
            case 'confirmPassword':
                if (!value) error = 'Confirm password is required';
                else if (value !== input.password)
                    error = 'Passwords do not match';
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

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailError = validateField('email', input.email);
        setErrors((prev) => ({ ...prev, email: emailError }));

        if (emailError) return;

        try {
            // Simulate sending verification code to email
            console.log('Sending verification code to', input.email);
            setStep(2); // Move to verification code step
        } catch (error) {
            console.error('Error sending verification code', error);
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const codeError = validateField(
            'verificationCode',
            input.verificationCode,
        );
        setErrors((prev) => ({ ...prev, verificationCode: codeError }));

        if (codeError) return;

        try {
            // Simulate verifying the code
            console.log('Verifying code', input.verificationCode);
            setStep(3); // Move to password step
        } catch (error) {
            console.error('Verification error', error);
        }
    };

    const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            password: validateField('password', input.password),
            confirmPassword: validateField(
                'confirmPassword',
                input.confirmPassword,
            ),
        };

        setErrors((prev) => ({ ...prev, ...newErrors }));

        if (Object.values(newErrors).some((err) => err)) return;

        try {
            console.log('Signup successfully with', {
                email: input.email,
                password: input.password,
            });
        } catch (error) {
            console.error('Signup error', error);
        }
    };

    return (
        <div className="min-h-[80vh] bg-[#d0001a] text-gray-900 flex justify-center">
            <div className="max-w-screen-lg mx-8 bg-white sm:rounded-lg flex justify-center flex-1">
                <div className="w-4/7 bg-[#d0001a] text-center hidden lg:flex items-center justify-center">
                    <Image
                        src="/assets/logo/logo.svg"
                        alt="Sope Logo"
                        width={300}
                        height={130}
                        className="h-24 sm:h-48 w-auto"
                    />
                </div>
                <div className="bg-gray-50 flex-1">
                    <div className="min-h-[85vh] bg-[#d0001a] flex flex-col items-center justify-center px-4">
                        <div className="max-w-[600px] w-full">
                            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                <h1 className="text-slate-900 text-center text-3xl font-semibold">
                                    Đăng ký
                                </h1>
                                {step === 1 && (
                                    <form
                                        onSubmit={handleEmailSubmit}
                                        className="mt-6 space-y-6"
                                    >
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
                                                    placeholder="Nhập email"
                                                    value={input.email}
                                                    onChange={
                                                        changeEventHandler
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#bbb"
                                                    stroke="#bbb"
                                                    className="w-4 h-4 absolute right-4"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        cx="10"
                                                        cy="7"
                                                        r="6"
                                                        data-original="#000000"
                                                    ></circle>
                                                    <path
                                                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                        data-original="#000000"
                                                    ></path>
                                                </svg>
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div className="!mt-6">
                                            <button
                                                type="submit"
                                                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                                            >
                                                Tiếp tục
                                            </button>
                                        </div>
                                        <div className="flex items-center my-4">
                                            <div className="flex-grow h-px bg-gray-200"></div>
                                            <span className="mx-4 text-gray-400 text-sm font-medium">
                                                HOẶC
                                            </span>
                                            <div className="flex-grow h-px bg-gray-200"></div>
                                        </div>
                                        <div>
                                            <div className="flex flex-col items-center">
                                                <button
                                                    type="button"
                                                    className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-slate-900 font-medium shadow-sm transition cursor-pointer"
                                                    onClick={() => {
                                                        // Google signup logic
                                                        console.log(
                                                            'Google signup initiated',
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        src="/assets/logo/google_logo.svg"
                                                        alt="Google"
                                                        width={20}
                                                        height={20}
                                                        className="mr-2"
                                                    />
                                                    Đăng ký với Google
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-slate-900 text-sm !mt-6 text-center">
                                            Đã có tài khoản?{' '}
                                            <Link
                                                href="/login"
                                                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                            >
                                                Đăng nhập ở đây
                                            </Link>
                                        </p>
                                    </form>
                                )}
                                {step === 2 && (
                                    <form
                                        onSubmit={handleCodeSubmit}
                                        className="mt-6 space-y-6"
                                    >
                                        <div>
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                                Mã xác nhận
                                            </label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="verificationCode"
                                                    type="text"
                                                    required
                                                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                                    placeholder="Nhập mã xác nhận (6 chữ số)"
                                                    value={
                                                        input.verificationCode
                                                    }
                                                    onChange={
                                                        changeEventHandler
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#bbb"
                                                    stroke="#bbb"
                                                    className="w-4 h-4 absolute right-4"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.17-5.24l-1.41 1.41L12 13.41l-2.76 2.76-1.41-1.41L10.59 12l-2.76-2.76 1.41-1.41L12 10.59l2.76-2.76 1.41 1.41L13.41 12l2.76 2.76z" />
                                                </svg>
                                            </div>
                                            {errors.verificationCode && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.verificationCode}
                                                </p>
                                            )}
                                        </div>
                                        <div className="!mt-6">
                                            <button
                                                type="submit"
                                                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                        <p className="text-slate-900 text-sm !mt-6 text-center">
                                            <button
                                                type="button"
                                                className="text-blue-600 hover:underline font-semibold cursor-pointer"
                                                onClick={() => setStep(1)}
                                            >
                                                Quay lại
                                            </button>
                                        </p>
                                    </form>
                                )}
                                {step === 3 && (
                                    <form
                                        onSubmit={handleSignupSubmit}
                                        className="mt-6 space-y-6"
                                    >
                                        <div>
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                                Mật khẩu
                                            </label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="password"
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    required
                                                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                                    placeholder="Nhập mật khẩu"
                                                    value={input.password}
                                                    onChange={
                                                        changeEventHandler
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                                <span
                                                    className="absolute right-4 cursor-pointer"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prev) => !prev,
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff
                                                            size={16}
                                                            color="#bbb"
                                                        />
                                                    ) : (
                                                        <Eye
                                                            size={16}
                                                            color="#bbb"
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                            {errors.password && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                                Xác nhận mật khẩu
                                            </label>
                                            <div className="relative flex items-center">
                                                <input
                                                    name="confirmPassword"
                                                    type={
                                                        showConfirmPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    required
                                                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                                    placeholder="Xác nhận mật khẩu"
                                                    value={
                                                        input.confirmPassword
                                                    }
                                                    onChange={
                                                        changeEventHandler
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                                <span
                                                    className="absolute right-4 cursor-pointer"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            (prev) => !prev,
                                                        )
                                                    }
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff
                                                            size={16}
                                                            color="#bbb"
                                                        />
                                                    ) : (
                                                        <Eye
                                                            size={16}
                                                            color="#bbb"
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.confirmPassword}
                                                </p>
                                            )}
                                        </div>

                                        <div className="!mt-6">
                                            <button
                                                type="submit"
                                                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                                            >
                                                Đăng ký
                                            </button>
                                        </div>
                                        <p className="text-slate-900 text-sm !mt-6 text-center">
                                            <button
                                                type="button"
                                                className="text-blue-600 hover:underline font-semibold cursor-pointer"
                                                onClick={() => setStep(2)}
                                            >
                                                Quay lại
                                            </button>
                                        </p>
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

export default Signup;