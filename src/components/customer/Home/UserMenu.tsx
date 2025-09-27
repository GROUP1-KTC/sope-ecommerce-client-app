// components/UserMenu.tsx
'use client';

import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomLink from '~/components/shared/loading/CustomLink';
import { useLogoutMutation } from '~/features/auth/authApi';
import { clearAuthUser, loadAuthUser } from '~/utils/authCookie';
import { useRouter } from 'next/navigation';

const UserMenu = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [logoutApi] = useLogoutMutation();
    const router = useRouter();

    useEffect(() => {
        const storedUser = loadAuthUser();
        if (storedUser) {
            setUsername(storedUser.username);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logoutApi();
        } catch (err) {
            console.error('Logout API error:', err);
        }

        clearAuthUser();
        setUsername(null);
        setDropdownOpen(false);
        router.push('/');
    };

    if (!username) {
        return (
            <CustomLink
                href="/login"
                className="flex items-center gap-1 hover:text-yellow-200 transition"
            >
                <AccountCircleIcon className="mr-1" />
                Đăng Nhập
            </CustomLink>
        );
    }

    return (
        <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="relative cursor-pointer inline-block"
        >
            <span className="flex items-center gap-1">
                <AccountCircleIcon className="mr-1" />
                {username}
            </span>

            {dropdownOpen && (
                <div className="absolute right-0 top-full z-50 flex flex-col">
                    <div className="h-2 w-full pointer-events-auto" />
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white self-end mr-3 -mt-2"></div>

                    <div className="w-40 bg-white text-black rounded shadow-lg flex flex-col ">
                        <CustomLink
                            href="/account/profile"
                            className="px-4 py-2 hover:bg-gray-100 hover:text-red-500 rounded-t"
                        >
                            Hồ Sơ
                        </CustomLink>

                        <CustomLink
                            href="/account/orders"
                            className="px-4 py-2 hover:bg-gray-100 hover:text-red-500"
                        >
                            Đơn Hàng
                        </CustomLink>
                        <button
                            onClick={handleLogout}
                            className="text-left px-4 py-2 hover:bg-gray-100 hover:text-red-500 rounded-b cursor-pointer"
                        >
                            Đăng Xuất
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
