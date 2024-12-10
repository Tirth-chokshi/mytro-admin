"use client";
import { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AddProduct() {
    
  return (
    <div className="p-8 min-h-screen">
      <form className="max-w-7xl mx-auto shadow rounded-lg p-6 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter title" />
            </div>
            <div>
              <Label htmlFor="variant">Variant Name</Label>
              <Input id="variant" placeholder="Enter variant name" />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" placeholder="Enter unit" />
            </div>
            <div>
              <Label htmlFor="store">Store</Label>
              <Select>
                <SelectTrigger id="store">Choose One</SelectTrigger>
                <SelectContent>
                  <SelectItem value="store1">Store 1</SelectItem>
                  <SelectItem value="store2">Store 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">Choose One</SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Label>Is Veg</Label>
              <Switch />
            </div>
            <div>
              <Label htmlFor="subcategory">Sub Category</Label>
              <Select>
                <SelectTrigger id="subcategory">Choose One</SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub1">Subcategory 1</SelectItem>
                  <SelectItem value="sub2">Subcategory 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brands</Label>
              <Select>
                <SelectTrigger id="brand">Choose One</SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand1">Brand 1</SelectItem>
                  <SelectItem value="brand2">Brand 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" type="date" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="moq">MOQ</Label>
                <Input id="moq" type="number" placeholder="Enter MOQ" />
              </div>
              <div>
                <Label htmlFor="stock">Allowed Stock</Label>
                <Input id="stock" type="number" placeholder="Enter stock" />
              </div>
            </div>
            <div>
              <Label htmlFor="keywords">Related Keywords</Label>
              <Input id="keywords" placeholder="Example: potato, bataka" />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" />
            </div>
          </div>
        </div>

        {/* Business Details Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Business Details</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input id="salePrice" type="number" placeholder="Enter sale price" />
            </div>
            <div>
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <Input id="purchasePrice" type="number" placeholder="Enter purchase price" />
            </div>
            <div>
              <Label htmlFor="tax">Tax</Label>
              <Input id="tax" type="number" placeholder="Enter tax" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input id="discount" type="number" placeholder="Enter discount" />
              </div>
              <div>
                <Label htmlFor="discountType">Discount Type</Label>
                <Select>
                  <SelectTrigger id="discountType">Percent</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percent</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="delivery1">Delivery Time 1</Label>
              <Input id="delivery1" placeholder="Enter delivery time" />
            </div>
            <div>
              <Label htmlFor="delivery2">Delivery Time 2</Label>
              <Input id="delivery2" placeholder="Enter delivery time" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Publish</Label>
                <Switch />
              </div>
              <div>
                <Label>Today's Deal</Label>
                <Switch />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Trending Groceries</Label>
                <Switch />
              </div>
              <div>
                <Label>New Arrivals</Label>
                <Switch />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
