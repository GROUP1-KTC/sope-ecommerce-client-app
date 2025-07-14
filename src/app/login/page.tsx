'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'email':
                if (!value) error = 'Email is required';
                else if (!emailRegex.test(value))
                    error = 'Invalid email format';
                break;
            case 'password':
                if (!value) error = 'Password is required';
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
        setErrors((prev) => ({ ...prev, [e.target.name]: '' })); // Xóa lỗi khi người dùng đang sửa
    };

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: validateField('email', input.email),
            password: validateField('password', input.password),
        };

        setErrors(newErrors);

        // Kiểm tra nếu có lỗi thì không submit
        if (Object.values(newErrors).some((err) => err)) return;

        try {
            console.log('Signup successfully with', input);
        } catch (error) {
            console.error('Signup error', error);
        }
    };

    return (
        <div className="py-4 mt-4 flex flex-col items-center justify-center bg-white">
            {/* Logo */}
            <div className="mb-6">
                <h1 className="text-5xl font-extrabold text-green-600 tracking-wide">
                    NAVER
                </h1>
            </div>
            {/* Login Box */}
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 flex flex-col items-center">
                {/* Tabs */}
                <div className="flex w-full mb-6 border-b">
                    <button className="flex-1 py-2 font-semibold border-b-2 border-green-600 text-green-600">
                        Email/Phone number
                    </button>
                    <button className="flex-1 py-2 font-semibold text-gray-400">
                        QR code
                    </button>
                </div>
                {/* Form */}
                <form
                    onSubmit={loginHandler}
                    className="w-full flex flex-col gap-4"
                >
                    <div className="relative">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={input.email}
                            onChange={changeEventHandler}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm ">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            onBlur={handleBlur}
                            placeholder="Password"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}

                        {input.password ? (
                            <span
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 py-3 bg-gray-300 text-white font-semibold rounded-md cursor-not-allowed"
                    >
                        Login
                    </button>
                </form>
                {/* Links */}
                <div className="w-full flex justify-center gap-2 mt-4 text-md text-gray-500">
                    <a href="#" className="underline mr-2">
                        Forget Password
                    </a>
                    |
                    <Link href="/signup" className="underline ml-1">
                        Sign up
                    </Link>
                </div>
                {/* Social Buttons */}
                <div className="w-full flex gap-4 mt-8">
                    <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-3 font-semibold bg-white shadow">
                        <span className="bg-blue-600 text-white rounded px-2 py-1">
                            f
                        </span>{' '}
                        Facebook
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-3 font-semibold bg-white shadow">
                        <span className="bg-red-500 text-white rounded px-2 py-1">
                            GOOGLE
                        </span>{' '}
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
