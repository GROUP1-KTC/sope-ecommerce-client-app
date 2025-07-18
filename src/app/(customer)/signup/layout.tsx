import HeaderSignup from '~/components/customer/HeaderSignup';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <HeaderSignup />
                <main>{children}</main>
            </body>
        </html>
    );
}
