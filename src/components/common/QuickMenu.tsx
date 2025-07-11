"use client";
import { useState, useRef, useEffect } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";

export default function QuickMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const items = [
    { label: "All", icon: <CategoryIcon className="text-orange-500" /> },
    {
      label: "All Products",
      icon: <Inventory2Icon className="text-purple-500" />,
    },
    {
      label: "Marketing Channel",
      icon: <LocalOfferIcon className="text-cyan-500" />,
    },
    {
      label: "Shopee Account Balance",
      icon: <AccountBalanceWalletIcon className="text-blue-500" />,
    },
    {
      label: "Sales Analysis",
      icon: <QueryStatsIcon className="text-green-500" />,
    },
    { label: "Shop Setup", icon: <SettingsIcon className="text-gray-600" /> },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
      >
        <GridViewIcon />
      </button>

      {open && (
        <div className="absolute top-12 right-0 w-72 bg-white shadow-xl rounded-lg p-4 z-50">
          <div className="grid grid-cols-3 gap-4">
            {items.map((item, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-500"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-1">
                  {item.icon}
                </div>
                <span className="text-center text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
