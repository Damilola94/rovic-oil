"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ChevronLeft, CheckCircle2 } from "lucide-react"

const parentCompanies = ["KFC", "Dangote", "Chicken Republic", "NNPC", "Wema Bank", "MTN Nigeria"]

export default function AddCustomerPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    customerType: "",
    name: "",
    location: "",
    phone: "",
    email: "",
    hasParentCompany: "",
    parentCompany: "",
  })
  const [showParentDropdown, setShowParentDropdown] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "hasParentCompany" && value === "No") {
      setFormData((prev) => ({ ...prev, parentCompany: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <DashboardLayout pageTitle="Add Customer">
        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-accent/10">
            <CheckCircle2 size={64} className="text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Customer added successfully</h2>
          <button onClick={() => router.push("/customers")} className="text-accent hover:text-accent/80 font-medium">
            ← Back to my customers
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 cursor-pointer">
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-8 space-y-6">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Add New Customers</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type of Customer</label>
              <div className="relative">
                <select
                  value={formData.customerType}
                  onChange={(e) => handleSelectChange("customerType", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select type of customer</option>
                  <option value="Individual">Individual</option>
                  <option value="Company">Company</option>
                </select>
                <ChevronLeft
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-180"
                />
              </div>
              {formData.customerType && (
                <div className="mt-2 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent font-medium">{formData.customerType}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Customer's Name"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="000-000-0000"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Customer's Email Address"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Is there a parent company?</label>
              <div className="relative">
                <select
                  value={formData.hasParentCompany}
                  onChange={(e) => handleSelectChange("hasParentCompany", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <ChevronLeft
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-180"
                />
              </div>
            </div>

            {formData.hasParentCompany === "Yes" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select parent company affiliation
                </label>
                <div className="relative">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.parentCompany}
                      onChange={(e) => handleSelectChange("parentCompany", e.target.value)}
                      placeholder="Enter Company Name"
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowParentDropdown(!showParentDropdown)}
                      className="px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                    >
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </div>

                  {showParentDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                      {parentCompanies.map((company) => (
                        <button
                          key={company}
                          type="button"
                          onClick={() => {
                            handleSelectChange("parentCompany", company)
                            setShowParentDropdown(false)
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition ${formData.parentCompany === company
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-slate-700"
                            }`}
                        >
                          {company}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg mt-8"
            >
              Add Customer
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
