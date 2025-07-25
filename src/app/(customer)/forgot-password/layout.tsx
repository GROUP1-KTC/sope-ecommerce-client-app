import Footer from '~/components/customer/Footer';
import Header from '~/components/customer/HeaderAuth';

export default function ForgotPasswordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="Forgot password!" />
            <main>{children}</main>
            <Footer />
        </>
    );
}
