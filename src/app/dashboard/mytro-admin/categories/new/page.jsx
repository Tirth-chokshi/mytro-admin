"use client";
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const NewCategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [image, setImage] = useState(null)
  const [heroBanner, setHeroBanner] = useState(null)

  const onSubmit = async (data) => {
    const formData = new FormData()
    
    // Append all form data
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    
    // Append files
    if (image) formData.append('image', image)
    if (heroBanner) formData.append('heroBanner', heroBanner)

    try {
      const response = await fetch('http://localhost:8000/categories/create', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      console.log(result)
      // TODO: Add success notification or redirect
    } catch (error) {
      console.error('Error creating category:', error)
      // TODO: Add error handling notification
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
              <input 
                {...register('name', { required: true })}
                className={`mt-1 block w-full rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } shadow-sm py-2 px-3`}
                placeholder="Enter category name"
              />
            </label>
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Display Order Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
              <input 
                type="number" 
                {...register('displayOrder', { 
                  required: true, 
                  valueAsNumber: true 
                })}
                className={`mt-1 block w-full rounded-md border ${
                  errors.displayOrder ? 'border-red-500' : 'border-gray-300'
                } shadow-sm py-2 px-3`}
                placeholder="Enter display order"
              />
            </label>
            {errors.displayOrder && (
              <p className="mt-1 text-red-500 text-sm">Display Order is required</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500 
                  file:mr-4 file:rounded-md file:border-0 
                  file:bg-blue-500 file:py-2 file:px-4 
                  file:text-sm file:font-medium 
                  file:text-white hover:file:bg-blue-600"
              />
            </label>
          </div>

          {/* Hero Banner Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Banner
              <input 
                type="file" 
                onChange={(e) => setHeroBanner(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500 
                  file:mr-4 file:rounded-md file:border-0 
                  file:bg-blue-500 file:py-2 file:px-4 
                  file:text-sm file:font-medium 
                  file:text-white hover:file:bg-blue-600"
              />
            </label>
          </div>

          {/* Top Selling Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Top Selling Items
              <input 
                {...register('topSellingItems')}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
                placeholder="Enter top selling items"
              />
            </label>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag
              <input 
                {...register('tag')}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
                placeholder="Enter tag"
              />
            </label>
          </div>

          {/* Tag Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag Color
              <input 
                {...register('tagColor')}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
                placeholder="Enter tag color"
              />
            </label>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
              <select 
                {...register('status')}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>

          {/* Temporary Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temporary Status
              <select 
                {...register('tempStatus')}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCategory
