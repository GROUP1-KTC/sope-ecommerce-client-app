'use client';

import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from './Loading';

interface CustomLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
}

export default function CustomLink({
    children,
    href,
    className,
    ...props
}: CustomLinkProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setLoading(true);
        router.push(href.toString());
    };

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [pathname]);

    return (
        <>
            <Link
                href={href}
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Link>

            {loading && <Loading message="Đang chuyển trang..." />}
        </>
    );
}
