"use client";
import React, { useState } from "react";
import { Typography, Table, TableRow, TableCell } from "@mui/material";
import ModuleHeader from "@/components/moduleHeader";
import DashboardForm from "./addDashboard";

export default function Intel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = React.useState<any[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addData = (newData: any) => {
    setData([newData, ...data]);
  };

  React.useEffect(() => {
    fetch("/api/dashboard", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const deleteDashboard = (id: string) => {
    fetch(`/api/dashboard/${id}`, {
      method: "DELETE",
    })
      //.then((res) => res.json())
      .then(() => setData(data.filter((d: any) => d.id !== id)));
  };

  interface Dashboard {
    key: any;
    id: string;
    label: any;
    description: any;
    actionLabel: string;
  }

  interface DashboardRowProps {
    dashboard: Dashboard;
  }

  const DashboardRow: React.FC<DashboardRowProps> = ({ dashboard }) => (
    <Table>
      <TableRow>
        <TableCell>
          <Typography variant="h6" fontWeight="bold">
            {dashboard.label}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dashboard.description}
          </Typography>
        </TableCell>
        <TableCell align="right">
          {
            <Typography
              variant="body2"
              color="textSecondary"
              onClick={() => deleteDashboard(dashboard.id)}
            >
              Delete
            </Typography>
          }
        </TableCell>
      </TableRow>
    </Table>
  );

  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Dashboards"
          action={{
            label: "New Dashboard",
            onClick: openModal,
          }}
        />
      </div>
      {data.map((dashboard, index) => (
        <DashboardRow key={index} dashboard={dashboard} />
      ))}
      {isModalOpen && (
        <DashboardForm isOpen onClose={closeModal} onAdd={addData} />
      )}
    </div>
  );
}
