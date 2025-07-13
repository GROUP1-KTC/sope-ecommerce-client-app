"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import QuickMenu from "~/components/common/QuickMenu";


export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <img src="/logoSope.png" alt="Shopee" className="h-6" />
        {/* <span className="text-lg font-medium">
          Register to become a Sope seller
        </span> */}
        <span className="text-lg font-medium">Merchant Channel</span>
      </div>

      <div className="flex items-center gap-2">
        <QuickMenu />
        <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
          <LocalLibraryIcon />
        </button>

        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
          <AccountCircleIcon />
          <span className="text-sm font-medium">haicute</span>
        </div>
      </div>
    </header>
  );
}
