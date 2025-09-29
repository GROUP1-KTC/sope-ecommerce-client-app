import './globals.css';
import StoreProvider from '~/providers/StoreProvider';
import GlobalComponent from '~/components/shared/Global';
import { disableConsoleInProd } from '~/utils/disableConsole';

disableConsoleInProd();

export const metadata = {
  title: "Sope - Nền tảng thương mại điện tử trực tuyến",
  description: "Nền tảng thương mại điện tử trực tuyến dành cho người bán và người mua",
};

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
