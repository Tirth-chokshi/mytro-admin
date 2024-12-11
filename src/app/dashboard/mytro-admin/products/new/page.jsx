"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Brands from "@/app/data/brand";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    variantName: "",
    unit: "",
    store: "",
    category: "",
    isVeg: false,
    subCategory: "",
    brands: "",
    expiryDate: "",
    MOQ: "",
    allowedStock: "",
    currentStock: "",
    minimumStock: "",
    relatedKeywords: "",
    image: "",
    description: "",
    salePrice: "",
    purchasePrice: "",
    tax: "",
    discount: {
      value: "",
      type: "Percent",
    },
    deliveryTimes: {
      time1: "",
      time2: "",
    },
    publish: false,
    todaysDeal: {
      isActive: false,
      displayOrder: 0,
    },
    trendingGroceries: {
      isActive: false,
      displayOrder: 0,
    },
    newArrivals: {
      isActive: false,
      displayOrder: 0,
    },
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subCategoriesRes, storesRes] = await Promise.all([
          fetch("http://localhost:8000/categories/all"),
          fetch("http://localhost:8000/subcategories/all"),
          fetch("http://localhost:8000/stores/all"),
        ]);

        const categoriesData = await categoriesRes.json();
        const subCategoriesData = await subCategoriesRes.json();
        const storesData = await storesRes.json();

        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
        setStores(storesData);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => {
      // Handle nested objects
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [child]: type === "number" ? Number(value) || "" : value,
          },
        };
      }

      // Handle regular fields
      return {
        ...prevData,
        [name]: type === "number" ? Number(value) || "" : value,
      };
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name) => {
    setFormData((prevData) => {
      if (["todaysDeal", "trendingGroceries", "newArrivals"].includes(name)) {
        return {
          ...prevData,
          [name]: {
            ...prevData[name],
            isActive: !prevData[name].isActive,
          },
        };
      }
      return {
        ...prevData,
        [name]: !prevData[name],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        relatedKeywords: formData.relatedKeywords
          .split(",")
          .map((k) => k.trim()),
        discount: {
          value: Number(formData.discount.value) || 0,
          type: formData.discount.type,
        },
      };

      const response = await fetch("http://localhost:8000/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create product");
      }

      alert("Product created successfully!");
      // Reset form
      setFormData({
        title: "",
        variantName: "",
        unit: "",
        store: "",
        category: "",
        isVeg: false,
        subcategory: "",
        brand: "",
        expiry: "",
        moq: "",
        stock: "",
        keywords: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto shadow rounded-lg p-6 grid grid-cols-2 gap-6"
      >
        <div>
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="variant">Variant Name</Label>
              <Input
                id="variant"
                name="variant"
                placeholder="Enter variant name"
                value={formData.variant}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                name="unit"
                placeholder="Enter unit"
                value={formData.unit}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="store">Store</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    store: value,
                  }))
                }
                value={formData.store}
              >
                <SelectTrigger id="store">
                  <SelectValue placeholder="Select Store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store._id} value={store.name}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    category: value,
                  }))
                }
                value={formData.category}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Choose One" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Label>Is Veg</Label>
              <Switch />
            </div>
            <div>
              <Label htmlFor="subcategory">Sub Category</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    subcategory: value,
                  }))
                }
                value={formData.subcategory}
              >
                <SelectTrigger id="subcategory">
                  <SelectValue placeholder="Choose One" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((subCategory) => (
                    <SelectItem key={subCategory._id} value={subCategory.name}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brands</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    brand: value,
                  }))
                }
                value={formData.brand}
              >
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Choose One" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(Brands).map(([brandKey, brandValue]) => (
                    <SelectItem key={brandKey} value={brandValue}>
                      {brandValue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                name="expiry"
                type="date"
                value={formData.expiry}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="moq">MOQ</Label>
                <Input
                  id="moq"
                  name="moq"
                  type="number"
                  placeholder="Enter MOQ"
                  value={formData.moq}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="stock">Allowed Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Enter stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="keywords">Related Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="Example: potato, bataka"
                value={formData.keywords}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Business Details Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Business Details</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                placeholder="Enter sale price"
                value={formData.salePrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <Input
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                placeholder="Enter purchase price"
                value={formData.purchasePrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="tax">Tax</Label>
              <Input
                id="tax"
                name="tax"
                type="number"
                placeholder="Enter tax"
                value={formData.tax}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  placeholder="Enter discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="discountType">Discount Type</Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(value) =>
                    handleSelectChange("discountType", value)
                  }
                >
                  <SelectTrigger id="discountType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percent</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="delivery1">Delivery Time 1</Label>
              <Input
                id="delivery1"
                name="delivery1"
                placeholder="Enter delivery time"
                value={formData.delivery1}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="delivery2">Delivery Time 2</Label>
              <Input
                id="delivery2"
                name="delivery2"
                placeholder="Enter delivery time"
                value={formData.delivery2}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Publish</Label>
                <Switch
                  checked={formData.isPublished}
                  onCheckedChange={() => handleSwitchChange("isPublished")}
                />
              </div>
              <div>
                <Label>Todays Deal</Label>
                <Switch
                  checked={formData.isTodaysDeal}
                  onCheckedChange={() => handleSwitchChange("isTodaysDeal")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Trending Groceries</Label>
                <Switch
                  checked={formData.isTrendingGrocery}
                  onCheckedChange={() =>
                    handleSwitchChange("isTrendingGrocery")
                  }
                />
              </div>
              <div>
                <Label>New Arrivals</Label>
                <Switch
                  checked={formData.isNewArrival}
                  onCheckedChange={() => handleSwitchChange("isNewArrival")}
                />
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
