"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Image from "next/image"

export default function QuotationSuccessPage() {
    return (
        <DashboardLayout pageTitle="Quotation Sent">
            <div className="bg-background flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                         <Image
                                   src="/svg/success.svg"
                                   alt="Rovic Oil & Gas Logo"
                                   width={100} height={100}
                                 />  </div>

                    <h1 className="text-3xl font-bold text-foreground mb-2">Quotation Sent successfully</h1>

                    <p className="text-muted-foreground mb-8">Your quotation has been sent to the customer's email address.</p>

                    <Link href="/communications">
                        <Button className="bg-transparent text-accent hover:bg-transparent">← Back to Communications</Button>
                    </Link>
                </div>
            </div>
        </DashboardLayout>

    )
}
