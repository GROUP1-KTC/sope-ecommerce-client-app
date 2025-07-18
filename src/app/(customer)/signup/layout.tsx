import Footer from '~/components/customer/Footer';
import HeaderSignup from '~/components/customer/HeaderSignup';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
                <HeaderSignup />
                <main>{children}</main>
                <Footer />
        </>
    );
}
