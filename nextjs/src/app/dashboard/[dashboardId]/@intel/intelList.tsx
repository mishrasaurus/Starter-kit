"use client";
import React from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/table";
import { Table } from "@/fwk/table";

interface Props {
  data: TSAny[];
  onRowClick?: (row: TSAny) => void;
}

const Columns = [
  //ColumnBuilder().id("id").name("ID").build(),
  ColumnBuilder().id("title").name("Title").build(),
  ColumnBuilder()
    .id("content")
    .name("Content")
    .cellType(CELL_TYPES.RICH_TEXT)
    .build(),
  ColumnBuilder().id("type").name("Type").build(),
  ColumnBuilder().id("source").name("Source").build(),
  //ColumnBuilder().id("summary").name("Summary").build(),
  ColumnBuilder()
    .id("createdAt")
    .name("Created At")
    .cellType(CELL_TYPES.DATE_TIME)
    .build(),
  ColumnBuilder()
    .id("updateAt")
    .name("Update At")
    .cellType(CELL_TYPES.DATE_TIME)
    .build(),
  ColumnBuilder().id("createdBy").name("Created By").build(),
  ColumnBuilder().id("updatedBy").name("Updated By").build(),
  //ColumnBuilder().id("deleted").name("Deleted").build(),
];

export default function Intel({ data, onRowClick }: Props) {
  return (
    <Table stickyHeader columns={Columns} data={data} onRowClick={onRowClick} />
  );
}
