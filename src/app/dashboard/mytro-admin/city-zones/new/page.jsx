"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"

export default function Page() {
  const [zoneData, setZoneData] = useState({
    name: "", // Changed from zoneName to match backend schema
    cityId: "",
    cords: "",  
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!zoneData.name.trim()) {
      newErrors.name = "Zone name is required";
    }
    
    if (!zoneData.cityId.trim()) {
      newErrors.cityId = "City ID is required";
    }
    
    if (!zoneData.cords.trim()) {
      newErrors.cords = "Coordinates are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setZoneData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSaveZone = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("http://localhost:8000/zones/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: zoneData.name,
          cityId: Number(zoneData.cityId), // Convert to number
          cords: zoneData.cords,
          id: Date.now(), // Generate a unique ID
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating zone");
      }
      
      const data = await response.json();
      toast.success("Zone created successfully");
      
      // Optionally reset form after successful submission
      setZoneData({
        name: "",
        cityId: "",
        cords: "",
      });
    } catch (error) {
      console.error("Error creating zone:", error);
      toast.error(error.message || "Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create New Delivery Zone
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zone Nam
            </label>
            <Input
              name="zoneName"
              placeholder="Enter a descriptive zone name"
              value={zoneData.zoneName}
              onChange={handleInputChange}
            />              
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City ID
            </label>
            <Input
              name="cityId"
              placeholder="Enter the unique city identifier"
              value={zoneData.cityId}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coordinates <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="cords"
              placeholder="Enter zone coordinates (e.g., latitude,longitude)"
              value={zoneData.cords}
              onChange={handleInputChange}
              className={errors.cords ? "border-red-500" : ""}
            />
            {errors.cords && (
              <p className="text-red-500 text-xs mt-1">{errors.cords}</p>
            )}
          </div>
          
          
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58627.51025040565!2d72.57974222962997!3d23.215635599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f8b726e0e1%3A0xc8baf06b0490dfd8!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1696272498898!5m2!1sen!2sin"
              width="100%"
              height="300"
              className="border-2 border-gray-200 rounded-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          <Button
            onClick={handleSaveZone}
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
          >
            {isSaving ? "Saving..." : "Create Zone"}
          </Button>
        </div>
      </div>
    </div>
  );
}
