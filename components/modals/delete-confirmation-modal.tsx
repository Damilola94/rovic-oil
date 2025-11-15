"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            <Image
              src="/svg/question-mark.svg"
              alt="Rovic Oil & Gas Logo"
              width={40}
              height={40}
            />
          </div>

          <h2 className="text-xl font-semibold text-slate-900 text-center">
            Are you sure you want to delete this?
          </h2>

          <div className="flex gap-3 w-full pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent hover:text-red-600"
            >
              Cancel
            </Button>

            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
