import HeaderCustomService from '~/components/customer/HeaderCustomService';
import FooterCustomService from '~/components/customer/FooterCustomService';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <HeaderCustomService />
                <main>{children}</main>
                <FooterCustomService />
            </body>
        </html>
    );
}
