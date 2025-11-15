"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CommunicationTable } from "@/components/tables/communication-table"
import Image from "next/image"
import useGetQuery from "@/hooks/useGetQuery"

export default function CommunicationsPage() {
  const [readMoreModal, setReadMoreModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  })
  const [viewAllModal, setViewAllModal] = useState<{ isOpen: boolean; recipients: string[] }>({
    isOpen: false,
    recipients: [],
  })

  const [currentPage, setCurrentPage] = useState(1)

  const queryParams = {
    type: null,
    target: null,
    status: null,
    fromDate: "",
    toDate: "",
    pageNumber: currentPage,
    pageSize: 20,
  }

  const { data: commsData, status } = useGetQuery({
    endpoint: "communications",
    pQuery: queryParams,
    queryKey: ["communications", queryParams],
    auth: true,
  })

  const messages = commsData?.items || []
  const isLoading = status === "loading"

  return (
    <DashboardLayout pageTitle="Communications">
      <div>
        <div className="flex gap-4 mb-8 justify-end">
          <Link href="/communications/send-quotation">
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent/10 bg-transparent rounded-lg hover:text-accent"
            >
              <Image src="/svg/receipt.svg" alt="Send Quotation" width={20} height={20} />
              Send Quotation
            </Button>
          </Link>
          <Link href="/communications/send-message">
            <Button className="bg-accent hover:bg-accent/90 text-white rounded-lg" size="lg">
              <Image src="/svg/message-text.svg" alt="Send Message" width={20} height={20} />
              Send a Message
            </Button>
          </Link>
        </div>

        <div className="flex">
          <CommunicationTable
            setReadMoreModal={setReadMoreModal}
            setViewAllModal={setViewAllModal}
            data={messages}
            isLoading={isLoading}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {readMoreModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8 relative">
              <button
                onClick={() => setReadMoreModal({ isOpen: false, message: "" })}
                className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg cursor-pointer"
              >
                <X size={24} className="text-foreground" />
              </button>
              <p className="text-foreground text-base leading-relaxed">
                {readMoreModal.message}
              </p>
            </div>
          </div>
        )}

        {viewAllModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
              <button
                onClick={() => setViewAllModal({ isOpen: false, recipients: [] })}
                className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg cursor-pointer"
              >
                <X size={24} className="text-foreground" />
              </button>
              <div className="grid grid-cols-2 gap-2">
                {(Array.isArray(viewAllModal.recipients)
                  ? viewAllModal.recipients
                  : [viewAllModal.recipients]
                ).map((recipient, idx) => (
                  <div
                    key={idx}
                    className="text-sm text-foreground bg-muted/30 p-2 rounded-xl w-fit"
                  >
                    {recipient}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
