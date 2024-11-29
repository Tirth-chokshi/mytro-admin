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
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const columns = ["ID", "Title","Active","Actions"]
const data = [
    { id: 1, title: "Shop 1", active: true },
    { id: 2, title: "Shop 2", active: false },
    { id: 3, title: "Shop 3", active: true },
];

const DataTable = () => {

    return (
        <section>
            {/* Search and Controls */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
            </div>
            <Button variant="primary" className="flex items-center space-x-2">
                <span>Add</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
            </Button>
        </div>
            {/* Responsive Table/Card View */}
            <div className="hidden md:block rounded-lg border overflow-hidden mt-4">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead key={index}>
                                        {column}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((shop, index) => (
                                <TableRow key={index}>
                                    <TableCell>{shop.id}</TableCell>
                                    <TableCell>{shop.title}</TableCell>
                                    <TableCell>
                                        <Switch checked={shop.active} />
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/mytro-deals/shops/${shop.id}`}>
                                            View
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <PaginationControls />
        </section>
    )
}

const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <p className="text-sm text-center sm:text-left">
            Showing 1 of 50 entries
        </p>
        <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline">Previous</Button>
            {[1, 2, 3].map(page => (
                <Button key={page} variant="outline">
                    {page}
                </Button>
            ))}
            <Button variant="outline">Next</Button>
        </div>
    </div>
)

export default DataTable