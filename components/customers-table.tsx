"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import Link from "next/link"
import { Edit2, Trash2 } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"

const customers = [
  {
    id: 1,
    name: "David Abiola",
    type: "Individual",
    location: "Abuja",
    phone: "08123456789",
    balance: "N/A",
    email: "davidabiola@gmail.com",
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    type: "Company",
    location: "Lagos",
    phone: "08123456789",
    balance: "-100,000",
    email: "davidabiola@gmail.com",
  },
  {
    id: 3,
    name: "Fatima Ahmed",
    type: "Individual",
    location: "Port Harcourt",
    phone: "08123456789",
    balance: "+90,000",
    email: "davidabiola@gmail.com",
  },
  {
    id: 4,
    name: "Liam O'Brien",
    type: "Company",
    location: "Onitsha",
    phone: "08123456789",
    balance: "-80,000",
    email: "davidabiola@gmail.com",
  },
  {
    id: 5,
    name: "Sophia Johnson",
    type: "Individual",
    location: "Ibadan",
    phone: "08123456789",
    balance: "-70,000",
    email: "davidabiola@gmail.com",
  },
  {
    id: 6,
    name: "Khalid Al-Farsi",
    type: "Company",
    location: "Kano",
    phone: "08123456789",
    balance: "N/A",
    email: "davidabiola@gmail.com",
  },
  {
    id: 7,
    name: "Nina Petrova",
    type: "Company",
    location: "Kano",
    phone: "08123456789",
    balance: "-50,000",
    email: "davidabiola@gmail.com",
  },
]

export function CustomersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
  const itemsPerPage = 10
  const totalPages = Math.ceil(customers.length / itemsPerPage)

  const handleDeleteClick = (customerId: number) => {
    setSelectedCustomerId(customerId)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    console.log("Deleting customer:", selectedCustomerId)
    setDeleteModalOpen(false)
    setSelectedCustomerId(null)
  }

  return (
    <>
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Current Balance</th>
                <th className="px-4 py-3 text-left">Email Address</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">{customer.id}</td>
                  <td className="px-4 py-3">
                    <Link href={`/customer/${customer.id}`} className="text-blue-600 hover:underline">
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{customer.location}</td>
                  <td className="px-4 py-3">{customer.phone}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${customer.balance.includes("-") ? "text-red-500" : customer.balance === "N/A" ? "text-slate-500" : "text-green-500"}`}
                  >
                    {customer.balance}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{customer.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`/customers/${customer.id}/edit`}>
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Edit2 size={18} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(customer.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-sm disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[1, 2, 3, 4, 5, 10].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm ${currentPage === page ? "bg-slate-900 text-white" : "border border-slate-200 hover:bg-slate-50"}`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-sm">Next</button>
          </div>
        </div>
      </Card>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
