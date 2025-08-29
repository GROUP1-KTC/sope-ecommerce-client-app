import Link from 'next/link';
import Image from 'next/image';

interface EmailStepProps {
    input: { email: string };
    errors: { email: string };
    changeEventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleEmailSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EmailStep = ({
    input,
    errors,
    changeEventHandler,
    handleBlur,
    handleEmailSubmit,
}: EmailStepProps) => {
    return (
        <form onSubmit={handleEmailSubmit} className="mt-6 space-y-6">
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
                        placeholder="Enter your email"
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
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
            </div>
            <div className="!mt-6">
                <button
                    type="submit"
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-[#E44358] hover:bg-[#d0001a] focus:outline-none cursor-pointer"
                >
                    Continue
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
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-slate-900 font-medium shadow-sm transition cursor-pointer"
                        onClick={() => {
                            console.log('Google signup initiated');
                        }}
                    >
                        <Image
                            src="/assets/logo/google_logo.svg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Sign up with Google
                    </button>
                </div>
            </div>
            <p className="text-slate-900 text-sm !mt-6 text-center">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                    Sign in here
                </Link>
            </p>
        </form>
    );
};

export default EmailStep;
