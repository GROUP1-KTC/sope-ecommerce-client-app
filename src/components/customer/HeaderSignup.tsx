import StorefrontIcon from '@mui/icons-material/Storefront';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="bg-white text-[#d0001a] w-full px-4 sm:px-8 md:px-20 lg:px-40">
            {/* Main bar */}
            <div className="flex items-center justify-between py-2 sm:py-2 flex-wrap">
                {/* Left side */}
                <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                    <Link href="/">
                        <Image
                            src="/assets/logo/logo_red.svg"
                            alt="Sope Logo"
                            width={220}
                            height={94}
                            className="h-12 sm:h-16 w-auto"
                        />
                    </Link>
                    <p className="text-black font-normal text-xs sm:text-2xl ">
                        Đăng ký
                    </p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4 mt-2 sm:mt-0 ml-auto">
                    <Link
                        href="/help"
                        className="text-[#d0001a] hover:text-gray-200 text-sm hidden sm:inline-block"
                    >
                        Bạn cần giúp đỡ?
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
