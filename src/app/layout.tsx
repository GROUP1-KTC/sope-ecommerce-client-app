import './globals.css';
import StoreProvider from '~/providers/StoreProvider';
import GlobalComponent from '~/components/shared/Global';
import RouteChangeLoader from '~/components/shared/loading/RouteChangeLoader';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <RouteChangeLoader />
                    {children}
                    <GlobalComponent />
                </StoreProvider>
            </body>
        </html>
    );
}
