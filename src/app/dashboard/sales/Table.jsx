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
import Link from "next/link";
import Filters from "@/components/Filters";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import orders from "@/app/data/data";

const columns = [
  "Order Code",
  "Customer",
  "Date",
  "Item Total",
  "Wallet",
  "Shipping",
  "To Collect",
  "Status",
  "Payment",
  "Actions",
];

export default function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/orders/all");
        const data = await res.json();
        console.log(data); // Log to inspect response format
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);
  
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
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderCode}>
                  <TableCell className="font-medium">
                    {order.orderCode}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{order.customer.userInfo.name}</p>
                      <p className="text-sm ">{order.orderLocation}</p>
                      <p className="text-sm ">{order.storeName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p>{order.orderDate}</p>
                      <p className="text-sm ">
                        Expected: {order.expectedDelivery}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>Rs {order.itemTotal}</TableCell>
                  <TableCell>Rs {order.wallet}</TableCell>
                  <TableCell>Rs {order.taxSummary.shippingCharge}</TableCell>
                  <TableCell>Rs {order.toCollect}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500 text-white">
                      {order.deliveryStatus.status}
                    </Badge>
                    <p className="text-xs  mt-1">{order.orderDate}</p>
                    <p className="text-xs  mt-1">
                      {order.deliveryStatus.duration}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs  mt-1">{order.paymentDetails.method}</p>
                    <p className="text-xs  mt-1">{order.paymentDetails.status}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Link
                          href={`/dashboard/sales/feedback/${order.orderCode}`}
                        >
                          <Star className="h-4 w-4 text-yellow-500" />
                        </Link>
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Link href={`/dashboard/sales/view/${order.orderCode}`}>
                          <ArrowRight className="h-4 w-4 text-teal-500" />
                        </Link>
                      </Button>
                    </div>
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
