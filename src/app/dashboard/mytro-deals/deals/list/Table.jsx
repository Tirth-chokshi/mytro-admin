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
import { Switch } from '@/components/ui/switch'
import { Pencil } from 'lucide-react'
import Link from 'next/link'

const dealsData = [
    { id: 9, title: "20% OFF on Hair Services", active: true },
    { id: 10, title: "FREE Eyebrow on Skin Services", active: true },
    { id: 11, title: "FREE Hand Wax with Leg Wax", active: true },
    { id: 12, title: "Affordable Delivery Charges & Mediclaim Available", active: true },
    { id: 13, title: "Sales and Service", active: true },
];

const DataTable = () => {
    return (
        <section className="p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Deals</h1>
                <div className="flex items-center gap-2">
                    <div className="text-sm">Deal module on Demo mode</div>
                    <Switch />
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Add
                    </Button>
                </div>
            </div>

            {/* Table Controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span>Show</span>
                    <Select defaultValue="10">
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span>entries</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>Search:</span>
                    <Input className="w-64" />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dealsData.map((deal) => (
                            <TableRow key={deal.id}>
                                <TableCell>{deal.id}</TableCell>
                                <TableCell>{deal.title}</TableCell>
                                <TableCell>
                                    <Switch checked={deal.active} />
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="text-teal-500 hover:text-teal-600">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div>undefined</div>
                <div className="flex gap-2">
                    <Button variant="outline">Previous</Button>
                    <Button variant="primary">1</Button>
                    <Button variant="outline">Next</Button>
                </div>
            </div>
        </section>
    )
}

export default DataTable