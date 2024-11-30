"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useParams } from "next/navigation"
import Image from 'next/image'

export default function EditDealBanner() {
    const [image, setImage] = React.useState(null);
    const [banner, setBanner] = React.useState(null);
    const [imagePreview, setImagePreview] = React.useState("/cafe-icon.png");
    const [bannerPreview, setBannerPreview] = React.useState("/vouchers-logo.png");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };
    const { id } = useParams()
    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader className="bg-blue-500">
                    <CardTitle className="text-white">Shop Category Details</CardTitle>
                </CardHeader>
                <CardContent className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Cafe" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="display-order">Display Order</Label>
                                <Input id="display-order" type="number" defaultValue="6" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="is-active">Is Active</Label>
                                <Select defaultValue="no">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="image">Image</Label>
                                <div className="space-y-4">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('image').click()}
                                    >
                                        Choose File
                                    </Button>
                                    {imagePreview && (
                                        <div className="relative w-24">
                                            <Image
                                                src={imagePreview}
                                                alt="Category preview"
                                                className="w-full h-auto"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute -top-2 -right-2"
                                                onClick={() => setImagePreview(null)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="banner">Categories Banner</Label>
                                <div className="space-y-4">
                                    <Input
                                        id="banner"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBannerChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('banner').click()}
                                    >
                                        Choose File
                                    </Button>
                                    {bannerPreview && (
                                        <div className="relative w-48">
                                            <Image
                                                src={bannerPreview}
                                                alt="Banner preview"
                                                className="w-full h-auto"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute -top-2 -right-2"
                                                onClick={() => setBannerPreview(null)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}