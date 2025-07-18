import "~/app/globals.css";
import Header from "~/components/seller/common/SellerHeader";
import Sidebar from "~/components/seller/common/RightSettingSidebar";
import MerchantSidebar from "~/components/seller/common/MerchantSidebar";

export default function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <MerchantSidebar />
            <main className="flex-1 overflow-auto p-8 bg-gray-100 pr-16">
              {" "}
              {children}
            </main>
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
