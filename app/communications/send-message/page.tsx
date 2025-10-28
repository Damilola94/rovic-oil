"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, RefreshCw } from "lucide-react"
import Link from "next/link"

interface Customer {
  id: number
  name: string
}

const mockCustomers: Customer[] = [
  { id: 1, name: "Kendrick Albright" },
  { id: 2, name: "Samantha Rivers" },
  { id: 3, name: "Jamal Carter" },
  { id: 4, name: "Elana Vasquez" },
  { id: 5, name: "Marcus Flynn" },
  { id: 6, name: "Talia Nguyen" },
  { id: 7, name: "Bokki Mart" },
  { id: 8, name: "HNPC" },
  { id: 9, name: "Adenrele Yusuf" },
  { id: 10, name: "Jenny Chiedozie" },
  { id: 11, name: "Joshua Dayis" },
]

export default function SendMessagePage() {
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Message Sent successfully</h2>
          <Link href="/communications">
            <Button className="text-accent hover:text-accent/80 bg-transparent border-0 p-0">
              ← Back to Communications
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/communications">
            <Button variant="ghost" size="sm" className="p-0">
              ← Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Communications</h1>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Send Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* To Dropdown */}
            <div>
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
                <div className="absolute mt-2 w-full max-w-md bg-card border border-border rounded-lg shadow-lg z-10">
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
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2"
                      >
                        <input type="checkbox" className="w-4 h-4" />
                        {customer.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Customers */}
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
                        className="hover:text-accent/80"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                placeholder="Enter Address"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={selectedCustomers.length === 0 || !message.trim()}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
