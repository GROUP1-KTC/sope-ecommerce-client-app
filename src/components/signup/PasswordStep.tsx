import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface PasswordStepProps {
    input: {
        fullName: string;
        gender: string;
        password: string;
        confirmPassword: string;
    };
    errors: {
        fullName: string;
        gender: string;
        password: string;
        confirmPassword: string;
    };
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (value: boolean) => void;
    changeEventHandler: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    handleBlur: (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    handleSignupSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setStep: (step: number) => void;
}

const PasswordStep = ({
    input,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    changeEventHandler,
    handleBlur,
    handleSignupSubmit,
    // setStep,
}: PasswordStepProps) => {
    return (
        <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Full Name
                </label>
                <div className="relative flex items-center">
                    <input
                        name="fullName"
                        type="text"
                        required
                        className={`w-full text-slate-900 text-sm border px-4 py-3 pr-8 rounded-md outline-blue-600 
              ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                        placeholder="Enter your full name"
                        value={input.fullName}
                        onChange={changeEventHandler}
                        onBlur={handleBlur}
                    />
                    {errors.fullName && (
                        <div className="group absolute right-2 cursor-help">
                            <AlertCircle size={18} className="text-red-500" />
                            <span className="absolute -top-8 right-0 hidden group-hover:block bg-red-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow">
                                {errors.fullName}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Gender */}
            <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Gender
                </label>
                <div className="w-full flex rounded-lg overflow-hidden border border-slate-300">
                    {['MALE', 'FEMALE', 'OTHER'].map((g) => (
                        <button
                            key={g}
                            type="button"
                            onClick={() =>
                                changeEventHandler({
                                    target: { name: 'gender', value: g },
                                } as any)
                            }
                            className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-all
        ${
            input.gender === g
                ? g === 'MALE'
                    ? 'bg-blue-600 text-white shadow-md'
                    : g === 'FEMALE'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100'
        }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                {/* Error icon */}
                {errors.gender && (
                    <div className="flex items-center mt-2 text-red-500 text-sm gap-1">
                        <AlertCircle size={16} /> {errors.gender}
                    </div>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Password
                </label>
                <div className="relative flex items-center">
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        className={`w-full text-slate-900 text-sm border px-4 py-3 pr-16 rounded-md outline-blue-600
              ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
                        placeholder="Enter your password"
                        value={input.password}
                        onChange={changeEventHandler}
                        onBlur={handleBlur}
                    />

                    <span
                        className="absolute right-8 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff size={16} color="#bbb" />
                        ) : (
                            <Eye size={16} color="#bbb" />
                        )}
                    </span>

                    {errors.password && (
                        <div className="group absolute right-1 cursor-help">
                            <AlertCircle size={18} className="text-red-500" />
                            <span className="absolute -top-8 right-0 hidden group-hover:block bg-red-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow">
                                {errors.password}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Confirm Password
                </label>
                <div className="relative flex items-center">
                    <input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className={`w-full text-slate-900 text-sm border px-4 py-3 pr-16 rounded-md outline-blue-600
              ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'}`}
                        placeholder="Confirm password"
                        value={input.confirmPassword}
                        onChange={changeEventHandler}
                        onBlur={handleBlur}
                    />

                    {/* Toggle show/hide */}
                    <span
                        className="absolute right-8 cursor-pointer"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={16} color="#bbb" />
                        ) : (
                            <Eye size={16} color="#bbb" />
                        )}
                    </span>

                    {/* Error icon */}
                    {errors.confirmPassword && (
                        <div className="group absolute right-1 cursor-help">
                            <AlertCircle size={18} className="text-red-500" />
                            <span className="absolute -top-8 right-0 hidden group-hover:block bg-red-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow">
                                {errors.confirmPassword}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="!mt-6">
                <button
                    type="submit"
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default PasswordStep;
