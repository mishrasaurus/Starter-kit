"use client";
import React, { useEffect, useState } from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/table";
import { OTable } from "@/fwk/table";
import { useRouter } from "next/navigation";

export default function UserTable() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const columns = [
    ColumnBuilder().id("name").cellType(CELL_TYPES.USER).name("Name").build(),
    ColumnBuilder().id("username").name("Username").width(200).build(),
    ColumnBuilder().id("role").name("Role").build(),
  ];

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((userData) => setData(userData))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return <OTable isFullWidthTable stickyHeader columns={columns} data={data} />;
}
