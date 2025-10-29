"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import html2pdf from "html2pdf.js"
import { DashboardLayout } from "@/components/dashboard-layout"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

interface QuotationData {
    customerName: string
    customerAddress: string
    description: string
    density: string
    quantity: string
    price: string
    emailAddress: string
}

export default function PreviewQuotationPage() {
    const router = useRouter()
    const [quotationData, setQuotationData] = useState<QuotationData | null>(null)
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        const data = sessionStorage.getItem("quotationData")
        if (data) {
            setQuotationData(JSON.parse(data))
        }
    }, [])

    const handleDownloadPDF = () => {
        const element = document.getElementById("quotation-content")
        if (!element) return

        const opt: any = {
            margin: 10,
            filename: "quotation.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
        }

        html2pdf().set(opt).from(element).save()
    }

    const handleSendQuotation = async () => {
        setIsSending(true)
        // Simulate sending
        setTimeout(() => {
            sessionStorage.removeItem("quotationData")
            router.push("/communications/send-quotation/success")
        }, 1000)
    }

    if (!quotationData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Loading quotation...</p>
            </div>
        )
    }

    const totalAmount = (
        Number.parseFloat(quotationData.quantity) * Number.parseFloat(quotationData.price)
    ).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return (
        <DashboardLayout pageTitle="Add Transaction">
            <div className="min-h-screen bg-background">
                
                <Link href="/communications/send-quotation" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>
                <div className="max-w-4xl mx-auto p-6">
                    <div id="quotation-content" className="bg-white rounded-lg border border-border p-12 mb-8">
                        <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-200">
                              <Image
                                      src="/logo/rovic-logo.png" 
                                      alt="Rovic Oil & Gas Logo"
                                      width={180}
                                      height={60}
                                      className=""
                                    />
                            <div className="text-right text-sm text-gray-600">
                                <p className="font-semibold text-gray-900">OFFICE ADDRESS</p>
                                <p>Plot 654, Gowanus, Abuja</p>
                                <p>Tel: 08033539704, 09033319394</p>
                            </div>
                        </div>

                        <h1 className="text-center font-bold text-lg text-gray-900 mb-4">
                            QUOTATION FOR THE SUPPLY OF {quotationData.quantity} LITERS OF DIESEL
                        </h1>

                        <p className="text-sm text-gray-700 mb-6">{quotationData.description}</p>

                        <table className="w-full mb-6 border-collapse">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">S/N</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">DESCRIPTION</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">DENSITY</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold">QTY</th>
                                    <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold">PRICE</th>
                                    <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold">AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">1</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">DIESEL</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{quotationData.density}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-900">
                                        {quotationData.quantity}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right text-sm text-gray-900">
                                        ₦{Number.parseFloat(quotationData.price).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right text-sm text-gray-900">₦{totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end mb-8">
                            <div className="w-64">
                                <div className="flex justify-between border-t-2 border-gray-900 pt-2">
                                    <span className="font-semibold text-gray-900">GRAND TOTAL</span>
                                    <span className="font-semibold text-gray-900">₦{totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-gray-700 space-y-3">
                            <p>
                                <span className="font-semibold">Validity Period:</span> 30 days
                            </p>

                            <div>
                                <p className="font-semibold mb-2">Warranty:</p>
                                <p>We offer warranty to clients that pick us on a refundable basis.</p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>This quote is exclusive of TAXES</li>
                                    <li>Supplies Lubricants/engine oil drums at very competitive price.</li>
                                    <li>Offers financing for diesel, lubricants and chemical contracts.</li>
                                    <li>We offer N20,000.00 as REFERRAL COMMISSION for any referral business</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-semibold mb-1">1. Minimum Investment: N1 million</p>
                                <p className="font-semibold mb-1">2. ROI: 30% per Annum</p>
                                <p className="font-semibold">3. Maximum Duration: 1 Year</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button
                            variant="outline"
                            size={"lg"}
                            onClick={handleDownloadPDF}
                            className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent cursor-pointer"
                        >
                            Download as PDF
                        </Button>
                        <Button
                            size={"lg"}
                            onClick={handleSendQuotation} disabled={isSending} className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
                            {isSending ? "Sending..." : "Send Quotation"}
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>

    )
}
