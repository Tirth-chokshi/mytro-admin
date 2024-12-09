"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import OrderDriverAssignment from "@/components/DriverAssignment";

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(
    order?.deliveryStatus.status
  );
  const [isStatusChangeDialogOpen, setIsStatusChangeDialogOpen] =
    useState(false);

  const handleDriverUpdate = (updatedOrder) => {
    setOrder(updatedOrder);
  };

  const deliveryStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/orders/${params.orderCode}`
        );
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [params.orderCode]);

  const handleStatusChange = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/orders/${params.orderCode}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedStatus,
            duration: order.deliveryStatus.duration,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      // Optimistically update the UI
      setOrder((prevOrder) => ({
        ...prevOrder,
        deliveryStatus: {
          ...prevOrder.deliveryStatus,
          status: selectedStatus,
        },
      }));

      setIsStatusChangeDialogOpen(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      // TODO: Add user-friendly error handling
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!order) {
  //   return <div>Order not found</div>;
  // }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.orderCode}</h1>
          <p className="text-gray-500">{order.storeName}</p>
        </div>
        <Badge
          variant={
            order.deliveryStatus.status === "Pending"
              ? "secondary"
              : order.deliveryStatus.status === "Processing"
              ? "warning"
              : order.deliveryStatus.status === "Shipped"
              ? "info"
              : order.deliveryStatus.status === "Delivered"
              ? "success"
              : order.deliveryStatus.status === "Cancelled"
              ? "destructive"
              : "default"
          }
        >
          {order.deliveryStatus.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap- p-4 rounded-lg">
        <div>
          <p className="text-sm font-medium">Order Number</p>
          <p className="text-lg font-semibold">{order.orderCode}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Order Date</p>
          <p className="text-lg font-semibold">
            {new Date(
              order.orderDate || "2024-12-09T15:23:46+05:30"
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Order Time</p>
          <p className="text-lg font-semibold">
            {new Date(
              order.orderDate || "2024-12-09T15:23:46+05:30"
            ).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 rounded-lg mb-4">
        <div>
          <p className="text-sm font-medium">Delivery Status</p>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                order.deliveryStatus.status === "Pending"
                  ? "secondary"
                  : order.deliveryStatus.status === "Processing"
                  ? "warning"
                  : order.deliveryStatus.status === "Shipped"
                  ? "info"
                  : order.deliveryStatus.status === "Delivered"
                  ? "success"
                  : order.deliveryStatus.status === "Cancelled"
                  ? "destructive"
                  : "default"
              }
              className="mr-2"
            >
              {order.deliveryStatus.status}
            </Badge>
            <Dialog
              open={isStatusChangeDialogOpen}
              onOpenChange={setIsStatusChangeDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  // disabled={order.deliveryStatus.status === "Delivered"}
                >
                  Change Status
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Delivery Status</DialogTitle>
                  <DialogDescription>
                    Update the current status of this order.
                  </DialogDescription>
                </DialogHeader>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedStatus}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search status..." />
                      <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                          {deliveryStatuses.map((status) => (
                            <CommandItem
                              key={status}
                              value={status}
                              onSelect={() => setSelectedStatus(status)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedStatus === status
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {status}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={handleStatusChange}
                    disabled={selectedStatus === order.deliveryStatus.status}
                  >
                    Update Status
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>  
        <div>
          <p className="text-sm font-medium text-gray-600">Delivery Duration</p>
          <p className="text-lg font-semibold">
            {order.deliveryStatus.duration}
            {order.deliveryStatus.duration === 1 ? " day" : " days"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Expected Delivery</p>
          <p className="text-lg font-semibold">
            {new Date(order.expectedDelivery).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <p className="font-medium">Name</p>
                <dd>{order.customer.userInfo.name}</dd>
              </div>
              <div>
                <p className="font-medium">Customer Code</p>
                <p>{order.customer.custCode}</p>
              </div>
              <div>
                <p className="font-medium">Contact</p>
                <p>{order.customer.mobile.phone}</p>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p>{order.customer.userInfo.email}</p>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <p className="font-medium">Shipping Address</p>
                <p>{order.shippingAddress}</p>
              </div>
              <div>
                <p className="font-medium">Expected Delivery</p>
                <p>{new Date(order.expectedDelivery).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Order Location</p>
                <p>{order.orderLocation}</p>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>
                    Item Name
                    <Badge variant="secondary" className="text-xs">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{" "}
                      Items
                    </Badge>
                  </TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead className="text-right">Unit Cost</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.image}
                          alt={item.itemName}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>
                      {Object.entries(item.options)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ") || "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{item.unitCost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{item.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-medium">Payment Method</dt>
                <dd>{order.paymentDetails.method}</dd>
              </div>
              <div>
                <dt className="font-medium">Payment Status</dt>
                <dd>{order.paymentDetails.status}</dd>
              </div>
              <div>
                <dt className="font-medium">Payment Date</dt>
                <dd>
                  {new Date(order.paymentDetails.dateTime).toLocaleString()}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <OrderDriverAssignment
          order={order}
          onDriverUpdate={handleDriverUpdate}
        />
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Order Totals
                  </h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt>Item Total</dt>
                      <dd>₹{order.itemTotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping Charge</dt>
                      <dd>₹{order.taxSummary.shippingCharge.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Wallet Used</dt>
                      <dd>₹{order.wallet.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Tax Breakdown
                  </h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt>Taxable Amount</dt>
                      <dd>₹{order.taxSummary.taxableAmount.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>CGST ({order.taxSummary.cgstPercentage}%)</dt>
                      <dd>₹{order.taxSummary.cgstAmount.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>SGST ({order.taxSummary.sgstPercentage}%)</dt>
                      <dd>₹{order.taxSummary.sgstAmount.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>₹{order.taxSummary.subtotal.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between font-medium text-lg">
                <dt>Grand Total</dt>
                <dd>₹{order.taxSummary.grandTotal.toFixed(2)}</dd>
              </div>

              <div className="flex justify-between font-medium border-t pt-2">
                <dt>To Collect</dt>
                <dd>₹{order.toCollect.toFixed(2)}</dd>
              </div>
            </div>
          </CardContent>
        </Card>

        {order.feedback && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.feedback}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex gap-4">
        <Button variant="outline">Print Invoice</Button>
        <Button
          variant="destructive"
          disabled={order.deliveryStatus.status !== "Order Received"}
        >
          Cancel Order
        </Button>
      </div>
    </div>
  );
}
