"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import Link from "next/link"
import { MoreVertical, Edit2, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { Pagination } from "../ui/pagination"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import handleFetch from "@/services/api/handleFetch"

interface Customer {
  id: string
  name: string
  type: string
  address: string
  phone: string
  balance: string
  email: string
}

interface CustomersTableProps {
  data: Customer[]
  selectedLetter: string | null
}

export function CustomersTable({ data, selectedLetter }: CustomersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const itemsPerPage = 10

  const filteredCustomers = useMemo(() => {
    if (!selectedLetter) return data
    return data.filter((c) =>
      c.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
    )
  }, [selectedLetter, data])

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const deleteCustomerMutation = useMutation(handleFetch, {
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Customer deleted successfully")
      setDeleteModalOpen(false)
      setSelectedCustomerId(null)
      queryClient.invalidateQueries(["customers"])
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Failed to delete customer, please try again.")
    },
  })

  const handleConfirmDelete = () => {
    if (!selectedCustomerId) return
    deleteCustomerMutation.mutate({
      endpoint: `customers/${selectedCustomerId}`,
      method: "DELETE",
      auth: true,
    })
  }

  const handleDeleteClick = (customerId: string) => {
    setSelectedCustomerId(customerId)
    setDeleteModalOpen(true)
  }

  return (
    <>
      <Card className="p-0 rounded-4xl pb-10 w-full">
        <div className="flex-1 overflow-x-auto rounded-t-4xl bg-card">
          <table className="w-full font-light text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Type</th>
                <th className="px-4 py-4 text-left">Location</th>
                <th className="px-4 py-4 text-left">Phone Number</th>
                <th className="px-4 py-4 text-left">Current Balance</th>
                <th className="px-4 py-4 text-left">Email Address</th>
                <th className="px-4 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * itemsPerPage + (index + 1)}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`customers/customer-details/${customer.id}`}
                      className="hover:underline"
                    >
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{customer.type}</td>
                  <td className="px-4 py-4 max-w-[150px] truncate">
                    {customer.address}
                  </td>
                  <td className="px-4 py-4">{customer.phone}</td>
                  <td
                    className={`px-4 py-4 font-semibold ${
                      String(customer?.balance ?? "").includes("-")
                        ? "text-red-500"
                        : customer?.balance === "N/A"
                        ? "text-slate-500"
                        : "text-green-500"
                    }`}
                  >
                    {customer.balance}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{customer.email}</td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                          <MoreVertical size={18} className="text-slate-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem asChild>
                          <Link href={`/customers/edit-customer/${customer.id}`}>
                            <div className="flex items-center gap-2">
                              <Edit2 size={14} /> Edit
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(customer.id)}
                          className="text-red-600 focus:text-red-700"
                        >
                          <Trash2 size={14} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}

              {paginatedCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteCustomerMutation.isLoading}
      />
    </>
  )
}
