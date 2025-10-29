"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ChevronLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const mockCustomers = [
  "Karandin Abugi",
  "Samantha Rivers",
  "Sami Carter",
  "Diana Valasquez",
  "Marcus Flynn",
  "Sia Nguyen",
]

const paymentTypes = ["Full Payment", "Part Payment", "On Credit"]
const repaymentDurations = ["1 week", "2 weeks", "1 month", "2 months", "3 months"]

export default function AddTransactionPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    typeOfUser: "",
    customer: "",
    quantity: "",
    pricePerLiter: "",
    paymentType: "",
    amountPaid: "",
    repaymentDuration: "",
  })
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
  const [customerSearch, setCustomerSearch] = useState("")

  const totalAmount =
    formData.quantity && formData.pricePerLiter
      ? (Number.parseFloat(formData.quantity) * Number.parseFloat(formData.pricePerLiter)).toLocaleString()
      : "120,000.00"

  const debit = formData.amountPaid ? (Number.parseFloat(formData.amountPaid) * 0.433).toFixed(3) : "52,000"
  const credit = formData.amountPaid ? Number.parseFloat(formData.amountPaid).toLocaleString() : "31,000"
  const currentBalance = formData.amountPaid ? (Number.parseFloat(formData.amountPaid) * 0.175).toFixed(3) : "21,000"

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.toLowerCase().includes(customerSearch.toLowerCase()),
  )

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCustomerSelect = (customer: string) => {
    setFormData((prev) => ({
      ...prev,
      customer,
    }))
    setShowCustomerDropdown(false)
    setCustomerSearch("")
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <DashboardLayout pageTitle="Add Transaction">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Transaction added successfully</h1>
            <Link
              href="/inventory"
              className="text-red-500 hover:text-red-600 font-medium inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Inventory
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout pageTitle="Add Transaction">
        <Link href="/inventory" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Image
                src="/svg/transaction-minus.svg"
                alt="Rovic Oil & Gas Logo"
                width={30} height={30}
                className=""
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Add New Transaction</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type of User</label>
            <select
              name="typeOfUser"
              value={formData.typeOfUser}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select type of user</option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
            <div className="relative">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search Customer"
                  value={formData.customer || customerSearch}
                  onChange={(e) => {
                    setCustomerSearch(e.target.value)
                    setShowCustomerDropdown(true)
                  }}
                  onFocus={() => setShowCustomerDropdown(true)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              {showCustomerDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {filteredCustomers.map((customer) => (
                    <button
                      key={customer}
                      type="button"
                      onClick={() => handleCustomerSelect(customer)}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-gray-700"
                    >
                      {customer}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sales Quantity (Liters)</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter amount"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price per Liter</label>
            <input
              type="number"
              name="pricePerLiter"
              placeholder="Enter amount"
              value={formData.pricePerLiter}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount (₦)</label>
            <input
              type="text"
              value={totalAmount}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select payment type</option>
              {paymentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount paid</label>
            <input
              type="text"
              name="amountPaid"
              placeholder="120,000"
              value={formData.amountPaid}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {formData.paymentType === "Part Payment" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Duration</label>
              <select
                name="repaymentDuration"
                value={formData.repaymentDuration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select duration</option>
                {repaymentDurations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Debit (Amount owed)</span>
              <span className="font-medium text-gray-900">{debit}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Credit (Amount paid)</span>
              <span className="font-medium text-gray-900">{credit}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-300 pt-3">
              <span className="text-gray-600">Current Balance</span>
              <span className="font-medium text-gray-900">{currentBalance}</span>
            </div>
          </div>

          <Button className="gap-2 bg-accent hover:bg-accent w-full" size="lg">
            Submit
          </Button>

        </form>
      </div>
    </DashboardLayout>
  )
}
