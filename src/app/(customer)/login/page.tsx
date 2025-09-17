'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

import type { LoginInput, LoginErrors } from '~/types/auth/auth';
import { useLoginMutation } from '~/features/auth/authApi';
import { useAppDispatch } from '~/hooks/useTypes';
import { useRouter } from 'next/navigation';
import type { LoginResponse } from '~/types/auth/auth';
import { setCredentials } from '~/features/auth/authSlice';
import type { ServerResponse } from '~/types/serverReponse';
import CustomLink from '~/components/shared/loading/CustomLink';

const Login = () => {
    const [input, setInput] = useState<LoginInput>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState<LoginErrors>({
        email: '',
        password: '',
    });

    const [serverError, setServerError] = useState<string>('');


    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

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
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: LoginErrors = {
            email: validateField('email', input.email),
            password: validateField('password', input.password),
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        try {
            const res: ServerResponse<LoginResponse> =
                await login(input).unwrap();

            dispatch(setCredentials(res.data));
            const roles = res.data.roles;
            if (roles.includes('ADMIN')) {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (err: any) {
            if (err?.data?.errors && Array.isArray(err.data.errors)) {
                setServerError(err.data.errors.join(', '));
            } else if (err?.data?.message) {
                setServerError(err.data.message);
            } else {
                setServerError('Login failed, please try again.');
            }
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
                        Leading e-commerce platform in District 7
                    </p>
                </div>
                <div className="bg-gray-50 flex-1">
                    <div className="min-h-[85vh] bg-[#d0001a] flex flex-col items-center justify-center px-4">
                        <div className="max-w-[600px] w-full">
                            <div className="px-6 py-4 sm:px-8 sm:py-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                <h1 className="text-slate-900 text-center text-3xl font-semibold">
                                    Sign In
                                </h1>
                                <form
                                    onSubmit={loginHandler}
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
                                    {serverError && <p className="text-red-500 mt-1">{serverError}</p>}
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-3 block text-sm text-slate-900 cursor-pointer"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                        <div className="text-sm">
                                            <CustomLink
                                                href="/forgot-password"
                                                className="text-blue-600 hover:underline font-semibold"
                                            >
                                                Forgot password?
                                            </CustomLink>
                                        </div>
                                    </div>
                                    <div className="!mt-6">
                                        <button
                                            type="submit"
                                            className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                    <div className="flex items-center my-4">
                                        <div className="flex-grow h-px bg-gray-200"></div>
                                        <span className="mx-4 text-gray-400 text-sm font-medium">
                                            OR
                                        </span>
                                        <div className="flex-grow h-px bg-gray-200"></div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col items-center">
                                            <button
                                                type="button"
                                                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-100 text-slate-900 font-medium shadow-sm transition"
                                                onClick={() => {
                                                    // Replace with your Google login logic
                                                }}
                                            >
                                                <Image
                                                    src="/assets/logo/google_logo.svg"
                                                    alt="Google"
                                                    width={20}
                                                    height={20}
                                                    className="mr-2"
                                                />
                                                Sign in with Google
                                            </button>
                                        </div>
                                    </div>
                                    <span className="text-slate-900 text-sm !mt-6 text-center">
                                        Don't have an account yet ?{' '}
                                        <CustomLink
                                            href="/signup"
                                            className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                        >
                                            Sign up here
                                        </CustomLink>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
