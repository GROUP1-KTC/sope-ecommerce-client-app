import Footer from '~/components/customer/Footer';
import Header from '~/components/customer/HeaderAuth';

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="Reset password" />
            <main>{children}</main>
            <Footer />
        </>
    );
}
