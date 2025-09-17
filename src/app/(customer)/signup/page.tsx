'use client';

import { useState } from 'react';
import Image from 'next/image';
import EmailStep from '~/components/signup/EmailStepProps';
import VerificationCodeStep from '~/components/signup/VerificationCodeStepProps';
import PasswordStep from '~/components/signup/PasswordStep';
import {
    useLoginMutation,
    useRegisterMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
} from '~/features/auth/authApi';
import type { LoginResponse, RegisterRequest } from '~/types/auth/auth';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '~/hooks/useTypes';
import { setCredentials } from '~/features/auth/authSlice';
import type { ServerResponse } from '~/types/serverReponse';

const Signup = () => {
    const [input, setInput] = useState({
        email: '',
        verificationCode: '',
        fullName: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Step call API
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [register] = useRegisterMutation();

    // Login
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [errors, setErrors] = useState({
        email: '',
        verificationCode: '',
        fullName: '',
        gender: '',
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
            case 'fullName':
                if (!value) error = 'Full name is required';
                break;
            case 'gender':
                if (!value) error = 'Gender is required';
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

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const changeEventHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    };

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailError = validateField('email', input.email);
        setErrors((prev) => ({ ...prev, email: emailError }));

        if (emailError) return;

        try {
            const response = await sendOtp({ email: input.email }).unwrap();
            console.log('OTP sent:', response.data);
            setStep(2);
        } catch (err: any) {
            let errorMessage = 'Failed to send OTP';
            if ('data' in err && err.data) {
                const backendError = err.data as {
                    message?: string;
                    errors?: string[];
                };
                if (backendError.errors?.length) {
                    errorMessage = backendError.errors.join(', ');
                } else if (backendError.message) {
                    errorMessage = backendError.message;
                }
            }

            setErrors((prev) => ({ ...prev, email: errorMessage }));
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
            const response = await verifyOtp({
                email: input.email,
                otp: input.verificationCode,
            }).unwrap();

            console.log('OTP verified:', response.data);
            setStep(3);
        } catch (err: any) {
            let errorMessage = 'Invalid OTP';
            if ('data' in err && err.data) {
                const backendError = err.data as {
                    message?: string;
                    errors?: string[];
                };
                if (backendError.errors?.length) {
                    errorMessage = backendError.errors.join(', ');
                } else if (backendError.message) {
                    errorMessage = backendError.message;
                }
            }
            setErrors((prev) => ({ ...prev, verificationCode: errorMessage }));
        }
    };

    const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            fullName: validateField('fullName', input.fullName),
            gender: validateField('gender', input.gender),
            password: validateField('password', input.password),
            confirmPassword: validateField(
                'confirmPassword',
                input.confirmPassword,
            ),
        };
        setErrors((prev) => ({ ...prev, ...newErrors }));
        if (Object.values(newErrors).some((err) => err)) return;

        try {
            const genderMap: Record<string, 'MALE' | 'FEMALE' | 'OTHER'> = {
                male: 'MALE',
                female: 'FEMALE',
                other: 'OTHER',
            };

            const registerRequest: RegisterRequest = {
                username: input.email.split('@')[0],
                email: input.email,
                name: input.fullName,
                gender: genderMap[input.gender.toLowerCase()] || 'OTHER',
                password: input.password,
            };

            const response = await register(registerRequest).unwrap();

            // Login
            const res: ServerResponse<LoginResponse> =
                await login(input).unwrap();

            console.log('Response from server:', res.data);

            dispatch(setCredentials(res.data));
            router.push('/');

            console.log('Registered successfully:', response.data);
        } catch (err: any) {
            console.error('Signup error:', err);

            let errorMessage = 'Signup failed';
            if (err?.data) {
                const backendError = err.data as {
                    message?: string;
                    errors?: string[];
                };
                if (backendError.errors?.length) {
                    errorMessage = backendError.errors.join(', ');
                } else if (backendError.message) {
                    errorMessage = backendError.message;
                }
            }

            setErrors((prev) => ({ ...prev, general: errorMessage }));
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
                            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                <h1 className="text-slate-900 text-center text-3xl font-semibold">
                                    Sign Up
                                </h1>
                                {step === 1 && (
                                    <EmailStep
                                        input={input}
                                        errors={errors}
                                        changeEventHandler={changeEventHandler}
                                        handleBlur={handleBlur}
                                        handleEmailSubmit={handleEmailSubmit}
                                    />
                                )}
                                {step === 2 && (
                                    <VerificationCodeStep
                                        input={input}
                                        errors={errors}
                                        changeEventHandler={changeEventHandler}
                                        handleBlur={handleBlur}
                                        handleCodeSubmit={handleCodeSubmit}
                                        setStep={setStep}
                                    />
                                )}
                                {step === 3 && (
                                    <PasswordStep
                                        input={input}
                                        errors={errors}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                        showConfirmPassword={
                                            showConfirmPassword
                                        }
                                        setShowConfirmPassword={
                                            setShowConfirmPassword
                                        }
                                        changeEventHandler={changeEventHandler}
                                        handleBlur={handleBlur}
                                        handleSignupSubmit={handleSignupSubmit}
                                        setStep={setStep}
                                    />
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
