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
import Im1 from './1.jpg'
import Im2 from './2.jpg'
import Im3 from './3.jpg'
import Im4 from './4.jpg'


const columns = ["ID", "Banner", "Banner Position", "Status", "Action"]
const deals = [
    { id: 1, banner: Im1, position: 'Top', status: 'Active', action: 'Edit' },
    { id: 2, banner: Im2, position: 'Bottom', status: 'Inactive', action: 'Edit' },
    { id: 3, banner: Im3, position: 'Left', status: 'Active', action: 'Edit' },
    { id: 4, banner: Im4, position: 'Right', status: 'Inactive', action: 'Edit' },
]

const DataTable = () => {
    const [entriesCount, setEntriesCount] = React.useState("10")

    return (
        <section>
            {/* Search and Controls */}
            <div className="rounded-lg border p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm">Show</span>
                    <Select value={entriesCount} onValueChange={setEntriesCount}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue>{entriesCount}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm">entries</span>
                </div>

                <div className="relative flex-1 md:max-w-xs">
                    <Input
                        type="search"
                        placeholder="Search orders..."
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                </div>
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
                            {deals.map(deal => (
                                <TableRow key={deal.id}>
                                    <TableCell>{deal.id}</TableCell>
                                    <TableCell>
                                        <div className="relative w-24 h-16">
                                            <Image
                                                src={deal.banner}
                                                alt={`Banner ${deal.id}`}
                                                fill
                                                className="object-cover rounded"
                                                // sizes="(max-width: 96px) 100vw, 96px"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>{deal.position}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={deal.status === 'Active'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/mytro-deals/deal_banners/edit/${deal.id}`} className="text-primary">
                                            Edit
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