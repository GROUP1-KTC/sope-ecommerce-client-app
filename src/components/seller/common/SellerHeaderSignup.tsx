import Image from 'next/image';

const SellerSignupHeader = () => {
    return (
        <header className="w-full flex items-center justify-between py-2 px-40 bg-white">
            <div className="flex items-center gap-2">
                <Image
                    src="/logoSope.png"
                    alt="Shopee Logo"
                    width={120}
                    height={120}
                />
                <span className="ml-3 text-2xl font-medium text-[#ee4d2d]">
                    Đăng ký trở thành người bán hàng
                </span>
            </div>
            <div>
                <span className="text-xl text-[#ee4d2d]">Do you need help ?</span>
            </div>
        </header>
    );
};

export default SellerSignupHeader;
