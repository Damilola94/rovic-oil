"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Fuel, Truck, TrendingUp } from "lucide-react"

const mockTransactions = [
  {
    id: 1,
    dateAdded: "2025-10-12",
    customerName: "David Abiola",
    location: "Abuja",
    quantity: 300,
    pricePerLiter: 300,
    totalAmount: 300000,
    currentBalance: "N/A",
  },
  {
    id: 2,
    dateAdded: "2025-10-13",
    customerName: "Bokku Mart",
    location: "Lagos",
    quantity: 100,
    pricePerLiter: 285,
    totalAmount: 300000,
    currentBalance: "-100,000",
  },
  {
    id: 3,
    dateAdded: "2025-10-14",
    customerName: "Ayo John",
    location: "Kaduna",
    quantity: 50,
    pricePerLiter: 300,
    totalAmount: 300000,
    currentBalance: "-90,000",
  },
  {
    id: 4,
    dateAdded: "2025-10-15",
    customerName: "Bola Ahmed",
    location: "Ibadan",
    quantity: 45,
    pricePerLiter: 290,
    totalAmount: 300000,
    currentBalance: "-80,000",
  },
  {
    id: 5,
    dateAdded: "2025-10-16",
    customerName: "Chloe Smith",
    location: "Onitsha",
    quantity: 425,
    pricePerLiter: 301,
    totalAmount: 8295200,
    currentBalance: "-70,000",
  },
  {
    id: 6,
    dateAdded: "2025-10-17",
    customerName: "Derek Johnson",
    location: "Port Harcourt",
    quantity: 553,
    pricePerLiter: 300,
    totalAmount: 8295200,
    currentBalance: "N/A",
  },
  {
    id: 7,
    dateAdded: "2025-10-18",
    customerName: "Eva Martinez",
    location: "Calabar",
    quantity: 292,
    pricePerLiter: 300,
    totalAmount: 8295200,
    currentBalance: "-50,000",
  },
  {
    id: 8,
    dateAdded: "2025-10-18",
    customerName: "Eva Martinez",
    location: "Calabar",
    quantity: 292,
    pricePerLiter: 310,
    totalAmount: 10295200,
    currentBalance: "-40,000",
  },
  {
    id: 9,
    dateAdded: "2025-10-18",
    customerName: "Eva Martinez",
    location: "Calabar",
    quantity: 292,
    pricePerLiter: 220,
    totalAmount: 8295200,
    currentBalance: "-30,000",
  },
  {
    id: 10,
    dateAdded: "2025-10-18",
    customerName: "Eva Martinez",
    location: "Calabar",
    quantity: 292,
    pricePerLiter: 295,
    totalAmount: 2920800,
    currentBalance: "-20,000",
  },
]

export default function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(mockTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = mockTransactions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
          <Link
            href="/inventory/add-transaction"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <span>+</span>
            Add New Transaction
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Fuel}
            label="Diesel Quantity Remaining (Litres)"
            value="240,450"
            badge="Restock Soon"
            badgeColor="red"
          />
          <StatCard icon={Truck} label="Total Diesel Sold (Litres)" value="5,042" />
          <StatCard icon={TrendingUp} label="Total Revenue (₦)" value="2,400,000" />
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date Added</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Customer's Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Quantity (Litres)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price / Ltr</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Current Balance</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.dateAdded}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.pricePerLiter}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.currentBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
