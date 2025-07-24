import Header from '~/components/customer/HeaderAuth';

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header title="Sign up" />
                <main>{children}</main>
            </body>
        </html>
    );
}
