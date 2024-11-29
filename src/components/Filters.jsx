"use client"
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Filters = () => {
    return (
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
    );
};

export default Filters;