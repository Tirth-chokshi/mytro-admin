"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import MyTable from './Table'
export default function ShopsList() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold ">Shops</h1>
      <MyTable/>
    </div>
  )
}   