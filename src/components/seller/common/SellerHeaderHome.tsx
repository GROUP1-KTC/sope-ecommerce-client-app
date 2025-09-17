'use client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import Link from 'next/link';
import QuickMenu from './QuickMenu';
import CustomLink from '~/components/shared/loading/CustomLink';

export default function SellerHeaderHome() {
    return (
        <header className="flex justify-between items-center p-2 px-10 bg-white shadow">
            <div className="flex items-center justify-between gap-2 text-lg font-semibold">
                <CustomLink href="/seller" className=" red transition">
                    <Image
                        src="/assets/logo/logo_red.svg"
                        alt="Sope Logo"
                        width={150}
                        height={60}
                        className="h-12 sm:h-16 w-auto"
                    />
                </CustomLink>
                Seller Channel
            </div>

            <div className="flex items-center gap-2 ">
                <QuickMenu />

                <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer transition">
                    <AccountCircleIcon />
                    <span className="text-sm font-medium">haicute</span>
                </div>
            </div>
        </header>
    );
}
