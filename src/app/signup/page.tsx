'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        phone: '',
        username: '',
        confirmpassword: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        phone: '',
        username: '',
        confirmpassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,11}$/;

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
            case 'confirmpassword':
                if (!value) error = 'Confirm Password is required';
                else if (value !== input.password)
                    error = 'Passwords do not match';
                break;
            case 'username':
                if (!value) error = 'Username is required';
                break;
            case 'phone':
                if (!value) error = 'Phone is required';
                else if (!phoneRegex.test(value))
                    error = 'Invalid phone number';
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

        // Nếu đang sửa password thì kiểm tra lại confirm password
        if (e.target.name === 'password') {
            const confirmError = validateField(
                'confirmpassword',
                input.confirmpassword,
            );
            setErrors((prev) => ({ ...prev, confirmpassword: confirmError }));
        }
    };

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            email: validateField('email', input.email),
            password: validateField('password', input.password),
            phone: validateField('phone', input.phone),
            username: validateField('username', input.username),
            confirmpassword: validateField(
                'confirmpassword',
                input.confirmpassword,
            ),
        };

        setErrors(newErrors);

        // Kiểm tra nếu có lỗi thì không submit
        if (Object.values(newErrors).some((err) => err)) return;

        try {
            setLoading(true);
            // await your signup logic here
            console.log('Signup successfully with', input);
        } catch (error) {
            console.error('Signup error', error);
        } finally {
            setLoading(false);
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
            {/* Signup Box */}
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 flex flex-col items-center">
                {/* Tabs */}
                <div className="flex w-full mb-6 border-b">
                    <button className="flex-1 py-2 font-semibold border-b-2 border-green-600 text-3xl text-red-800">
                        Sign up
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
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={input.email}
                            onChange={changeEventHandler}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={input.email}
                            onChange={changeEventHandler}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
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

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmpassword"
                            value={input.confirmpassword}
                            placeholder="Confirm Password"
                            onChange={changeEventHandler}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.confirmpassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmpassword}
                            </p>
                        )}

                        {input.confirmpassword ? (
                            <span
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                            >
                                {showConfirmPassword ? (
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
                        Sign in
                    </button>
                </form>
                {/* Links */}
                <div className="w-full flex justify-center gap-2 mt-4 text-md text-gray-500">
                    <span className="">You have an account</span>?
                    <Link href="/login" className="text-red-400 ml-1">
                        Login
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

export default Signup;
