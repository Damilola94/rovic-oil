"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Mock customer data - in a real app, this would come from an API
const customerData = {
  1: {
    name: "David Abiola",
    location: "Abuja",
    contact: "0812 345 6789",
    email: "Davidabiola@gmail.com",
    identificationType: "NIN",
    idNumber: "12345678909876",
    currentBalance: "Nil",
  },
}

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const customerId = Number.parseInt(params.id)
  const customer = customerData[customerId as keyof typeof customerData]

  const [formData, setFormData] = useState({
    name: customer?.name || "",
    location: customer?.location || "",
    contact: customer?.contact || "",
    email: customer?.email || "",
    identificationType: customer?.identificationType || "",
    idNumber: customer?.idNumber || "",
    currentBalance: customer?.currentBalance || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Updating customer:", formData)
    router.push("/customers")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/customers">
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <ChevronLeft size={20} />
              Back
            </button>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="p-8 max-w-2xl">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <User size={32} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Customer Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Identification Type */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Identification Type</label>
              <input
                type="text"
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* ID Number */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Current Balance */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Current Balance</label>
              <input
                type="text"
                name="currentBalance"
                value={formData.currentBalance}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
            >
              Add Customer
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
