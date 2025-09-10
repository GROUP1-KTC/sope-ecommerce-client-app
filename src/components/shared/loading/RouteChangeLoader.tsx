'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loading from './Loading';

const RouteChangeLoader: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timeout);
    }, [pathname]);

    if (!loading) return null;
    return <Loading message="Đang chuyển trang..." />;
};

export default RouteChangeLoader;
