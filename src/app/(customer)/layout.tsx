'use client';
import Header from '~/components/customer/Header';
import Footer from '~/components/customer/Footer';
import { usePathname } from 'next/navigation';

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const hideHeaderFooter = pathname === '/login' || pathname === '/signup';

    console.log('CUSTOMER LAYOUT');
    return (
        <>
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            {!hideHeaderFooter && <Footer />}
        </>
    );
}
