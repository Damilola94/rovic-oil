"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, X } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CommunincationTable } from "@/components/tables/communication-table"
import Image from "next/image"

export default function CommunicationsPage() {
  const [readMoreModal, setReadMoreModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  })
  const [viewAllModal, setViewAllModal] = useState<{ isOpen: boolean; recipients: string[] }>({
    isOpen: false,
    recipients: [],
  })

  return (
    <DashboardLayout pageTitle="Communications">
      <div className="">
        <div className="">
          <div className="flex gap-4 mb-8 justify-end">
            <Link href="/communications/send-quotation">
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 bg-transparent rounded-lg hover:text-accent">
                <Image
                  src="/svg/receipt.svg"
                  alt="Rovic Oil & Gas Logo"
                  width={20} height={20}
                />
                Send Quotation
              </Button>
            </Link>
            <Link href="/communications/send-message">
              <Button className="bg-accent hover:bg-accent/90 text-white rounded-lg" size="lg">
                <Image
                  src="/svg/message-text.svg"
                  alt="Rovic Oil & Gas Logo"
                  width={20} height={20}
                />
                Send a Message
              </Button>
            </Link>
          </div>
          <div className="flex">

            <CommunincationTable setReadMoreModal={setReadMoreModal} setViewAllModal={setViewAllModal} />
          </div>

        </div>

        {readMoreModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8 relative">
              <button
                onClick={() => setReadMoreModal({ isOpen: false, message: "" })}
                className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg"
              >
                <X size={24} className="text-foreground" />
              </button>
              <p className="text-foreground text-base leading-relaxed">{readMoreModal.message}</p>
            </div>
          </div>
        )}

        {viewAllModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
              <button
                onClick={() => setViewAllModal({ isOpen: false, recipients: [] })}
                className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg"
              >
                <X size={24} className="text-foreground" />
              </button>
              <div className="grid grid-cols-2 gap-4">
                {viewAllModal.recipients.map((recipient, idx) => (
                  <div key={idx} className="text-sm text-foreground bg-muted/30 p-3 rounded">
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


