interface VerificationCodeStepProps {
    input: { verificationCode: string };
    errors: { verificationCode: string };
    changeEventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleCodeSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setStep: (step: number) => void;
}

const VerificationCodeStep = ({
    input,
    errors,
    changeEventHandler,
    handleBlur,
    handleCodeSubmit,
    setStep,
}: VerificationCodeStepProps) => {
    return (
        <form onSubmit={handleCodeSubmit} className="mt-6 space-y-6">
            <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                    OTP Verification Code
                </label>
                <p className="text-slate-600 text-sm mb-2">
                    OTP has been sent to your email. Please enter the 6-digit code below.
                </p>
                <div className="relative flex items-center">
                    <input
                        name="verificationCode"
                        type="text"
                        required
                        className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                        placeholder="Enter OTP (6 digits)"
                        value={input.verificationCode}
                        onChange={changeEventHandler}
                        onBlur={handleBlur}
                    />
                </div>
                {errors.verificationCode && (
                    <p className="text-red-500 text-sm mt-2">{errors.verificationCode}</p>
                )}
                <p className="text-slate-600 text-sm mt-4">
                    Didn't receive the email?{' '}
                    <button
                        type="button"
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Resend OTP
                    </button>
                </p>
            </div>
            <div className="!mt-6">
                <button
                    type="submit"
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                >
                    Confirm
                </button>
            </div>
            <p className="text-slate-900 text-sm !mt-6 text-center">
                <button
                    type="button"
                    className="text-blue-600 hover:underline font-semibold cursor-pointer"
                    onClick={() => setStep(1)}
                >
                    Back
                </button>
            </p>
        </form>
    );
};

export default VerificationCodeStep;