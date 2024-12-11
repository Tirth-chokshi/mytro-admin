"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/customers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer details");
        }
        const data = await response.json();
        setCustomer(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomerDetails();
    }
  }, [id]);

  if (loading) return <div>Loading customer details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>No customer found</div>;

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Customer Details</h1>

      <section className="grid md:grid-cols-4 gap-4">
        <div className="bg-muted/50 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Customer ID:</strong> {customer._id}
            </p>
            <p>
              <strong>Name:</strong> {customer.userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {customer.userInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.mobile.phone}
            </p>
            <p>
              <strong>Age:</strong> {customer.userInfo.age || "Not specified"}
            </p>
          </div>
        </div>

        <div className="bg-muted/50 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Analytics</h2>
          {customer.orderAnalytics ? (
            <div className="space-y-2">
              <p>
                <strong>Total Orders:</strong>{" "}
                {customer.orderAnalytics.totalOrders}
              </p>
              <p>
                <strong>Total Spent:</strong> ₹
                {customer.orderAnalytics.totalSpent.toFixed(2)}
              </p>
              <p>
                <strong>Average Order Value:</strong> ₹
                {customer.orderAnalytics.averageOrderValue.toFixed(2)}
              </p>
            </div>
          ) : (
            <p>No order analytics available</p>
          )}
        </div>
        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Cash & Ecoin </h2>
          <p>Cash: {customer.cash}</p>
          <p>Ecoin: {customer.ecoin}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Information </h2>
          <p>Register On: {customer.registeredOn.date}</p>
          <p>Cust Code: {customer.custCode}</p>
          <p>Ref Code: {customer.refCode}</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Past Orders</h2>
        {customer.orderAnalytics &&
        customer.orderAnalytics.recentOrders.length > 0 ? (
          <div className="grid gap-4">
            {customer.orderAnalytics.recentOrders.map((order) => (
              <div key={order._id} className="shadow rounded-lg p-4 text-gray-100 bg-slate-900">
                <div className="flex justify-between">
                  <p>
                    <strong>Order Code:</strong> {order.orderCode}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <p>
                  <strong>Total:</strong> ₹
                  {order.taxSummary.grandTotal.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong> {order.deliveryStatus.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent orders</p>
        )}
      </section>
    </div>
  );
}
