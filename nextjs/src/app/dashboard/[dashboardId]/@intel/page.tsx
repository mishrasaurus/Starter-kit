"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ModuleHeader, { View } from "@/components/moduleHeader";
import IntelList from "./intelList";
import IntelCards from "./intelCards";
import { OpType } from "@/fwk/types/api";
import Dialog from "@/fwk/components/dialog";

export default function IntelView(props: { params: { dashboardId: string } }) {
  const { dashboardId } = props.params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = React.useState<any>([]);
  const [currentView, setCurrentView] = useState(View.Card);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();

  const openIntel = (row: TSAny) => {
    router.push(`/intel/${row.id}`);
  };

  const onSubmit = () => null;

  React.useEffect(() => {
    fetch(`/api/intel?dashboardId=${dashboardId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [dashboardId]);

  return (
    <>
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="p-4">
          <ModuleHeader
            title={"Intel"}
            action={{
              label: "New Intel",
              onClick: openModal,
            }}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>

        <div className="flex-1 overflow-auto">
          {currentView === View.Card ? (
            <IntelCards data={data} onCardClick={openIntel} />
          ) : (
            <IntelList data={data} onRowClick={openIntel} />
          )}
        </div>
      </div>
      {isModalOpen && (
        <Dialog title="Add Intel" onClose={closeModal} onSubmit={onSubmit} />
      )}
    </>
  );
}
