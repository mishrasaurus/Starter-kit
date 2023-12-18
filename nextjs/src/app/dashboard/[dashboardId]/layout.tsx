"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./dashboardSidebar";
import { IntelDBViews } from "../../constants";

export default function DashboardLayout(props: {
  params: { dashboardId: string };
  children: React.ReactNode;
  intel: React.ReactNode;
  charts: React.ReactNode;
}) {
  const router = useRouter();
  const [currentView, setCurrentView] = React.useState<IntelDBViews>(
    IntelDBViews.Intel
  );
  const [dashboards, setDashboards] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch("/api/dashboard", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDashboards(data));
  }, []);

  const setSelectedDashboard = (dashboard: string) => {
    router.push(`/intel/dashboard/${dashboard}`);
  };

  const onAddDashboard = (newData: any) => {
    setDashboards([newData, ...dashboards]);
    setSelectedDashboard(newData.id);
  };

  let view = props.intel;
  switch (currentView) {
    case IntelDBViews.Intel:
      view = props.intel;
      break;
    case IntelDBViews.Charts:
      view = props.charts;
      break;
  }

  return (
    <div className="flex flex-1 h-full">
      <div className="lg:w-1/5 md:w-1/4 sm:w-1/3">
        <Sidebar
          dashboards={dashboards}
          selectedDashboard={props.params.dashboardId}
          setSelectedDashboard={setSelectedDashboard}
          onAddDashboard={onAddDashboard}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
      {view}
    </div>
  );
}
