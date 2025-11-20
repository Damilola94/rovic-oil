"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface SendReminderModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  debtorName?: string
}

export function SendReminderModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  debtorName = "",
}: SendReminderModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
        <div className="flex flex-col items-center gap-4">

          <Image
            src="/svg/reminder-icon.svg"
            alt="Send Reminder Icon"
            width={50}
            height={50}
          />

          <h2 className="text-xl font-semibold text-slate-900 text-center">
            Send Payment Reminder?
          </h2>

          <p className="text-center text-slate-600 text-sm px-2">
            You are about to send a payment reminder to{" "}
            <span className="font-semibold">{debtorName}</span>.
          </p>

          <div className="flex gap-3 w-full pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 border-slate-300 text-slate-700 bg-transparent hover:bg-red-700"
            >
              Cancel
            </Button>

            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
