"use client";
import TaskSummary from "../../components/seller/dashboad/TaskSummary";
import SalesAnalytics from "../../components/seller/dashboad/SalesAnalytics";
import FilterBar from "~/components/seller/dashboad/FilterBar";

export default function HomeSeller() {
  return (
    <div>
      <TaskSummary />
      <FilterBar />
      <SalesAnalytics />
    </div>
  );
}
