'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors } from '~/constants/color.constant';
import CustomLink from '~/components/shared/loading/CustomLink';

const NotFound: React.FC = () => {
    const [countdown, setCountdown] = useState(10);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            router.push('/');
        }
    }, [countdown, router]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: '#f8fafc',
            }}
        >
            <div
                style={{
                    fontSize: '5rem',
                    fontWeight: 'bold',
                    color: colors.primary.background,
                    marginBottom: '1rem',
                }}
            >
                404
            </div>

            <div
                style={{
                    fontSize: '2rem',
                    color: '#334155',
                    marginBottom: '2rem',
                }}
            >
                Page Not Found
            </div>
            <div
                style={{
                    fontSize: '1.2rem',
                    color: '#64748b',
                }}
            >
                Redirecting to{' '}
                <CustomLink href="/" style={{ fontWeight: 'bold' }}>
                    Home
                </CustomLink>{' '}
                in <span style={{ fontWeight: 'bold' }}>{countdown}</span>{' '}
                seconds...
            </div>
        </div>
    );
};

export default NotFound;
