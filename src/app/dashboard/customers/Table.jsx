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
import { Wallet2, BarChart3, Bell, Eye, Search, Coins, Map } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useState } from 'react'
import AddCashDialog, { AddCashBtn, AddCoinBtn, Addresbtn, NotiBtn } from './buttons'
import Link from 'next/link'

const columns = ["No", "User Info", "App Info", "Mobile", "CustCode", "RefCode", "Coin/Cash", "Registerd On", "Block", "Action"]


const DataTable = () => {
    const users = [
        {
            id: '8435',
            name: 'Bimalsinh',
            email: 'bimalsinjadeja9@gmail.com',
            gender: 'Female',
            age: '',
            platform: 'Android',
            osVersion: '14',
            appVersion: '3.4.39',
            phone: '+918460006554',
            whatsapp: '+918460006554',
            custCode: 'BIM3538',
            coin: 0,
            cash: 0,
            registeredOn: '19 Nov 2024 04:35 PM',
            isBlocked: false
        }
        ,
        {
            id: '8436',
            name: 'John Doe',
            email: 'john.doe@example.com',
            gender: 'Male',
            age: '30',
            platform: 'iOS',
            osVersion: '15',
            appVersion: '3.4.39',
            phone: '+1234567890',
            whatsapp: '+1234567890',
            custCode: 'JOH1234',
            coin: 10,
            cash: 100,
            registeredOn: '20 Nov 2024 10:00 AM',
            isBlocked: false
        },
        {
            id: '8437',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            gender: 'Female',
            age: '25',
            platform: 'Android',
            osVersion: '12',
            appVersion: '3.4.39',
            phone: '+0987654321',
            whatsapp: '+0987654321',
            custCode: 'JAN5678',
            coin: 20,
            cash: 200,
            registeredOn: '21 Nov 2024 11:00 AM',
            isBlocked: true
        },
        {
            id: '8438',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            gender: 'Female',
            age: '28',
            platform: 'iOS',
            osVersion: '14',
            appVersion: '3.4.39',
            phone: '+1122334455',
            whatsapp: '+1122334455',
            custCode: 'ALI9101',
            coin: 30,
            cash: 300,
            registeredOn: '22 Nov 2024 12:00 PM',
            isBlocked: false
        },
        {
            id: '8439',
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            gender: 'Male',
            age: '35',
            platform: 'Android',
            osVersion: '13',
            appVersion: '3.4.39',
            phone: '+2233445566',
            whatsapp: '+2233445566',
            custCode: 'BOB1121',
            coin: 40,
            cash: 400,
            registeredOn: '23 Nov 2024 01:00 PM',
            isBlocked: true
        },
        {
            id: '8440',
            name: 'Charlie Davis',
            email: 'charlie.davis@example.com',
            gender: 'Male',
            age: '40',
            platform: 'iOS',
            osVersion: '15',
            appVersion: '3.4.39',
            phone: '+3344556677',
            whatsapp: '+3344556677',
            custCode: 'CHA3141',
            coin: 50,
            cash: 500,
            registeredOn: '24 Nov 2024 02:00 PM',
            isBlocked: false
        },
        {
            id: '8441',
            name: 'David Evans',
            email: 'david.evans@example.com',
            gender: 'Male',
            age: '45',
            platform: 'Android',
            osVersion: '12',
            appVersion: '3.4.39',
            phone: '+4455667788',
            whatsapp: '+4455667788',
            custCode: 'DAV5161',
            coin: 60,
            cash: 600,
            registeredOn: '25 Nov 2024 03:00 PM',
            isBlocked: true
        },
        {
            id: '8442',
            name: 'Eve Foster',
            email: 'eve.foster@example.com',
            gender: 'Female',
            age: '50',
            platform: 'iOS',
            osVersion: '14',
            appVersion: '3.4.39',
            phone: '+5566778899',
            whatsapp: '+5566778899',
            custCode: 'EVE7181',
            coin: 70,
            cash: 700,
            registeredOn: '26 Nov 2024 04:00 PM',
            isBlocked: false
        },
        {
            id: '8443',
            name: 'Frank Green',
            email: 'frank.green@example.com',
            gender: 'Male',
            age: '55',
            platform: 'Android',
            osVersion: '13',
            appVersion: '3.4.39',
            phone: '+6677889900',
            whatsapp: '+6677889900',
            custCode: 'FRA9201',
            coin: 80,
            cash: 800,
            registeredOn: '27 Nov 2024 05:00 PM',
            isBlocked: true
        },
        {
            id: '8444',
            name: 'Grace Harris',
            email: 'grace.harris@example.com',
            gender: 'Female',
            age: '60',
            platform: 'iOS',
            osVersion: '15',
            appVersion: '3.4.39',
            phone: '+7788990011',
            whatsapp: '+7788990011',
            custCode: 'GRA1221',
            coin: 90,
            cash: 900,
            registeredOn: '28 Nov 2024 06:00 PM',
            isBlocked: false
        },
        {
            id: '8445',
            name: 'Hank Irving',
            email: 'hank.irving@example.com',
            gender: 'Male',
            age: '65',
            platform: 'Android',
            osVersion: '12',
            appVersion: '3.4.39',
            phone: '+8899001122',
            whatsapp: '+8899001122',
            custCode: 'HAN3241',
            coin: 100,
            cash: 1000,
            registeredOn: '29 Nov 2024 07:00 PM',
            isBlocked: true
        }
    ];

    return (
        <section>
            {/* Search and Controls */}
            <div className="rounded-lg border p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:justify-between md:items-center ">
                <div className="flex items-center gap-2">
                    <span className="text-sm ">Show</span>
                    <Select>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm ">entries</span>
                </div>

                <div className="relative flex-1 md:max-w-xs">
                    <Input
                        type="search"
                        placeholder="Search orders..."
                        className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 " />
                </div>
            </div>

            {/* Responsive Table/Card View */}
            <div className="hidden md:block rounded-lg border overflow-hidden ">
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
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p><span className="font-semibold">Name:</span> {user.name}</p>
                                            <p><span className="font-semibold">Email:</span> {user.email}</p>
                                            <p><span className="font-semibold">Gender:</span> {user.gender}</p>
                                            <p><span className="font-semibold">Age:</span> {user.age}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p>Platform: {user.platform}</p>
                                            <p>OS Version: {user.osVersion}</p>
                                            <p>App Version: {user.appVersion}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p>Phone: {user.phone}</p>
                                            <p>Whatsapp: {user.whatsapp}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.custCode}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p>Coin: {user.coin}</p>
                                            <p>Cash: {user.cash}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.registeredOn}</TableCell>
                                    <TableCell>
                                        <Switch
                                            onCheckedChange={() => { }}
                                            className="data-[state=checked]:bg-red-500"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <AddCashBtn />
                                            <AddCoinBtn />
                                            <NotiBtn />
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/dashboard/customers/view/${user.id}`}>
                                                        <Button variant="outline" className="bg-cyan-500 hover:bg-cyan-600 text-white w-8 h-8 p-0">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>View</TooltipContent>
                                            </Tooltip>
                                            <Addresbtn />
                                        </div>
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
    );
};

export default DataTable;

const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <p className="text-sm  text-center sm:text-left">
            Showing 1 of 50 entries
        </p>
        <div className="flex flex-wrap justify-center gap-2">
            <Button
                variant="outline"
            >
                Previous
            </Button>
            {[1, 2, 3].map(page => (
                <Button
                    key={page}
                    variant="outline"
                >
                    {page}
                </Button>
            ))}
            <Button
                variant="outline"
            >
                Next
            </Button>
        </div>
    </div>
)