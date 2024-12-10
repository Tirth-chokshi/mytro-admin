"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateSubCategory() {
  const [formData, setFormData] = useState({
    name: "",
    displayOrder: "",
    sourceAt: "",
    sourceAtColor: "",
    category: "",
    status: "",
    tempStatus: "",
  });

  const [image, setImage] = useState(null);
  const [heroBanner, setHeroBanner] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/categories/all");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("displayOrder", formData.displayOrder);
    formDataObj.append("sourceAt", formData.sourceAt);
    formDataObj.append("sourceAtColor", formData.sourceAtColor);
    formDataObj.append("category", formData.category);
    formDataObj.append("status", formData.status);
    formDataObj.append("tempStatus", formData.tempStatus);
    if (image) formDataObj.append("image", image);
    if (heroBanner) formDataObj.append("heroBanner", heroBanner);

    try {
      const response = await fetch(
        "http://localhost:8000/subcategories/create",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (response.ok) {
        alert("Subcategory created successfully!");
      } else {
        alert("Error creating subcategory.");
        console.error("Error creating subcategory:", response.statusText);
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New SubCategory</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter subcategory name"
            required
          />
        </div>

        {/* Display Order Field */}
        <div>
          <Label htmlFor="displayOrder">Display Order</Label>
          <Input
            id="displayOrder"
            name="displayOrder"
            type="number"
            value={formData.displayOrder}
            onChange={handleInputChange}
            placeholder="Enter display order"
            required
          />
        </div>

        {/* Source At */}
        <div>
          <Label htmlFor="sourceAt">Source At</Label>
          <Input
            id="sourceAt"
            name="sourceAt"
            value={formData.sourceAt}
            onChange={handleInputChange}
            placeholder="Enter source location"
          />
        </div>

        {/* Source At Color */}
        <div>
          <Label htmlFor="sourceAtColor">Source At Color</Label>
          <Input
            id="sourceAtColor"
            name="sourceAtColor"
            value={formData.sourceAtColor}
            onChange={handleInputChange}
            placeholder="Enter source color"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
            value={formData.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
        <div>
          <Label>Category Image</Label>
          <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        {/* Hero Banner Upload */}
        <div>
          <Label>Hero Banner</Label>
          <Input
            type="file"
            onChange={(e) => setHeroBanner(e.target.files[0])}
          />
        </div>

        {/* Status */}
        <div>
          <Label>Status</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
            defaultValue={formData.status}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Temporary Status */}
        <div>
          <Label>Temporary Status</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, tempStatus: value }))
            }
            defaultValue={formData.tempStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select temporary status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit">Create SubCategory</Button>
      </form>
    </div>
  );
}
