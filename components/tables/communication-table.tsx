"use client"

import { useEffect, useState } from "react"
import moment from "moment"
import { Card } from "@/components/ui/card"
import { Pagination } from "../ui/pagination"
import useGetQuery from "@/hooks/useGetQuery"

interface CommunicationTableProps {
  setReadMoreModal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; message: string }>
  >
  setViewAllModal: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; recipients: string[] }>
  >
  data: any[]
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
}

export function CommunicationTable({
  setReadMoreModal,
  setViewAllModal,
  data,
  isLoading,
  currentPage,
  onPageChange,
}: CommunicationTableProps) {
  const itemsPerPage = 10
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage)
  const paginatedMessages = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const {
    data: commByIdData,
    isFetching: loadingRecipients,
  } = useGetQuery({
    endpoint: selectedId ? `communications/${selectedId}` : undefined,
    queryKey: ["communication", selectedId],
    auth: true,
    enabled: !!selectedId,
  })

  useEffect(() => {
    if (!commByIdData?.recipients) return;

    let recipients: string[] = [];

    if (commByIdData.target === "NewPhoneNumbers") {
      recipients = commByIdData.recipients.map((r: any) =>
        r.recipientContact
      );
    }  else if ( commByIdData.target === "Prospects") {
      recipients = commByIdData.recipients.map((r: any) =>
        r.recipientContact
      );
    }else if (commByIdData.target === "QuotationEmail") {
      recipients = commByIdData.quotationDetails.emailAddress
    } else {
      recipients = commByIdData.recipients.map((r: any) => r.recipientName);
    }

    setViewAllModal({
      isOpen: true,
      recipients,
    });
  }, [commByIdData]);

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
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  Loading communications...
                </td>
              </tr>
            ) : paginatedMessages.length > 0 ? (
              paginatedMessages.map((msg, idx) => (
                <tr
                  key={msg.id || idx}
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    {moment(msg.createdAtUtc).format("MM/DD/YYYY") || "—"}
                  </td>
                  <td className="px-1 py-4">
                    <div className="flex items-center gap-2">
                      <span className="line-clamp-1">
                        {msg.message?.length > 12
                          ? `${msg.message.slice(0, 10)}...`
                          : msg.message}
                      </span>
                      {msg.message?.length > 10 && (
                        <button
                          onClick={() =>
                            setReadMoreModal({
                              isOpen: true,
                              message: msg.message,
                            })
                          }
                          className="text-red-600 cursor-pointer hover:underline text-xs whitespace-nowrap"
                        >
                          Read more
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{msg.type}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {msg.target === "AllCustomers"
                      ? "All Customers"
                      : msg.target === "SelectedCustomers"
                        ? "Selected Customers"
                        : msg.target === "NewPhoneNumbers"
                          ? "New Phone Numbers"
                          : msg.target === "Prospects"
                            ? "Prospective Customers"
                            : msg.target === "QuotationEmail"
                            ? "Quotation Email"
                            : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelectedId(msg.id)}
                      className="text-red-600 cursor-pointer hover:underline text-sm"
                    >
                      {loadingRecipients && selectedId === msg.id
                        ? "Loading..."
                        : "View all"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No communications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </Card>
  )
}
