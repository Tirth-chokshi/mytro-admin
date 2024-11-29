"use client"
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Phone, Mail, ArrowUpDown, Search } from 'lucide-react';

const CustomerDashboard = () => {
  const customers = [
    {
      id: "8435",
      name: "Bimalsinh",
      email: "bimalsinhjadeja98@gmail.com",
      gender: "Female",
      platform: "Android",
      osVersion: "14",
      appVersion: "3.4.39",
      phone: "+918460006554",
      whatsapp: "+918460006554",
      custCode: "BIM3538",
      coin: "0",
      cash: "0",
      registeredDate: "19 Nov 2024",
      registeredTime: "04:35 PM",
      isActive: true
    },
    // Add more customer data as needed
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select defaultValue="10">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">entries</span>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search..." 
              className="pl-8 w-full md:w-[250px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>User Info</TableHead>
                <TableHead>App Info</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>CustCode</TableHead>
                <TableHead>Coin/Cash</TableHead>
                <TableHead>Registered On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-sm text-gray-500">{customer.email}</span>
                      <span className="text-sm text-gray-500">Gender: {customer.gender}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>Platform: {customer.platform}</span>
                      <span>OS Version: {customer.osVersion}</span>
                      <span>App Version: {customer.appVersion}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{customer.phone}</span>
                      <span>{customer.whatsapp}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.custCode}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>Coin: {customer.coin}</span>
                      <span>Cash: {customer.cash}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{customer.registeredDate}</span>
                      <span>{customer.registeredTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.isActive ? "default" : "secondary"}>
                      {customer.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            Showing 1 to 10 of 100 entries
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDashboard;