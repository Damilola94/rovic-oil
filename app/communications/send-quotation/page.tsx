"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function SendQuotationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/communications">
            <Button variant="ghost" size="sm" className="p-0">
              ← Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Communications</h1>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Mail size={20} className="text-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Send Quotation</h2>
          </div>

          <p className="text-muted-foreground">Send quotation form coming soon...</p>
        </div>
      </div>
    </div>
  )
}
