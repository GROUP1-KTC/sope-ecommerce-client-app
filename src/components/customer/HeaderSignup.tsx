import Image from 'next/image';

const HeaderSignup = () => {
    return (
        <header className="w-full flex items-center justify-between px-48 py-2 border-b border-orange-200 bg-white">
            <div className="flex items-center gap-2">
                {/* <Image src="/assets/logo/logo.svg" alt="Shopee Logo" width={32} height={32} /> */}
                <div className=" bg-[#e5471b] currentColor">
                    <Image
                        src="/assets/logo/logo.svg"
                        alt="Sope Logo"
                        width={100}
                        height={80}
                        className=""
                    />
                </div>
                {/* <span className="text-2xl font-semibold text-orange-500">Shopee</span> */}
                <span className="ml-2 text-lg font-medium text-gray-800">
                    Đăng ký
                </span>
            </div>
            <a href="#" className="text-sm text-orange-500 hover:underline">
                Bạn cần giúp đỡ?
            </a>
        </header>
    );
};

export default HeaderSignup;
