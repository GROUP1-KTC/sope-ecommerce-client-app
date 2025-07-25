import HeaderCustomService from '~/components/customer/HeaderCustomService';
import FooterCustomService from '~/components/customer/FooterCustomService';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HeaderCustomService />
            <main>{children}</main>
            <FooterCustomService />
        </>
    );
}
