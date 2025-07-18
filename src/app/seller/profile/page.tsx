"use client";
import { useState } from "react";
import ShopBasicInfo from "~/components/seller/profile/ShopBasicInfo";
import ShopIdentityInfo from "~/components/seller/profile/ShopIdentityInfo";
import ShopTaxInfo from "~/components/seller/profile/ShopTaxInfo";


const TABS = [
  { label: "Thông tin cơ bản", value: "basic" },
  { label: "Thông tin Thuế", value: "tax" },
  { label: "Thông tin Định Danh", value: "identity" },
];

export default function ShopProfile() {
  const [activeTab, setActiveTab] = useState("basic");

  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return <ShopBasicInfo />;
      case "tax":
        return <ShopTaxInfo />;
      case "identity":
        return <ShopIdentityInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-2 border-b mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-t ${
              activeTab === tab.value
                ? "bg-white border border-b-0 border-gray-300 text-black font-medium"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
