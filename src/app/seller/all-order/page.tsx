"use client";

import ExportButtons from "../../../components/seller/order/ExportButtons";
import FilterBar from "../../../components/seller/order/FilterBar";
import OrderTable from "../../../components/seller/order/OrderTable";
import Tabs from "../../../components/seller/order/Tabs";
import { useState } from "react";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [shippingUnit, setShippingUnit] = useState("All");
  return (
    <div className="p-6 bg-white">
      <ExportButtons />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar onShippingUnitChange={setShippingUnit} />
      <OrderTable activeTab={activeTab} shippingUnit={shippingUnit} />
    </div>
  );
}
