import Footer from '~/components/customer/Footer';
import HeaderLogin from '~/components/customer/HeaderLogin';

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HeaderLogin />
            <main>{children}</main>
            <Footer />
        </>
    );
}
