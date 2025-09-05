// components/UserMenu.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomLink from '~/components/shared/loading/CustomLink';
import { useLogoutMutation } from '~/features/auth/authApi';

const UserMenu = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [logoutApi] = useLogoutMutation();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('authUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUsername(parsedUser.username);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logoutApi(); 
        } catch (err) {
            console.error("Logout API error:", err);
        }

        sessionStorage.removeItem('authUser');
        localStorage.removeItem('authUser');
        setUsername(null);
        setDropdownOpen(false);
    };

    if (!username) {
        return (
            <Link
                href="/login"
                className="flex items-center gap-1 hover:text-yellow-200 transition"
            >
                <AccountCircleIcon className="mr-1" />
                Đăng Nhập
            </Link>
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

                    <div className="w-40 bg-white text-black rounded shadow-lg flex flex-col">
                        {/* <Link href="/account/profile" className="px-4 py-2 hover:bg-gray-100 hover:text-red-500">
                            Profile
                        </Link> */}
                        <CustomLink href="/account/profile" className="px-4 py-2 hover:bg-gray-100 hover:text-red-500">Profile</CustomLink>

                        <Link href="/account/orders" className="px-4 py-2 hover:bg-gray-100 hover:text-red-500">
                            Orders
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-left px-4 py-2 hover:bg-gray-100 hover:text-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
