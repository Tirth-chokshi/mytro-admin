"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import Filters from "@/components/Filters";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const columns = ["ID", "Name", "CityID", "Zone", "Status"];

export default function DataTable() {
  const [zones, setZones] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch("http://localhost:8000/zones/all");
        const data = await response.json();
        setZones(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching zones:", error);
        setLoading(false);
      }
    };
    fetchZones();
  }, []);

  const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p className="text-sm text-center sm:text-left">Showing 1 of 50 entries</p>
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
      <div className="flex justify-end items-center gap-4 mb-4">
        <Link href="/dashboard/mytro-admin/city-zones/new">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add New Zone</span>
          </Button>
        </Link>
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
            <TableBody>
              {zones && zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{zone.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm ">{zone.cityId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm ">{zone.cords}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm ">{zone.status}</p>
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
