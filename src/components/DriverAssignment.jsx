import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function OrderDriverAssignment({ order, onDriverUpdate }) {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available drivers whenever dialog opens
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setError(null);
        const response = await fetch('http://localhost:8000/drivers/all');
        if (!response.ok) {
          throw new Error('Failed to fetch drivers');
        }
        const data = await response.json();
        // Only set available drivers and ensure we have the required fields
        const availableDrivers = data
          .filter(driver => driver.status === 'Available')
          .map(driver => ({
            id: driver._id,
            name: driver.name,
            mobile: driver.mobile
          }));
        setDrivers(availableDrivers);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setError('Failed to load drivers. Please try again.');
      }
    };
    
    if (isDialogOpen) {
      fetchDrivers();
    }
  }, [isDialogOpen]);

  const handleAssignDriver = async () => {
    if (!selectedDriver) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/orders/assign-driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderCode: order.orderCode,
          driverId: selectedDriver.id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign driver');
      }

      const data = await response.json();
      onDriverUpdate(data.order);
      setIsDialogOpen(false);
      setSelectedDriver(null);
    } catch (error) {
      console.error('Error assigning driver:', error);
      setError(error.message || 'Failed to assign driver. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnassignDriver = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/orders/unassign-driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderCode: order.orderCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to unassign driver');
      }

      const data = await response.json();
      onDriverUpdate(data.order);
    } catch (error) {
      console.error('Error unassigning driver:', error);
      setError(error.message || 'Failed to unassign driver. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Assignment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-sm text-red-500 mb-2">{error}</div>
        )}
        
        {order.driver ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Assigned Driver</p>
              <p>{order.driver.name}</p>
              <p className="text-sm text-gray-500">{order.driver.mobile}</p>
            </div>
            <Button 
              variant="destructive"
              onClick={handleUnassignDriver}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Unassign Driver
            </Button>
          </div>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Assign Driver</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Driver to Order</DialogTitle>
                <DialogDescription>
                  Select a driver to assign to this order.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {drivers.length === 0 && !error && (
                  <p className="text-sm text-gray-500">No available drivers found.</p>
                )}

                {drivers.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {selectedDriver?.name ?? "Select driver..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search drivers..." />
                        <CommandList>
                          <CommandEmpty>No drivers found.</CommandEmpty>
                          <CommandGroup>
                            {drivers.map((driver) => (
                              <CommandItem
                                key={driver.id}
                                value={driver.name}
                                onSelect={() => setSelectedDriver(driver)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedDriver?.id === driver.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {driver.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    onClick={handleAssignDriver}
                    disabled={!selectedDriver || isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Assign Driver
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}