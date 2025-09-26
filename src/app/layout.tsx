import './globals.css';
import StoreProvider from '~/providers/StoreProvider';
import GlobalComponent from '~/components/shared/Global';
import { disableConsoleInProd } from '~/utils/disableConsole';

// disableConsoleInProd();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    {children}
                    <GlobalComponent />
                </StoreProvider>
            </body>
        </html>
    );
}
