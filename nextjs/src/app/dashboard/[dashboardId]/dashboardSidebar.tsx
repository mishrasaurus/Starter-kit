"use client";

import React from "react";
import { Select, SelectItem } from "@tremor/react";
import { withPreventDefault } from "@/fwk/utils";

import AddDashboard from "../addDashboard";
import { DashboardSidebarLinks, DashboardSidebarViews } from "../constants";

const ALL_DASHBOARD = {
  id: "all",
  label: "All",
};
export default function DashboardSidebar({
  dashboards,
  currentView,
  selectedDashboard,
  setCurrentView,
  setSelectedDashboard,
  onAddDashboard,
}: {
  dashboards: any[];
  currentView: DashboardSidebarViews;
  selectedDashboard: string;
  onAddDashboard: (newData: any) => void;
  setSelectedDashboard: (dashboard: string) => void;
  setCurrentView: (view: DashboardSidebarViews) => void;
}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const renderDashboardSelector = () => {
    return (
      <Select
        value={selectedDashboard}
        enableClear={false}
        onValueChange={setSelectedDashboard}
      >
        <SelectItem value={ALL_DASHBOARD.id}>{ALL_DASHBOARD.label}</SelectItem>
        {dashboards.map((dashboard) => (
          <SelectItem key={dashboard.id} value={dashboard.id}>
            {dashboard.label}
          </SelectItem>
        ))}
        <SelectItem
          value="add_dashboard"
          onClick={withPreventDefault(() => setIsModalOpen(true))}
        >
          <div className="font-semibold">+ Create New</div>
        </SelectItem>
      </Select>
    );
  };

  const renderLinks = () => {
    return (
      <div className="flex flex-col gap-4">
        {DashboardSidebarLinks.map((link) => (
          <div
            onClick={() => setCurrentView(link.id)}
            key={link.id}
            className={`flex items-center gap-2 p-1 rounded-md cursor-pointer ${
              link.id === currentView
                ? "active selection font-semibold"
                : "selection"
            }`}
          >
            <link.icon width={"20px"} height={"20px"} />
            <div className="text-sm">{link.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col border-r p-4 pr-2 gap-4 h-full">
      {renderDashboardSelector()}
      {renderLinks()}

      {isModalOpen && (
        <AddDashboard
          isOpen={isModalOpen}
          onAdd={onAddDashboard}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
