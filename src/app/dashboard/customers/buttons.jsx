'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Wallet2 } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Coins } from 'lucide-react'
import { Bell } from 'lucide-react'
import { Map } from 'lucide-react'

export const AddCashBtn = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Tooltip>
                <TooltipTrigger>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 p-0">
                                <Wallet2 className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogTitle>Add Cash</DialogTitle>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Enter Amount</label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="input input-bordered w-full mt-1"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Type</label>
                                <select className="select select-bordered w-full mt-1">
                                    <option>Credit</option>
                                    <option>Debit</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Message</label>
                                <input
                                    type="text"
                                    placeholder="Message"
                                    className="input input-bordered w-full mt-1"
                                />
                            </div>
                            <div className="mt-6">
                                <button className="btn btn-primary w-full">Add</button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <TooltipContent>
                        Add Cash
                    </TooltipContent>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
};



export const AddCoinBtn = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Tooltip>
                <TooltipTrigger>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 p-0">
                                <Coins className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogTitle>Add Cooin</DialogTitle>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Enter Coin</label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="input input-bordered w-full mt-1"
                                />
                            </div>
                            <div className="mt-6">
                                <button className="btn btn-primary w-full">Add</button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <TooltipContent>
                        Add Coin
                    </TooltipContent>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
};

export const NotiBtn = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Tooltip>
                <TooltipTrigger>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="bg-cyan-500 hover:bg-cyan-600 text-white w-8 h-8 p-0">
                                <Bell className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogTitle>Send Push</DialogTitle>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Enter Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    className="input input-bordered w-full mt-1"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Message</label>
                                <input
                                    type="text"
                                    placeholder="Message"
                                    className="input input-bordered w-full mt-1"
                                />
                            </div>
                            <div className="mt-6">
                                <button className="btn btn-primary w-full">Submit</button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <TooltipContent>
                        sendPushNotification
                    </TooltipContent>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
};

export const Addresbtn = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Tooltip>
                <TooltipTrigger>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="bg-cyan-500 hover:bg-cyan-600 text-white w-8 h-8 p-0">
                                <Map className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogTitle>Addres</DialogTitle>
                        </DialogContent>
                    </Dialog>
                    <TooltipContent>
                        Addres
                    </TooltipContent>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
};
