import Footer from '~/components/customer/Footer';
import Header from '~/components/customer/HeaderAuth';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="Đăng ký" />
            <main>{children}</main>
            <Footer />
        </>
    );
}
