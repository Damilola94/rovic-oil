"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import Image from "next/image"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import handleFetch from "@/services/api/handleFetch";
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { Pagination } from "../ui/pagination"

interface Prospect {
  id: string
  phoneNumber: string
}

interface ProspectsTableProps {
  data: Prospect[]
  selectedLetter: string | null
}

export function ProspectsTable({ data, selectedLetter }: ProspectsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProspectId, setSelectedProspectId] = useState<string | null>(null)
  const itemsPerPage = 10

  const filteredProspects = useMemo(() => {
    if (!selectedLetter) return data
    return data.filter((p) =>
      p.phoneNumber.toLowerCase().startsWith(selectedLetter.toLowerCase())
    )
  }, [selectedLetter, data])

  const totalPages = Math.ceil(filteredProspects.length / itemsPerPage)
  const paginatedProspects = filteredProspects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const deleteMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      toast.success(res?.message || "Prospect deleted successfully.")
      setDeleteModalOpen(false)
      setSelectedProspectId(null)
      queryClient.invalidateQueries(["prospects"]);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to delete prospect. Please try again.")
    },
  })

  const handleDeleteClick = (id: string) => {
    setSelectedProspectId(id)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!selectedProspectId) return
    deleteMutation.mutate({
      endpoint: `prospects/${selectedProspectId}`,
      method: "DELETE",
      auth: true,
    })
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
              {paginatedProspects.map((prospect, index) => (
                <tr
                  key={prospect.id}
                  className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">  {(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                  <td className="px-6 py-4">{prospect.phoneNumber}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteClick(prospect.id)}
                      disabled={deleteMutation.isLoading}
                      className="text-red-600 hover:text-red-800 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Image src="/svg/bin.svg" alt="Bin Icon" width={14} height={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedProspects.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-sm text-muted-foreground">
                    No prospects found.
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
        isLoading={deleteMutation.isLoading}
      />
    </>
  )
}
