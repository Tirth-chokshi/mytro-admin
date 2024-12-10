'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'

export default function AddStorePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
    //   storeImage: "",
    //   storeHeroBanner: "",
    //   storeLogo: "",
      storeInfo: {
        address: "",
        mobile: "",
      },
      storeTimings: {
        from: "",
        to: "",
        deliveryTime: 30,
      },
      storeType: "",
      isActive: true,
      isClosed: false,
      displayOrder: 0,
      brands: [],
      storeClosedMessage: "",
      deliveryZones: [],
      storeDescription: "",
      storeCommission: 0,
      storeRatings: 0,
      storeTotalRatings: 0,
    },
  })

  async function onSubmit(data) {
    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:8000/stores/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create store')
      }

      const result = await response.json()
      toast({
        title: "Store created successfully",
        description: `Store ${result.name} has been added.`,
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add Store</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Store name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select store type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vegetables">Vegetables & Grocery</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storeInfo.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Store address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="storeTimings.from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opening Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="storeTimings.to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="storeTimings.deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storeCommission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Commission</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="storeImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Image</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={e => field.onChange(e.target.files[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storeHeroBanner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Hero Banner</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={e => field.onChange(e.target.files[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storeLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Logo</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={e => field.onChange(e.target.files[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Store Active</FormLabel>
                        <FormDescription>
                          Enable or disable store visibility
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isClosed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Store Closed</FormLabel>
                        <FormDescription>
                          Temporarily close the store
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="storeClosedMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Closed Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Message to display when store is closed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Store description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

