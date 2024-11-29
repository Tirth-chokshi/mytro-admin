"use client"
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, ChevronDown, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import orders from '@/app/data/data';
import Link from 'next/link';
export default function OrderTable() {

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold ">Manage Sales</h1>

      {/* Responsive Filters */}
      <div className="rounded-lg p-4 shadow-sm space-y-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium ">Area Filter</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose One" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="all">Sector 1</SelectItem>
                <SelectItem value="all">Sector 2</SelectItem>
                <SelectItem value="all">Sector 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ">Date Range</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2 self-end">
            <Link href="/dashboard/sales/upcoming">
              <Button variant="default" className="bg-teal-500 hover:bg-teal-600 w-full">
                Upcoming
              </Button>
            </Link>
            <Link href="/dashboard/sales/due">
              <Button variant="default" className="bg-teal-500 hover:bg-teal-600 w-full">
                Due
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="rounded-lg border p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:justify-between md:items-center ">
        <div className="flex items-center gap-2">
          <span className="text-sm ">Show</span>
          <Select>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
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
                <TableHead className="w-[120px]">Order Code</TableHead>
                <TableHead className="min-w-[200px]">Customer</TableHead>
                <TableHead className="min-w-[180px]">Date</TableHead>
                <TableHead>Item Total</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>To Collect</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderCode}>
                  <TableCell className="font-medium">{order.orderCode}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm ">{order.location}</p>
                      <p className="text-sm ">{order.store}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p>{order.date}</p>
                      <p className="text-sm ">Expected: {order.expectedDelivery}</p>
                    </div>
                  </TableCell>
                  <TableCell>Rs {order.itemTotal}</TableCell>
                  <TableCell>Rs {order.wallet}</TableCell>
                  <TableCell>Rs {order.shippingCharge}</TableCell>
                  <TableCell>Rs {order.toCollect}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500 text-white">{order.deliveryStatus.status}</Badge>
                    <p className="text-xs  mt-1">{order.deliveryStatus.time}</p>
                    <p className="text-xs  mt-1">{order.deliveryStatus.duration}</p>
                  </TableCell>
                  <TableCell>{order.paymentDetails}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Link href={`/dashboard/sales/feedback/${order.orderCode}`}>
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
    </div>
  );
}