"use client"
import React from "react"
import DataTable from "@/components/DataTable"
import orders from "@/app/data/data"

export default function DueTablePage() {
  const columns = [
    { label: "Order Code", field: "orderCode" },
    { label: "Customer", field: "customer" },
    { label: "Date", field: "date" },
    { label: "Item Total", field: "itemTotal", render: (row) => `Rs ${row.itemTotal}` },
    { label: "To Collect", field: "toCollect", render: (row) => `Rs ${row.toCollect}` },
    { label: "Status", field: "status", render: (row) => <span>{row.status}</span> },
  ]

  const filters = {
    areaFilter: {
      default: "all",
      options: [
        { value: "all", label: "All Areas" },
        { value: "sector1", label: "Sector 1" },
        { value: "sector2", label: "Sector 2" },
        { value: "sector3", label: "Sector 3" },
      ],
    },
    dateFilter: {
      default: "30",
      options: [
        { value: "7", label: "Last 7 Days" },
        { value: "30", label: "Last 30 Days" },
        { value: "90", label: "Last 90 Days" },
      ],
    },
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Manage Sales</h1>
      <DataTable
        columns={columns}
        data={orders}
        filters={filters}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}
