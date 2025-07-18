"use client";
import { useState } from "react";
import FilterBar from "~/components/seller/return-order/FilterBar";
import MainTabs from "~/components/seller/return-order/MainTabs";
import RequestTable from "~/components/seller/return-order/RequestTable";
import RequestToolbar from "~/components/seller/return-order/RequestToolbar";
import SearchButton from "~/components/seller/return-order/SearchButton";
import SubTabs from "~/components/seller/return-order/SubTabs";

export default function ReturnRequestPage() {
  const [mainTab, setMainTab] = useState("Tất cả");
  const [subTab, setSubTab] = useState("Tất cả");
  const [priority, setPriority] = useState("Tất cả");
  const [toolbar, setToolbar] = useState({ query: "", action: "" });
  const [appliedFilters, setAppliedFilters] = useState({
    mainTab,
    subTab,
    priority,
    query: "",
    action: "",
  });

  const handleSearch = () => {
    setAppliedFilters({
      mainTab,
      subTab,
      priority,
      query: toolbar.query,
      action: toolbar.action,
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-4">
      <MainTabs active={mainTab} onChange={setMainTab} />
      <div className="bg-white p-4 rounded shadow">
        <SubTabs active={subTab} onChange={setSubTab} />
        <FilterBar selected={priority} onChange={setPriority} />
        <div className="flex justify-between items-center flex-wrap gap-2">
          <RequestToolbar filters={toolbar} onChange={setToolbar} />
          <SearchButton onSearch={handleSearch} />
        </div>
        <RequestTable filters={appliedFilters} />
      </div>
    </div>
  );
}
