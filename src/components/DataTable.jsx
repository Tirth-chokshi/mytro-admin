"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DataTable = ({ columns, data, filters, pagination }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [areaFilter, setAreaFilter] = useState(filters?.areaFilter?.default || "all");
  const [dateFilter, setDateFilter] = useState(filters?.dateFilter?.default || "30");

  const pageSize = pagination?.pageSize || 10;

  // **Filter and Search Logic**
  const filteredData = data
    .filter(
      (row) =>
        (areaFilter === "all" || row.location.includes(areaFilter)) &&
        (dateFilter === "30" || row.date.includes(dateFilter))
    )
    .filter((row) => {
      if (!searchTerm) return true;
      return columns.some((col) =>
        String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / pageSize);

  // **Event Handlers**
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="rounded-lg p-4 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Area Filter */}
          {filters?.areaFilter && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Area Filter</label>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose One" />
                </SelectTrigger>
                <SelectContent>
                  {filters.areaFilter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Date Filter */}
          {filters?.dateFilter && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Last 30 Days" />
                </SelectTrigger>
                <SelectContent>
                  {filters.dateFilter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Search Input */}
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, idx) => (
                  <TableHead key={idx}>{col.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, idx) => (
                  <TableRow key={idx}>
                    {columns.map((col, colIdx) => (
                      <TableCell key={colIdx}>
                        {col.render ? col.render(row) : row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-sm text-center sm:text-left">
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalEntries)} to{" "}
            {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant="outline"
                className={currentPage === i + 1 ? "bg-teal-500 text-white" : ""}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
