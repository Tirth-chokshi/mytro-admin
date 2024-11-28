"use client";
import { useParams } from "next/navigation";

export default function ViewOrderPage() {
  const params = useParams();
  const orderCode = params.orderCode

  return (
    <div className="">
      <h1>Order Details</h1>
      <p>Viewing order: {orderCode}</p>
    </div>
  );
}