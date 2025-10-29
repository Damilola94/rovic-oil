"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import { Trash2 } from "lucide-react"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { Pagination } from "../ui/pagination"
import { customers } from "@/app/constant/data"
import Image from "next/image"

export function ProspectsTable({ selectedLetter }: { selectedLetter: string | null }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  const itemsPerPage = 10

  const filteredCustomers = useMemo(() => {
    if (!selectedLetter) return customers
    return customers.filter((c) =>
      c.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
    )
  }, [selectedLetter])

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)

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
      <Card className="p-0 rounded-4xl pb-10 w-full">
        <div className="flex-1 overflow-x-auto rounded-t-4xl bg-card">
          <table className="w-full font-light text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-6 py-4 text-left w-[10%]">No</th>
                <th className="px-6 py-4 text-left w-[70%]">Phone Number</th>
                <th className="px-6 py-4 text-right w-[20%]"></th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-left">{customer.id}</td>
                  <td className="px-6 py-4 text-left">{customer.phone}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteClick(customer.id)}
                      className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                    >
                      <Image
                        src="/svg/bin.svg"
                        alt="Bin Icon"
                        width={14} height={14}
                      />
                    </button>
                  </td>
                </tr>
              ))}
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
      />
    </>
  )
}
