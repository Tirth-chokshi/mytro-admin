"use client"
import React from 'react'
import DataTable from './Table'
export default function PurchasedDeals() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold ">Manage Purchased Deals</h1>
      <DataTable/>
    </div> 
  )
}