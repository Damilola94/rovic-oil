"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, FileText } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Image from "next/image"

export default function SendQuotationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
    description: "",
    density: "",
    quantity: "",
    price: "",
    emailAddress: "",
  })

  const totalAmount =
    formData.quantity && formData.price
      ? (Number.parseFloat(formData.quantity) * Number.parseFloat(formData.price)).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : "0.00"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePreview = () => {
    sessionStorage.setItem("quotationData", JSON.stringify(formData))
    router.push("/communications/send-quotation/preview")
  }

  return (
    <DashboardLayout pageTitle="Send Quotation">
      <div className="min-h-screen bg-background">
        <div className="flex items-center gap-3">
          <Link href="/communications" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ChevronLeft className="w-5 h-5" />
            Back
          </Link>
        </div>
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <Image
                  src="/svg/receipt-item.svg"
                  alt="Rovic Oil & Gas Logo"
                  width={30} height={30}
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-foreground text-center mb-8">Send Quotation</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Customer's Name</label>
                <Input
                  type="text"
                  name="customerName"
                  placeholder="Customer's Name"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Customer Address</label>
                <Input
                  type="text"
                  name="customerAddress"
                  placeholder="Enter Address"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Density</label>
                <Input
                  type="text"
                  name="density"
                  placeholder="Enter Density"
                  value={formData.density}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <Input
                  type="email"
                  name="emailAddress"
                  placeholder="Customer's Email Address"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Total Amount (₦)</label>
                <div className="px-3 py-2 border border-border rounded-md bg-muted text-foreground">{totalAmount}</div>
              </div>

              <Button
                type="button"
                size="lg"
                onClick={handlePreview}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md"
              >
                Preview Quotation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>

  )
}
