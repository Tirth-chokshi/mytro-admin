"use client"
import React from 'react'
import DataTable from './Table'
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Categories() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard/mytro-admin/categories/new">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add New Category</span>
          </Button>
        </Link>
      <h1 className="text-2xl font-bold ">Manage Categories</h1>
      <DataTable/>
    </div>
  )
}