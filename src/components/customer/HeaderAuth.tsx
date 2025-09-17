import Image from 'next/image';
import { colors } from '~/constants/color.constant';
import CustomLink from '../shared/loading/CustomLink';

const Header = ({ title }: { title: string }) => {
    return (
        <header className="bg-white text-[#d0001a] w-full px-4 sm:px-8 md:px-20 lg:px-40">
            {/* Main bar */}
            <div className="flex items-center justify-between py-2 sm:py-2 flex-wrap">
                {/* Left side */}
                <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                    <CustomLink href="/">
                        <Image
                            src="/assets/logo/logo_red.svg"
                            alt="Sope Logo"
                            width={220}
                            height={94}
                            className="h-12 sm:h-16 w-auto"
                        />
                    </CustomLink>
                    <p className="text-black font-normal text-xs sm:text-2xl ">
                        {title}
                    </p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4 mt-2 sm:mt-0 ml-auto">
                    <CustomLink
                        href="/help"
                        className={`text-[${colors.primary.main}] hover:text-black text-sm hidden sm:inline-block`}
                    >
                        Do you need help ?
                    </CustomLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
