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
    status: "active",
    tempStatus: "inactive"
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/categories/all");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setError("Failed to fetch categories");
        }
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
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
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8000/subcategories/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            displayOrder: parseInt(formData.displayOrder),
            sourceAt: formData.sourceAt,
            sourceAtColor: formData.sourceAtColor,
            category: formData.category,
            status: formData.status,
            tempStatus: formData.tempStatus
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Subcategory created successfully!");
        // Reset form
        setFormData({
          name: "",
          displayOrder: "",
          sourceAt: "",
          sourceAtColor: "",
          category: "",
          status: "active",
          tempStatus: "inactive"
        });
      } else {
        setError(data.error || "Error creating subcategory");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New SubCategory</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div>
          <Label htmlFor="sourceAt">Source At</Label>
          <Input
            id="sourceAt"
            name="sourceAt"
            value={formData.sourceAt}
            onChange={handleInputChange}
            placeholder="Enter source location"
            required
          />
        </div>

        <div>
          <Label htmlFor="sourceAtColor">Source At Color</Label>
          <Input
            id="sourceAtColor"
            name="sourceAtColor"
            value={formData.sourceAtColor}
            onChange={handleInputChange}
            placeholder="Enter source color"
            required
          />
        </div>

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

        <div>
          <Label>Status</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
            value={formData.status}
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

        <div>
          <Label>Temporary Status</Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, tempStatus: value }))
            }
            value={formData.tempStatus}
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

        <Button type="submit">Create SubCategory</Button>
      </form>
    </div>
  );
}