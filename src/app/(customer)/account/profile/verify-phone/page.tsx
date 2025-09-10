'use client';
import { useState } from 'react';

const VerifyPhonePage = () => {
    const [input, setInput] = useState({ verificationCode: '' });
    const [errors, setErrors] = useState<{ verificationCode: string }>({
        verificationCode: '',
    });

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        if (e.target.value.length !== 6) {
            setErrors({ verificationCode: 'OTP phải có 6 chữ số' });
        } else {
            setErrors({ verificationCode: '' });
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value.length !== 6) {
            setErrors({ verificationCode: 'OTP phải có 6 chữ số' });
        }
    };

    const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!errors.verificationCode && input.verificationCode) {
            console.log('Submit OTP:', input.verificationCode);
            // TODO: call API verify OTP
        }
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-[80vh] bg-gray-50 px-0 sm:px-4 md:px-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <div className="text-xl font-semibold text-black uppercase">
                            Xác thực số điện thoại
                        </div>
                        <div className="text-gray-600 mb-4">
                            OTP đã được gửi đến số điện thoại của bạn. Vui lòng
                            nhập mã bên dưới.
                        </div>
                        <hr className="my-4 border-gray-300" />

                        <form
                            onSubmit={handleCodeSubmit}
                            className="px-4 md:px-8 space-y-6"
                        >
                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">
                                    Mã OTP
                                </label>
                                <input
                                    name="verificationCode"
                                    type="text"
                                    required
                                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                                    placeholder="Nhập OTP (6 chữ số)"
                                    value={input.verificationCode}
                                    onChange={changeEventHandler}
                                    onBlur={handleBlur}
                                />
                                {errors.verificationCode && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.verificationCode}
                                    </p>
                                )}
                            </div>

                            <p className="text-slate-600 text-sm">
                                Không nhận được SMS?{' '}
                                <button
                                    type="button"
                                    onClick={() =>
                                        console.log('Resend OTP SMS')
                                    }
                                    className="text-blue-600 hover:underline font-semibold"
                                >
                                    Gửi lại OTP
                                </button>
                            </p>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                                >
                                    Xác nhận
                                </button>
                            </div>

                            <p className="text-slate-900 text-sm text-center">
                                <button
                                    type="button"
                                    className="text-blue-600 hover:underline font-semibold cursor-pointer"
                                    onClick={() => history.back()}
                                >
                                    Quay lại
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyPhonePage;
