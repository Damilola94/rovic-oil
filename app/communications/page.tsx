"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageSquare, X } from "lucide-react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Message {
  id: number
  date: string
  message: string
  fullMessage: string
  messageType: "Quotation" | "Bulk SMS"
  customerType: "Individual" | "Company"
  recipients: string[]
}

const mockMessages: Message[] = [
  {
    id: 1,
    date: "12-02-2025",
    message: "The price of diesel in Nigeria is approximately N1,200 to N1,400 per liter, though prices can vary...",
    fullMessage:
      "The price of diesel in Nigeria is approximately N1,200 to N1,400 per liter, though prices can vary significantly depending on the state and specific location. Recent reports show the average price to be around N1,230 per liter in some areas, while other sources indicate an average of N1,758 per liter, highlighting the volatile and inconsistent pricing across the country.",
    messageType: "Quotation",
    customerType: "Individual",
    recipients: ["08123456789", "08123456789", "08123456789", "08123456789", "08123456789"],
  },
  {
    id: 2,
    date: "12-03-2025",
    message:
      "In the UK, diesel prices typically range from £1.20 to £1.50 per liter, influenced by market fluctuations...",
    fullMessage:
      "In the UK, diesel prices typically range from £1.20 to £1.50 per liter, influenced by market fluctuations and global oil prices. The variation depends on location, with urban areas often having higher prices than rural regions.",
    messageType: "Bulk SMS",
    customerType: "Company",
    recipients: [
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
    ],
  },
  {
    id: 3,
    date: "12-04-2025",
    message: "The average diesel price in the US is around $3.00 to $4.00 per gallon, varying by state and...",
    fullMessage:
      "The average diesel price in the US is around $3.00 to $4.00 per gallon, varying by state and region. Prices are influenced by crude oil costs, refining capacity, and transportation logistics.",
    messageType: "Bulk SMS",
    customerType: "Company",
    recipients: [
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
    ],
  },
  {
    id: 4,
    date: "12-05-2025",
    message:
      "In India, diesel prices hover around ₹90 to ₹100 per liter, affected by global oil prices and government...",
    fullMessage:
      "In India, diesel prices hover around ₹90 to ₹100 per liter, affected by global oil prices and government policies. The pricing structure includes taxes and subsidies that impact the final consumer price.",
    messageType: "Quotation",
    customerType: "Individual",
    recipients: ["08123456789", "08123456789", "08123456789"],
  },
  {
    id: 5,
    date: "12-06-2025",
    message:
      "Australia sees diesel prices between AUD 1.50 to AUD 2.00 per liter, largely determined by international...",
    fullMessage:
      "Australia sees diesel prices between AUD 1.50 to AUD 2.00 per liter, largely determined by international crude oil prices and local market conditions.",
    messageType: "Bulk SMS",
    customerType: "Company",
    recipients: [
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
    ],
  },
  {
    id: 6,
    date: "12-07-2025",
    message:
      "In Canada, diesel costs approximately CAD 1.20 to CAD 1.50 per liter, with variations across provinces...",
    fullMessage:
      "In Canada, diesel costs approximately CAD 1.20 to CAD 1.50 per liter, with variations across provinces and territories based on local supply and demand.",
    messageType: "Bulk SMS",
    customerType: "Individual",
    recipients: [
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
    ],
  },
  {
    id: 7,
    date: "12-08-2025",
    message: "The price of diesel in South Africa is about R20 to R22 per liter, influenced by crude oil prices...",
    fullMessage:
      "The price of diesel in South Africa is about R20 to R22 per liter, influenced by crude oil prices and the strength of the South African Rand against international currencies.",
    messageType: "Quotation",
    customerType: "Individual",
    recipients: ["08123456789", "08123456789", "08123456789", "08123456789"],
  },
  {
    id: 8,
    date: "12-08-2025",
    message: "The price of diesel in South Africa is about R20 to R22 per liter, influenced by crude oil prices...",
    fullMessage:
      "The price of diesel in South Africa is about R20 to R22 per liter, influenced by crude oil prices and the strength of the South African Rand against international currencies.",
    messageType: "Quotation",
    customerType: "Company",
    recipients: [
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
      "08123456789",
    ],
  },
]

export default function CommunicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [readMoreModal, setReadMoreModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  })
  const [viewAllModal, setViewAllModal] = useState<{ isOpen: boolean; recipients: string[] }>({
    isOpen: false,
    recipients: [],
  })

  const filteredMessages = mockMessages.filter((msg) => msg.message.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
     <DashboardLayout>

    <div className="">
      <div className="">
       

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Link href="/communications/send-quotation">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
              <Mail size={20} />
              Send Quotation
            </Button>
          </Link>
          <Link href="/communications/send-message">
            <Button className="bg-accent hover:bg-accent/90 text-white">
              <MessageSquare size={20} />
              Send a Message
            </Button>
          </Link>
        </div>

        {/* Messages Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Recipients</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg, idx) => (
                  <tr key={msg.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <td className="px-6 py-4 text-sm text-foreground">{msg.date}</td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="line-clamp-1">{msg.message}</span>
                        <button
                          onClick={() => setReadMoreModal({ isOpen: true, message: msg.fullMessage })}
                          className="text-accent hover:underline text-xs whitespace-nowrap"
                        >
                          Read more
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{msg.messageType}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{msg.customerType}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setViewAllModal({ isOpen: true, recipients: msg.recipients })}
                        className="text-accent hover:underline"
                      >
                        View all
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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


