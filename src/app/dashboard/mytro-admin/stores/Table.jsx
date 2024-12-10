"use client"
import React, { useState, useEffect } from 'react'
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
import { Search, Loader2, Trash, Edit } from 'lucide-react'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const columns = ["ID", "Name", "Store Info", "Store Timming", "Store Type", "isActive", "isClose", "Actions"]

const DataTable = () => {
    const [entriesCount, setEntriesCount] = useState("10")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [stores, setStores] = useState([])
    const [deleteStoreId, setDeleteStoreId] = useState(null)
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    })

    useEffect(() => {
        const getStores = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch('http://localhost:8000/stores/all')
                if (!response.ok) {
                    throw new Error('Failed to fetch stores')
                }
                const data = await response.json()
                setStores(data)
                setPagination(data.pagination || {
                    total: data.data?.length || 0,
                    page: 1,
                    limit: 10,
                    totalPages: Math.ceil((data.data?.length || 0) / 10)
                })            
            } catch (error) {
                console.error('Error fetching stores:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        getStores()
    }, [])

    const handleDelete = async () => {
        if (!deleteStoreId) return

        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8000/stores/delete/${deleteStoreId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete store')
            }

            // Remove the deleted store from the state
            setStores(prevStores => prevStores.filter(store => store._id !== deleteStoreId))
            
            // Update pagination
            setPagination(prev => ({
                ...prev,
                total: prev.total - 1,
                totalPages: Math.ceil((prev.total - 1) / prev.limit)
            }))

            // Reset delete store id
            setDeleteStoreId(null)
        } catch (error) {
            console.error('Error deleting store:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (searchTerm) => {
        
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 text-red-500">
                Error loading stores: {error}
            </div>
        )
    }

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
                        placeholder="Search stores..."
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                </div>
            </div>

            {/* Table */}
            <div className="hidden md:block rounded-lg border overflow-hidden mt-4">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead key={index}>{column}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                            <span className="ml-2">Loading stores...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) 
                            : stores.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No stores found
                                    </TableCell>
                                </TableRow>
                            ) 
                            : (
                                stores.map(store => (
                                    <TableRow key={store._id}>
                                        <TableCell>{store._id}</TableCell>
                                        <TableCell>{store.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{store.storeInfo.address}</span>
                                                <span className="text-sm">{store.storeInfo.mobile}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{store.storeTimings.from} to {store.storeTimings.to}</TableCell>
                                        <TableCell>{store.storeType}</TableCell>
                                        <TableCell>
                                            <Switch checked={store.isActive} />
                                        </TableCell>
                                        <TableCell>
                                            <Switch checked={store.isClosed} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Link href={`/dashboard/mytro-admin/stores/edit/${store._id}`} className="text-primary">
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button 
                                                            onClick={() => setDeleteStoreId(store._id)} 
                                                            className="text-red-500"
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the store from the system.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={handleDelete}>
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-sm text-center sm:text-left">
                    Showing {stores.length ? ((pagination.page - 1) * pagination.limit) + 1 : 0} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    <Button 
                        variant="outline" 
                        disabled={pagination.page === 1}
                    >
                        Previous
                    </Button>
                    {Array.from({ length: pagination.totalPages }, (_, i) => (
                        <Button 
                            key={i + 1} 
                            variant={pagination.page === i + 1 ? "default" : "outline"}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button 
                        variant="outline" 
                        disabled={pagination.page === pagination.totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default DataTable