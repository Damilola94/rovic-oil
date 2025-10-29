"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, RefreshCw, ChevronLeft } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { mockCustomers } from "@/app/constant/data"
import { useRouter } from "next/navigation"
import Image from "next/image"
interface Customer {
  id: number
  name: string
}

export default function SendMessagePage() {
  const router = useRouter()
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedCustomers.find((s) => s.id === customer.id),
  )

  const toggleCustomer = (customer: Customer) => {
    setSelectedCustomers((prev) => [...prev, customer])
    setSearchTerm("")
  }

  const removeCustomer = (customerId: number) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.id !== customerId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCustomers.length > 0 && message.trim()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <DashboardLayout pageTitle="Send Message">
        <div className="bg-background flex justify-center p-4 items-center">
          <div className="text-center">
            <div className=" rounded-full flex items-center justify-center mx-auto mb-6">
              <Image
                src="/svg/success.svg"
                alt="Rovic Oil & Gas Logo"
                width={100} height={100}
              />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Message Sent successfully</h2>
            <Button
              onClick={() => router.push('/communications')}
              className="text-accent flex hover:text-accent/80 bg-transparent border-0 p-0 text-center mx-auto hover:bg-transparent">
              <ChevronLeft
                size={20}
                className=""
              />
              Back to Communications
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout pageTitle="Send Message">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 cursor-pointer">
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="">
                <Image
                  src="/svg/message.svg"
                  alt="Rovic Oil & Gas Logo"
                  width={30} height={30}
                />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Send Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="relative w-full">
                <label className="block text-sm font-medium text-foreground mb-2">To</label>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground text-left flex items-center justify-between hover:bg-muted"
                >
                  <span>Select Customers</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute mt-2 w-full  bg-card border border-border rounded-lg shadow-lg z-10">
                    <div className="p-4 border-b border-border">
                      <p className="text-sm font-medium text-foreground mb-2">All Customers</p>
                      <p className="text-sm text-muted-foreground mb-3">Select Customers</p>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search Customer"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full"
                        />
                        <RefreshCw
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {filteredCustomers.map((customer) => (
                        <button
                          key={customer.id}
                          type="button"
                          onClick={() => toggleCustomer(customer)}
                          className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2 cursor-pointer"
                        >
                          <input type="checkbox" className="w-4 h-4" />
                          {customer.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedCustomers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">To</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="bg-accent/10 border border-accent text-accent px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                      >
                        {customer.name}
                        <button
                          type="button"
                          onClick={() => removeCustomer(customer.id)}
                          className="hover:text-accent/80 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  placeholder="Enter Address"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={selectedCustomers.length === 0 || !message.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg mt-8"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </DashboardLayout>

    </div>
  )
}
