"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

// Sample data structure matching the image
const dealsData = [
    {
        code: "AEP6386573",
        title: "FREE Hand Wax with Leg Wax",
        business: "Monas Beauty Parlour",
        customer: {
            name: "DATTESHVAR",
            email: "datteshvar.goswami92@gmail.com",
            phone: "+917984450900"
        },
        orderDate: "10 Dec 2023 10:39 PM",
        redeemedDate: "-",
        amount: "0",
        status: "Not redeem",
        paid: true
    },
    {
        code: "BEP6386574",
        title: "50% Off on Haircut",
        business: "John's Barber Shop",
        customer: {
            name: "JOHN DOE",
            email: "john.doe@example.com",
            phone: "+1234567890"
        },
        orderDate: "12 Dec 2023 02:15 PM",
        redeemedDate: "13 Dec 2023 11:00 AM",
        amount: "25",
        status: "Redeemed",
        paid: true
    },
    {
        code: "CEP6386575",
        title: "Buy 1 Get 1 Free Coffee",
        business: "Starbucks",
        customer: {
            name: "JANE SMITH",
            email: "jane.smith@example.com",
            phone: "+0987654321"
        },
        orderDate: "15 Dec 2023 09:45 AM",
        redeemedDate: "-",
        amount: "5",
        status: "Not redeem",
        paid: false
    }
]

const DataTable = () => {
    return (
        <div className="p-4">
            {/* Table Controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm">Show</span>
                    <Select defaultValue="10">
                        <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm">entries</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Search:</span>
                    <Input className="w-64 h-8" />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" font-semibold">
                                Coupon Code
                                <span className="float-right">↑</span>
                            </TableHead>
                            <TableHead className=" font-semibold">
                                Customer
                                <span className="float-right">↑↓</span>
                            </TableHead>
                            <TableHead className=" font-semibold">
                                Redeem Details
                                <span className="float-right">↑↓</span>
                            </TableHead>
                            <TableHead className=" font-semibold">
                                Payment
                                <span className="float-right">↑↓</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dealsData.map((deal) => (
                            <TableRow key={deal.code}>
                                <TableCell className="align-top">
                                    <div className="font-medium">{deal.code}</div>
                                    <div className="font-semibold">{deal.title}</div>
                                    <div className="text-gray-600">{deal.business}</div>
                                </TableCell>
                                <TableCell className="align-top">
                                    {deal.customer && (
                                        <>
                                            <div>{deal.customer.name}</div>
                                            <div>{deal.customer.email}</div>
                                            <div>{deal.customer.phone}</div>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell className="align-top">
                                    <div>Order Date: {deal.orderDate}</div>
                                    <div className={`inline-block px-3 py-1 my-1 rounded ${deal.status === 'redeemed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {deal.status}
                                    </div>
                                    <div>Redeemed Date: {deal.redeemedDate}</div>
                                </TableCell>
                                <TableCell className="align-top">
                                    <div>Coupon Amount: {deal.amount}</div>
                                    <div className={`inline-block px-3 py-1 rounded ${deal.paid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {deal.paid ? 'Paid' : 'Not Paid'}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div>undefined</div>
                <div className="flex gap-1">
                    <Button variant="outline" className="px-4 py-2">Previous</Button>
                    <Button variant="outline" className="px-4 py-2 bg-blue-500 text-white">1</Button>
                    <Button variant="outline" className="px-4 py-2">2</Button>
                    <Button variant="outline" className="px-4 py-2">3</Button>
                    <Button variant="outline" className="px-4 py-2">4</Button>
                    <Button variant="outline" className="px-4 py-2">5</Button>
                    <Button variant="outline" className="px-4 py-2">Next</Button>
                </div>
            </div>
        </div>
    )
}

export default DataTable