'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const ResetPassword = () => {
    const [input, setInput] = useState({
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    });

    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'password':
                if (!value) error = 'Password is required';
                break;
            case 'confirmPassword':
                if (!value) error = 'Confirm Password is required';
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

    const resetPasswordHandler = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const newErrors = {
            password: validateField('password', input.password),
            confirmPassword: validateField(
                'confirmPassword',
                input.confirmPassword,
            ),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        try {
            alert('Password reset successfully');
            redirect('/');
        } catch (error) {
            console.error('Reset password error', error);
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
                        Nền tảng thương mại điện tử hàng đầu quận 7
                    </p>
                </div>
                <div className="bg-gray-50 flex-1">
                    <div className="min-h-[85vh] bg-[#d0001a] flex flex-col items-center justify-center px-4">
                        <div className="max-w-[600px] w-full">
                            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                <h1 className="text-slate-900 text-center text-3xl font-semibold">
                                    Reset Password
                                </h1>
                                <form
                                    onSubmit={resetPasswordHandler}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <label className="text-slate-900 text-sm font-medium mb-2 block">
                                            Password
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
                                                placeholder="Enter password"
                                                value={input.password}
                                                onChange={changeEventHandler}
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
                                            Confirm Password
                                        </label>
                                        <div className="relative flex items-center">
                                            <input
                                                name="confirmPassword"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                required
                                                className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                                placeholder="Enter confirm password"
                                                value={input.confirmPassword}
                                                onChange={changeEventHandler}
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
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
