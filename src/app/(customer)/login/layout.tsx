import HeaderLogin from '~/components/customer/HeaderLogin';

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <HeaderLogin />
                <main>{children}</main>
            </body>
        </html>
    );
}
