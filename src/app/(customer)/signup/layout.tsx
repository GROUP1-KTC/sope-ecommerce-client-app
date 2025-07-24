import Footer from '~/components/customer/Footer';
import Header from '~/components/customer/HeaderAuth';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header title="Sign up" />
            <main>{children}</main>
            <Footer />
        </>
    );
}
