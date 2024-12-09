"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Wallet2,
  BarChart3,
  Bell,
  Eye,
  Search,
  Coins,
  Map,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Filters from "@/components/Filters";
import { Badge } from "@/components/ui/badge";
// import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const columns = ["ID", "Name", "Mobile", "Publish Date", "Status", "Actions"];

export default function DataTable() {
  const [drivers, setDrivers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch("http://localhost:8000/drivers/all");
      const data = await response.json();
      setDrivers(data);
      setLoading(false);
    };
    fetchDrivers();
  }, []);

  const handleDriverDelete = async (driverId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/drivers/delete/${driverId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setDrivers(drivers.filter((driver) => driver._id !== driverId));
        toast({
          title: "Driver Deleted",
          description: "The driver has been successfully removed.",
          variant: "default"
        });
      } else {
        console.error("Failed to delete driver");
        toast({
          title: "Error",
          description: "Failed to delete driver. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting the driver.",
        variant: "destructive"
      });
    }
  };
  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Loading Profile...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          Loading...
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <section>
      {/* Responsive Filters */}

      <Filters />

      {/* Search and Controls */}
      <div className="rounded-lg border p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:justify-between md:items-center ">
        <div className="flex items-center gap-2">
          <span className="text-sm ">Show</span>
          <Select>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
              10
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm ">entries</span>
        </div>

        <div className="relative flex-1 md:max-w-xs">
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 " />
        </div>
      </div>

      {/* Responsive Table/Card View */}
      <div className="hidden md:block rounded-lg border overflow-hidden ">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody key={drivers._id}>
              {drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver._id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{driver.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm ">{driver.mobile}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm ">{driver.publishDate}</p>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={driver.status.toLowerCase() === "active"}
                      onCheckedChange={() => {}}
                      className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-red-500"
                    />
                  </TableCell>
                  <TableCell>
                      <Button variant="outline" onClick={() => handleDriverDelete(driver._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <PaginationControls />
    </section>
  );
}

const PaginationControls = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
    <p className="text-sm  text-center sm:text-left">Showing 1 of 50 entries</p>
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline">Previous</Button>
      {[1, 2, 3].map((page) => (
        <Button key={page} variant="outline">
          {page}
        </Button>
      ))}
      <Button variant="outline">Next</Button>
    </div>
  </div>
);
