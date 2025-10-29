"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import { Pagination } from "../ui/pagination"
import { mockMessages } from "@/app/constant/data"

export function CommunincationTable({
  setReadMoreModal,
  setViewAllModal,
}: {
  setReadMoreModal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; message: string }>
  >
  setViewAllModal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; recipients: string[] }>
  >
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

   const totalPages = Math.ceil(mockMessages.length / itemsPerPage)

  const paginatedMessages = useMemo(
    () =>
      mockMessages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [mockMessages, currentPage]
  )

  return (
    <Card className="p-0 rounded-4xl pb-10 w-full">
      <div className="flex-1 overflow-x-auto rounded-t-4xl bg-card">
        <table className="w-full font-light text-sm">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-left">Message</th>
              <th className="px-4 py-4 text-left">Message Type</th>
              <th className="px-4 py-4 text-left">Customer Type</th>
              <th className="px-4 py-4 text-left">Recipients</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMessages.map((msg, idx) => (
              <tr
                key={msg.id}
                className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-4">{msg.date}</td>
                <td className="px-1 py-4">
                  <div className="flex items-center gap-2">
                    <span className="line-clamp-1">{msg.message}</span>
                    <button
                      onClick={() =>
                        setReadMoreModal({
                          isOpen: true,
                          message: msg.fullMessage,
                        })
                      }
                      className="text-red-600 cursor-pointer hover:underline text-xs whitespace-nowrap"
                    >
                      Read more
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600">{msg.messageType}</td>
                <td className="px-4 py-4 text-slate-600">{msg.customerType}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() =>
                      setViewAllModal({
                        isOpen: true,
                        recipients: msg.recipients,
                      })
                    }
                    className="text-red-600 cursor-pointer hover:underline text-sm"
                  >
                    View all
                  </button>
                </td>
              </tr>
            ))}

            {paginatedMessages.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No messages found.
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
  )
}
