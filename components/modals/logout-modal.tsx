"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null
  const router = useRouter()
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <HelpCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Are you sure you want to log out?</h2>
          <div className="flex gap-3 w-full pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent hover:text-red-600"
            >
              Cancel
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
