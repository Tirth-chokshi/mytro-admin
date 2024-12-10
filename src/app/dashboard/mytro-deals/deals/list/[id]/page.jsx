"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
const EditShopPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  const {userId} = useParams()

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Shop</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-500 text-white p-4 mb-6">
              Shop Details
            </div>
            
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="salons">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salons">Salons</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sub Category */}
            <div className="space-y-2">
              <Label htmlFor="subCategory">Sub Category</Label>
              <Select defaultValue="skincare">
                <SelectTrigger>
                  <SelectValue placeholder="Select sub category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skincare">Skin Care</SelectItem>
                  <SelectItem value="haircare">Hair Care</SelectItem>
                  <SelectItem value="makeup">Makeup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Area */}
            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <Select defaultValue="rayasan">
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rayasan">Rayasan</SelectItem>
                  <SelectItem value="gandhinagar">Gandhinagar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue="Petals Salon" />
            </div>

            {/* Sub Title */}
            <div className="space-y-2">
              <Label htmlFor="subTitle">Sub Title</Label>
              <Input 
                id="subTitle" 
                defaultValue="Shop No. 32, Satvan Bellevue, Raysan Rd, opp. BAPS School, Urjanagar 1, Gandhinagar" 
              />
            </div>

            {/* Timings */}
            <div className="space-y-2">
              <Label htmlFor="timings">Timings</Label>
              <Input id="timings" defaultValue="10:30AM - 7PM" />
            </div>

            {/* About */}
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea 
                id="about"
                className="min-h-[100px]"
                defaultValue="Petals Salon is a posh luxury sesh salon for ladies, offering a holistic range of premium hair & beauty services. Established in the heart of Gandhinagar, Petals Salon comes with state-of-the-art ambiance designed for a sensorial, upscale experience."
              />
            </div>

            {/* Ratings */}
            <div className="space-y-2">
              <Label htmlFor="ratings">Ratings</Label>
              <Input id="ratings" type="number" step="0.1" defaultValue="4.5" />
            </div>

            {/* Display Order */}
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input id="displayOrder" type="number" defaultValue="1" />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" />
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="recommended">Recommended</Label>
                <Switch id="recommended" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active</Label>
                <Switch id="active" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo">Is Demo Shop</Label>
                <Select defaultValue="no">
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditShopPage;