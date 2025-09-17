'use client';

import Link, { type LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SxProps, Theme, Box } from '@mui/material';
import Loading from './Loading';

interface CustomLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    sx?: SxProps<Theme>; 
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
}

export default function CustomLink({
    children,
    href,
    className,
    style,
    sx,
    target,
    rel,
    ...props
}: CustomLinkProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (target !== '_blank') {
            e.preventDefault();
            setLoading(true);
            router.push(href.toString());
        }
    };

    useEffect(() => {
        if (loading) setLoading(false);
    }, [pathname]);

    return (
        <>
            <Box
                component={Link}
                href={href}
                className={className}
                style={style}
                sx={sx}
                target={target}
                rel={rel}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Box>

            {loading && <Loading message="Đang chuyển trang..." />}
        </>
    );
}
