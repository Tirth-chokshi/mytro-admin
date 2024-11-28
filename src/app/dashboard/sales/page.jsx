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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showMobileRow, setShowMobileRow] = React.useState(null);
  const [selectedEntries, setSelectedEntries] = React.useState('10');
  const [currentPage, setCurrentPage] = React.useState(1);

  // Mobile breakpoint detection
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced mobile card component
  const MobileOrderCard = ({ order, isExpanded, onToggle }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{order.orderCode}</p>
              <Badge className="bg-emerald-500 text-white">{order.status}</Badge>
            </div>
            <p className="text-sm text-gray-500">{order.date}</p>
            <p className="text-sm text-gray-500">{order.timeLeft}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">Rs {order.toCollect}</p>
            <p className="text-sm text-gray-500">{order.payment}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Customer:</span>
            <div className="text-right">
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-gray-500">{order.location}</p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4 flex items-center justify-center"
          onClick={onToggle}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
          <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>

        {isExpanded && (
          <div className="mt-4 space-y-3 border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Store</p>
                <p className="font-medium">{order.store}</p>
              </div>
              <div>
                <p className="text-gray-500">Expected</p>
                <p className="font-medium">{order.expectedDelivery}</p>
              </div>
              <div>
                <p className="text-gray-500">Item Total</p>
                <p className="font-medium">Rs {order.total}</p>
              </div>
              <div>
                <p className="text-gray-500">Shipping</p>
                <p className="font-medium">Rs {order.shipping}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                {!isMobile && "Rate"}
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-teal-500" />
                {!isMobile && "Process"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Sample order data
  const sampleOrder = {
    orderCode: '2024113768',
    customer: 'Abhishek',
    location: 'IIT Gandhinagar',
    store: 'Mytro Mart',
    date: '20 Nov 2024 11:31 AM',
    expectedDelivery: '45 min',
    total: 445,
    wallet: 0,
    shipping: 40,
    toCollect: 485,
    status: 'Processing',
    timeLeft: '29 min left',
    payment: 'COD / Due',
    feedback: 'No Feedback'
  };

  // Pagination controls
  const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p className="text-sm text-gray-600 text-center sm:text-left">
        Showing 1 to {selectedEntries} of 50 entries
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        >
          Previous
        </Button>
        {[1, 2, 3].map(page => (
          <Button
            key={page}
            variant="outline"
            className={currentPage === page ? "bg-teal-500 text-white" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          disabled={currentPage === 3}
          onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-800">Manage Sales</h1>

      {/* Responsive Filters */}
      <div className="rounded-lg p-4 shadow-sm space-y-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Area Filter</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose One" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Date Range</label>
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
            <Button variant="default" className="bg-teal-500 hover:bg-teal-600 w-full">
              Upcoming
            </Button>
            <Button variant="default" className="bg-teal-500 hover:bg-teal-600 w-full">
              Due
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="rounded-lg border p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:justify-between md:items-center ">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <Select value={selectedEntries} onValueChange={setSelectedEntries}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        <div className="relative flex-1 md:max-w-xs">
          <Input
            type="search"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                      <p className="text-sm text-gray-500">{order.location}</p>
                      <p className="text-sm text-gray-500">{order.store}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p>{order.date}</p>
                      <p className="text-sm text-gray-500">Expected: {order.expectedDelivery}</p>
                    </div>
                  </TableCell>
                  <TableCell>Rs {order.itemTotal}</TableCell>
                  <TableCell>Rs {order.wallet}</TableCell>
                  <TableCell>Rs {order.shippingCharge}</TableCell>
                  <TableCell>Rs {order.toCollect}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500 text-white">{order.deliveryStatus.status}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{order.deliveryStatus.time}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.deliveryStatus.duration}</p>
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

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        <MobileOrderCard
          order={sampleOrder}
          isExpanded={showMobileRow === sampleOrder.orderCode}
          onToggle={() => setShowMobileRow(
            showMobileRow === sampleOrder.orderCode ? null : sampleOrder.orderCode
          )}
        />
      </div>

      {/* Pagination */}
      <PaginationControls />
    </div>
  );
}